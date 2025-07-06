// FilStream Manager - Main orchestrator for video operations
import { ethers } from 'ethers';
import PDPService from './services/PDPService.js';
import USDFCService from './services/USDFCService.js';
import FilCDNService from './services/FilCDNService.js';
import { 
    FILSTREAM_ABI, 
    PRICING_CONFIG, 
    API_ENDPOINTS 
} from './config.js';

class FilStreamManager {
    constructor(provider, signer, contractAddress) {
        this.provider = provider;
        this.signer = signer;
        this.contractAddress = contractAddress;
        
        // Initialize services
        this.pdpService = new PDPService(provider, signer);
        this.usdfcService = new USDFCService(provider, signer);
        this.filcdnService = new FilCDNService();
        
        // Initialize FilStream contract
        this.filstreamContract = new ethers.Contract(
            contractAddress,
            FILSTREAM_ABI,
            signer
        );
    }

    /**
     * Complete video upload process
     * @param {File} videoFile - Video file to upload
     * @param {Object} metadata - Video metadata
     * @returns {Promise<Object>} - Upload result
     */
    async uploadVideo(videoFile, metadata) {
        try {
            console.log('Starting video upload process...');
            
            // Step 1: Upload to Filecoin PDP
            console.log('Step 1: Uploading to Filecoin PDP...');
            const pdpResult = await this.pdpService.uploadVideo(videoFile);
            
            // Step 2: Generate FilCDN URL
            console.log('Step 2: Generating FilCDN URL...');
            const cdnUrl = this.filcdnService.generateUrl(pdpResult.cid);
            
            // Step 3: Check USDFC balance
            console.log('Step 3: Checking USDFC balance...');
            const hasBalance = await this.usdfcService.hasSufficientBalance('20');
            if (!hasBalance) {
                throw new Error('Insufficient USDFC balance. Need 20 USDFC for storage.');
            }
            
            // Step 4: Register video on FilStream contract
            console.log('Step 4: Registering video on blockchain...');
            const videoId = await this.registerVideoOnChain(
                metadata.title,
                metadata.description,
                pdpResult.cid,
                PRICING_CONFIG.STORAGE_PRICE_PER_WEEK
            );
            
            // Step 5: Process payment
            console.log('Step 5: Processing payment...');
            const paymentTx = await this.usdfcService.payForVideo(
                this.contractAddress,
                videoId
            );
            
            console.log('Video upload completed successfully!');
            
            return {
                success: true,
                videoId: videoId,
                cid: pdpResult.cid,
                cdnUrl: cdnUrl,
                paymentTx: paymentTx,
                metadata: {
                    title: metadata.title,
                    description: metadata.description,
                    size: pdpResult.size,
                    uploadTime: new Date().toISOString()
                }
            };
            
        } catch (error) {
            console.error('Video upload failed:', error);
            throw new Error(`Upload failed: ${error.message}`);
        }
    }

    /**
     * Register video on FilStream smart contract
     * @param {string} title - Video title
     * @param {string} description - Video description
     * @param {string} cid - Content Identifier
     * @param {string} price - Price in wei
     * @returns {Promise<string>} - Video ID
     */
    async registerVideoOnChain(title, description, cid, price) {
        try {
            const tx = await this.filstreamContract.uploadVideo(
                title,
                description,
                cid,
                price
            );
            
            const receipt = await tx.wait();
            
            // Extract video ID from event logs
            const videoId = this.extractVideoIdFromLogs(receipt.logs);
            
            return videoId;
        } catch (error) {
            console.error('Error registering video on chain:', error);
            throw new Error(`Failed to register video: ${error.message}`);
        }
    }

    /**
     * Get video information
     * @param {string} videoId - Video identifier
     * @returns {Promise<Object>} - Video information
     */
    async getVideo(videoId) {
        try {
            const videoData = await this.filstreamContract.getVideo(videoId);
            
            const [title, description, cid, price, creator, uploadTime, isActive, totalViews, totalEarnings] = videoData;
            
            // Generate CDN URL
            const cdnUrl = this.filcdnService.generateUrl(cid);
            const thumbnailUrl = this.filcdnService.getThumbnailUrl(cid);
            
            return {
                videoId: videoId,
                title: title,
                description: description,
                cid: cid,
                price: ethers.utils.formatUnits(price, 18),
                creator: creator,
                uploadTime: new Date(uploadTime * 1000).toISOString(),
                isActive: isActive,
                totalViews: totalViews.toString(),
                totalEarnings: ethers.utils.formatUnits(totalEarnings, 18),
                cdnUrl: cdnUrl,
                thumbnailUrl: thumbnailUrl
            };
        } catch (error) {
            console.error('Error getting video:', error);
            throw new Error(`Failed to get video: ${error.message}`);
        }
    }

    /**
     * Get user's uploaded videos
     * @param {string} userAddress - User's wallet address
     * @returns {Promise<Array>} - Array of video IDs
     */
    async getUserVideos(userAddress) {
        try {
            const videoIds = await this.filstreamContract.getUserVideos(userAddress);
            return videoIds;
        } catch (error) {
            console.error('Error getting user videos:', error);
            throw new Error(`Failed to get user videos: ${error.message}`);
        }
    }

    /**
     * Pay to watch a video
     * @param {string} videoId - Video identifier
     * @returns {Promise<string>} - Transaction hash
     */
    async payToWatch(videoId) {
        try {
            console.log(`Paying to watch video: ${videoId}`);
            
            const tx = await this.filstreamContract.payForVideo(videoId);
            await tx.wait();
            
            console.log('Payment successful');
            return tx.hash;
        } catch (error) {
            console.error('Error paying for video:', error);
            throw new Error(`Payment failed: ${error.message}`);
        }
    }

    /**
     * Get user earnings
     * @param {string} userAddress - User's wallet address
     * @returns {Promise<string>} - Earnings in USDFC
     */
    async getUserEarnings(userAddress) {
        try {
            const earnings = await this.filstreamContract.getUserEarnings(userAddress);
            return ethers.utils.formatUnits(earnings, 18);
        } catch (error) {
            console.error('Error getting user earnings:', error);
            throw new Error(`Failed to get earnings: ${error.message}`);
        }
    }

    /**
     * Withdraw earnings
     * @returns {Promise<string>} - Transaction hash
     */
    async withdrawEarnings() {
        try {
            console.log('Withdrawing earnings...');
            
            const tx = await this.filstreamContract.withdrawEarnings();
            await tx.wait();
            
            console.log('Earnings withdrawn successfully');
            return tx.hash;
        } catch (error) {
            console.error('Error withdrawing earnings:', error);
            throw new Error(`Withdrawal failed: ${error.message}`);
        }
    }

    /**
     * Get video streaming URL
     * @param {string} videoId - Video identifier
     * @param {Object} options - Streaming options
     * @returns {Promise<string>} - Streaming URL
     */
    async getVideoStreamUrl(videoId, options = {}) {
        try {
            const video = await this.getVideo(videoId);
            return this.filcdnService.getVideoStreamUrl(video.cid, options);
        } catch (error) {
            console.error('Error getting stream URL:', error);
            throw new Error(`Failed to get stream URL: ${error.message}`);
        }
    }

    /**
     * Check if user has watched video
     * @param {string} videoId - Video identifier
     * @param {string} userAddress - User's wallet address
     * @returns {Promise<boolean>} - True if watched
     */
    async hasWatchedVideo(videoId, userAddress) {
        try {
            // This would need to be implemented in the smart contract
            // For now, return false
            return false;
        } catch (error) {
            console.error('Error checking watch status:', error);
            return false;
        }
    }

    /**
     * Get platform statistics
     * @returns {Promise<Object>} - Platform stats
     */
    async getPlatformStats() {
        try {
            const [totalVideos, platformFees] = await Promise.all([
                this.filstreamContract.getVideoCount(),
                this.usdfcService.getBalance(this.contractAddress)
            ]);
            
            return {
                totalVideos: totalVideos.toString(),
                platformFees: platformFees,
                storagePrice: ethers.utils.formatUnits(PRICING_CONFIG.STORAGE_PRICE_PER_WEEK, 18)
            };
        } catch (error) {
            console.error('Error getting platform stats:', error);
            throw new Error(`Failed to get platform stats: ${error.message}`);
        }
    }

    /**
     * Extract video ID from transaction logs
     * @param {Array} logs - Transaction logs
     * @returns {string} - Video ID
     */
    extractVideoIdFromLogs(logs) {
        for (const log of logs) {
            if (log.topics[0] === ethers.utils.id("VideoUploaded(bytes32,address,string,bytes32)")) {
                return log.topics[1]; // Video ID is the first indexed parameter
            }
        }
        
        // Fallback: generate a mock video ID
        return ethers.utils.keccak256(ethers.utils.randomBytes(32));
    }

    /**
     * Register user on platform
     * @returns {Promise<string>} - Transaction hash
     */
    async registerUser() {
        try {
            console.log('Registering user on platform...');
            
            const tx = await this.filstreamContract.registerUser();
            await tx.wait();
            
            console.log('User registered successfully');
            return tx.hash;
        } catch (error) {
            console.error('Error registering user:', error);
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    /**
     * Check if user is registered
     * @param {string} userAddress - User's wallet address
     * @returns {Promise<boolean>} - True if registered
     */
    async isUserRegistered(userAddress) {
        try {
            const user = await this.filstreamContract.users(userAddress);
            return user.isRegistered;
        } catch (error) {
            console.error('Error checking user registration:', error);
            return false;
        }
    }
}

export default FilStreamManager; 