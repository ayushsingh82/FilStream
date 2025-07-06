// USDFC Service for Token Payments and Balance Management
import { ethers } from 'ethers';
import { USDFC_ADDRESS, USDFC_ABI, PRICING_CONFIG } from '../config.js';

class USDFCService {
    constructor(provider, signer) {
        this.provider = provider;
        this.signer = signer;
        this.usdfcContract = new ethers.Contract(USDFC_ADDRESS, USDFC_ABI, signer);
    }

    /**
     * Get USDFC balance for an address
     * @param {string} address - Wallet address
     * @returns {Promise<string>} - Balance in USDFC (formatted)
     */
    async getBalance(address) {
        try {
            const balance = await this.usdfcContract.balanceOf(address);
            const decimals = await this.usdfcContract.decimals();
            return ethers.utils.formatUnits(balance, decimals);
        } catch (error) {
            console.error('Error getting USDFC balance:', error);
            throw new Error(`Failed to get balance: ${error.message}`);
        }
    }

    /**
     * Get current user's USDFC balance
     * @returns {Promise<string>} - Balance in USDFC (formatted)
     */
    async getCurrentUserBalance() {
        const address = await this.signer.getAddress();
        return this.getBalance(address);
    }

    /**
     * Transfer USDFC tokens
     * @param {string} to - Recipient address
     * @param {string} amount - Amount in USDFC (not wei)
     * @returns {Promise<string>} - Transaction hash
     */
    async transfer(to, amount) {
        try {
            console.log(`Transferring ${amount} USDFC to ${to}...`);
            
            const decimals = await this.usdfcContract.decimals();
            const amountWei = ethers.utils.parseUnits(amount, decimals);
            
            const tx = await this.usdfcContract.transfer(to, amountWei);
            await tx.wait();
            
            console.log('USDFC transfer successful');
            return tx.hash;
        } catch (error) {
            console.error('Error transferring USDFC:', error);
            throw new Error(`USDFC transfer failed: ${error.message}`);
        }
    }

    /**
     * Approve USDFC spending for another contract
     * @param {string} spender - Contract address to approve
     * @param {string} amount - Amount in USDFC (not wei)
     * @returns {Promise<string>} - Transaction hash
     */
    async approve(spender, amount) {
        try {
            console.log(`Approving ${amount} USDFC for ${spender}...`);
            
            const decimals = await this.usdfcContract.decimals();
            const amountWei = ethers.utils.parseUnits(amount, decimals);
            
            const tx = await this.usdfcContract.approve(spender, amountWei);
            await tx.wait();
            
            console.log('USDFC approval successful');
            return tx.hash;
        } catch (error) {
            console.error('Error approving USDFC:', error);
            throw new Error(`USDFC approval failed: ${error.message}`);
        }
    }

    /**
     * Check allowance for a spender
     * @param {string} owner - Token owner address
     * @param {string} spender - Spender address
     * @returns {Promise<string>} - Allowance in USDFC (formatted)
     */
    async getAllowance(owner, spender) {
        try {
            const allowance = await this.usdfcContract.allowance(owner, spender);
            const decimals = await this.usdfcContract.decimals();
            return ethers.utils.formatUnits(allowance, decimals);
        } catch (error) {
            console.error('Error getting allowance:', error);
            throw new Error(`Failed to get allowance: ${error.message}`);
        }
    }

    /**
     * Pay for video storage and CDN
     * @param {string} contractAddress - FilStream contract address
     * @param {string} videoId - Video identifier
     * @returns {Promise<string>} - Transaction hash
     */
    async payForVideo(contractAddress, videoId) {
        try {
            console.log('Processing video payment...');
            
            // First approve the contract to spend USDFC
            const weeklyPrice = ethers.utils.formatUnits(PRICING_CONFIG.STORAGE_PRICE_PER_WEEK, 18);
            await this.approve(contractAddress, weeklyPrice);
            
            // Get FilStream contract instance
            const filstreamContract = new ethers.Contract(
                contractAddress,
                ['function payForVideo(bytes32 videoId) external'],
                this.signer
            );
            
            // Pay for the video
            const tx = await filstreamContract.payForVideo(videoId);
            await tx.wait();
            
            console.log('Video payment successful');
            return tx.hash;
        } catch (error) {
            console.error('Error paying for video:', error);
            throw new Error(`Video payment failed: ${error.message}`);
        }
    }

    /**
     * Get token information
     * @returns {Promise<{name: string, symbol: string, decimals: number}>} - Token details
     */
    async getTokenInfo() {
        try {
            const [name, symbol, decimals] = await Promise.all([
                this.usdfcContract.name(),
                this.usdfcContract.symbol(),
                this.usdfcContract.decimals()
            ]);
            
            return {
                name,
                symbol,
                decimals: decimals.toString()
            };
        } catch (error) {
            console.error('Error getting token info:', error);
            throw new Error(`Failed to get token info: ${error.message}`);
        }
    }

    /**
     * Check if user has sufficient balance for payment
     * @param {string} amount - Required amount in USDFC
     * @returns {Promise<boolean>} - True if sufficient balance
     */
    async hasSufficientBalance(amount) {
        try {
            const balance = await this.getCurrentUserBalance();
            const requiredAmount = parseFloat(amount);
            const currentBalance = parseFloat(balance);
            
            return currentBalance >= requiredAmount;
        } catch (error) {
            console.error('Error checking balance sufficiency:', error);
            return false;
        }
    }

    /**
     * Get formatted price for display
     * @param {string} amountWei - Amount in wei
     * @returns {Promise<string>} - Formatted price string
     */
    async formatPrice(amountWei) {
        try {
            const decimals = await this.usdfcContract.decimals();
            const symbol = await this.usdfcContract.symbol();
            const formattedAmount = ethers.utils.formatUnits(amountWei, decimals);
            
            return `${formattedAmount} ${symbol}`;
        } catch (error) {
            console.error('Error formatting price:', error);
            return '0 USDFC';
        }
    }

    /**
     * Listen for transfer events
     * @param {string} address - Address to listen for
     * @param {Function} callback - Callback function for events
     * @returns {Function} - Function to stop listening
     */
    listenForTransfers(address, callback) {
        const filter = this.usdfcContract.filters.Transfer(address);
        
        const listener = (from, to, amount, event) => {
            const decimals = this.usdfcContract.decimals();
            const formattedAmount = ethers.utils.formatUnits(amount, decimals);
            
            callback({
                from,
                to,
                amount: formattedAmount,
                transactionHash: event.transactionHash
            });
        };
        
        this.usdfcContract.on(filter, listener);
        
        // Return function to stop listening
        return () => {
            this.usdfcContract.off(filter, listener);
        };
    }
}

export default USDFCService; 