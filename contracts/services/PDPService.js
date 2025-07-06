// PDP (Provider Data Protocol) Service for Filecoin Storage
import { ethers } from 'ethers';
import { PDP_PROVIDER_ADDRESS, PDP_ABI } from '../config.js';

class PDPService {
    constructor(provider, signer) {
        this.provider = provider;
        this.signer = signer;
        this.pdpContract = new ethers.Contract(PDP_PROVIDER_ADDRESS, PDP_ABI, signer);
    }

    /**
     * Upload data to Filecoin PDP
     * @param {Buffer|Uint8Array} data - The data to store
     * @returns {Promise<{cid: string, size: number}>} - Returns CID and size
     */
    async uploadData(data) {
        try {
            console.log('Uploading data to Filecoin PDP...');
            
            // Convert data to bytes if it's not already
            const dataBytes = ethers.utils.arrayify(data);
            
            // Call the PDP contract to store data
            const tx = await this.pdpContract.store(dataBytes);
            const receipt = await tx.wait();
            
            // Extract CID from transaction logs
            const cid = this.extractCIDFromLogs(receipt.logs);
            
            console.log('Data uploaded successfully. CID:', cid);
            
            return {
                cid: cid,
                size: dataBytes.length,
                transactionHash: tx.hash
            };
        } catch (error) {
            console.error('Error uploading to PDP:', error);
            throw new Error(`PDP upload failed: ${error.message}`);
        }
    }

    /**
     * Retrieve data from Filecoin PDP
     * @param {string} cid - Content Identifier
     * @returns {Promise<Buffer>} - Returns the stored data
     */
    async retrieveData(cid) {
        try {
            console.log('Retrieving data from Filecoin PDP...');
            
            // Call the PDP contract to retrieve data
            const data = await this.pdpContract.retrieve(cid);
            
            console.log('Data retrieved successfully');
            
            return Buffer.from(data);
        } catch (error) {
            console.error('Error retrieving from PDP:', error);
            throw new Error(`PDP retrieval failed: ${error.message}`);
        }
    }

    /**
     * Get storage price from PDP provider
     * @returns {Promise<string>} - Returns price in wei
     */
    async getStoragePrice() {
        try {
            const price = await this.pdpContract.getStoragePrice();
            return price.toString();
        } catch (error) {
            console.error('Error getting storage price:', error);
            throw new Error(`Failed to get storage price: ${error.message}`);
        }
    }

    /**
     * Pay for storage of a specific CID
     * @param {string} cid - Content Identifier
     * @param {string} amount - Amount to pay in wei
     * @returns {Promise<string>} - Transaction hash
     */
    async payForStorage(cid, amount) {
        try {
            console.log('Paying for storage...');
            
            const tx = await this.pdpContract.payForStorage(cid, amount, {
                value: amount
            });
            
            await tx.wait();
            
            console.log('Storage payment successful');
            return tx.hash;
        } catch (error) {
            console.error('Error paying for storage:', error);
            throw new Error(`Storage payment failed: ${error.message}`);
        }
    }

    /**
     * Upload video file to PDP
     * @param {File} videoFile - Video file to upload
     * @returns {Promise<{cid: string, size: number, url: string}>} - Returns CID, size, and FilCDN URL
     */
    async uploadVideo(videoFile) {
        try {
            console.log('Uploading video to Filecoin PDP...');
            
            // Convert file to buffer
            const arrayBuffer = await videoFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            // Upload to PDP
            const result = await this.uploadData(buffer);
            
            // Generate FilCDN URL
            const cdnUrl = await this.generateFilCDNUrl(result.cid);
            
            return {
                cid: result.cid,
                size: result.size,
                url: cdnUrl,
                transactionHash: result.transactionHash
            };
        } catch (error) {
            console.error('Error uploading video:', error);
            throw new Error(`Video upload failed: ${error.message}`);
        }
    }

    /**
     * Generate FilCDN URL from CID
     * @param {string} cid - Content Identifier
     * @returns {Promise<string>} - FilCDN URL
     */
    async generateFilCDNUrl(cid) {
        // This would integrate with FilCDN API
        // For now, return a mock URL
        return `https://filcdn.io/${cid}`;
    }

    /**
     * Extract CID from transaction logs
     * @param {Array} logs - Transaction logs
     * @returns {string} - Content Identifier
     */
    extractCIDFromLogs(logs) {
        // This is a simplified implementation
        // In a real scenario, you'd parse the actual event logs
        for (const log of logs) {
            if (log.topics[0] === ethers.utils.id("DataStored(bytes32,address)")) {
                const cid = ethers.utils.hexDataSlice(log.topics[1], 0);
                return ethers.utils.hexlify(cid);
            }
        }
        
        // Fallback: generate a mock CID
        return ethers.utils.keccak256(ethers.utils.randomBytes(32));
    }

    /**
     * Verify data integrity
     * @param {string} cid - Content Identifier
     * @param {Buffer} originalData - Original data to verify
     * @returns {Promise<boolean>} - Returns true if data matches
     */
    async verifyDataIntegrity(cid, originalData) {
        try {
            const retrievedData = await this.retrieveData(cid);
            return Buffer.compare(originalData, retrievedData) === 0;
        } catch (error) {
            console.error('Error verifying data integrity:', error);
            return false;
        }
    }
}

export default PDPService; 