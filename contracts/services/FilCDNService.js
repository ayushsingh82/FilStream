// FilCDN Service for Content Delivery Network Operations
import { FILCDN_BASE_URL } from '../config.js';

class FilCDNService {
    constructor() {
        this.baseUrl = FILCDN_BASE_URL;
    }

    /**
     * Generate FilCDN URL from CID
     * @param {string} cid - Content Identifier
     * @param {Object} options - CDN options
     * @returns {string} - FilCDN URL
     */
    generateUrl(cid, options = {}) {
        const {
            quality = 'auto',
            format = 'mp4',
            region = 'auto',
            cache = true
        } = options;

        const url = new URL(`/content/${cid}`, this.baseUrl);
        
        // Add query parameters
        url.searchParams.set('quality', quality);
        url.searchParams.set('format', format);
        url.searchParams.set('region', region);
        url.searchParams.set('cache', cache.toString());
        
        return url.toString();
    }

    /**
     * Get video streaming URL
     * @param {string} cid - Content Identifier
     * @param {Object} options - Streaming options
     * @returns {string} - Streaming URL
     */
    getVideoStreamUrl(cid, options = {}) {
        const {
            quality = 'auto',
            format = 'mp4',
            adaptive = true
        } = options;

        const url = new URL(`/stream/${cid}`, this.baseUrl);
        
        url.searchParams.set('quality', quality);
        url.searchParams.set('format', format);
        url.searchParams.set('adaptive', adaptive.toString());
        
        return url.toString();
    }

    /**
     * Get video thumbnail URL
     * @param {string} cid - Content Identifier
     * @param {Object} options - Thumbnail options
     * @returns {string} - Thumbnail URL
     */
    getThumbnailUrl(cid, options = {}) {
        const {
            width = 400,
            height = 300,
            time = '00:00:05' // 5 seconds into video
        } = options;

        const url = new URL(`/thumbnail/${cid}`, this.baseUrl);
        
        url.searchParams.set('width', width.toString());
        url.searchParams.set('height', height.toString());
        url.searchParams.set('time', time);
        
        return url.toString();
    }

    /**
     * Get video metadata
     * @param {string} cid - Content Identifier
     * @returns {Promise<Object>} - Video metadata
     */
    async getVideoMetadata(cid) {
        try {
            const url = new URL(`/metadata/${cid}`, this.baseUrl);
            const response = await fetch(url.toString());
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching video metadata:', error);
            throw new Error(`Failed to get video metadata: ${error.message}`);
        }
    }

    /**
     * Check if content is available on CDN
     * @param {string} cid - Content Identifier
     * @returns {Promise<boolean>} - True if available
     */
    async isContentAvailable(cid) {
        try {
            const url = new URL(`/status/${cid}`, this.baseUrl);
            const response = await fetch(url.toString());
            
            if (response.ok) {
                const data = await response.json();
                return data.available === true;
            }
            
            return false;
        } catch (error) {
            console.error('Error checking content availability:', error);
            return false;
        }
    }

    /**
     * Get content delivery statistics
     * @param {string} cid - Content Identifier
     * @returns {Promise<Object>} - Delivery statistics
     */
    async getDeliveryStats(cid) {
        try {
            const url = new URL(`/stats/${cid}`, this.baseUrl);
            const response = await fetch(url.toString());
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching delivery stats:', error);
            throw new Error(`Failed to get delivery stats: ${error.message}`);
        }
    }

    /**
     * Preload content to CDN
     * @param {string} cid - Content Identifier
     * @param {Object} options - Preload options
     * @returns {Promise<Object>} - Preload result
     */
    async preloadContent(cid, options = {}) {
        try {
            const {
                regions = ['us-east-1', 'us-west-1', 'eu-west-1'],
                priority = 'normal'
            } = options;

            const url = new URL(`/preload/${cid}`, this.baseUrl);
            
            const response = await fetch(url.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    regions,
                    priority
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error preloading content:', error);
            throw new Error(`Failed to preload content: ${error.message}`);
        }
    }

    /**
     * Get optimal CDN region for user
     * @param {string} userIP - User's IP address (optional)
     * @returns {Promise<string>} - Optimal region
     */
    async getOptimalRegion(userIP = null) {
        try {
            const url = new URL('/region/optimal', this.baseUrl);
            
            if (userIP) {
                url.searchParams.set('ip', userIP);
            }
            
            const response = await fetch(url.toString());
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.region;
        } catch (error) {
            console.error('Error getting optimal region:', error);
            return 'us-east-1'; // Default fallback
        }
    }

    /**
     * Create HLS playlist URL
     * @param {string} cid - Content Identifier
     * @param {Object} options - HLS options
     * @returns {string} - HLS playlist URL
     */
    getHLSPlaylistUrl(cid, options = {}) {
        const {
            quality = 'auto',
            region = 'auto'
        } = options;

        const url = new URL(`/hls/${cid}/playlist.m3u8`, this.baseUrl);
        
        url.searchParams.set('quality', quality);
        url.searchParams.set('region', region);
        
        return url.toString();
    }

    /**
     * Create DASH manifest URL
     * @param {string} cid - Content Identifier
     * @param {Object} options - DASH options
     * @returns {string} - DASH manifest URL
     */
    getDASHManifestUrl(cid, options = {}) {
        const {
            quality = 'auto',
            region = 'auto'
        } = options;

        const url = new URL(`/dash/${cid}/manifest.mpd`, this.baseUrl);
        
        url.searchParams.set('quality', quality);
        url.searchParams.set('region', region);
        
        return url.toString();
    }

    /**
     * Get content access token
     * @param {string} cid - Content Identifier
     * @param {Object} options - Token options
     * @returns {Promise<string>} - Access token
     */
    async getAccessToken(cid, options = {}) {
        try {
            const {
                expiresIn = 3600, // 1 hour
                permissions = ['read']
            } = options;

            const url = new URL(`/token/${cid}`, this.baseUrl);
            
            const response = await fetch(url.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    expiresIn,
                    permissions
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.token;
        } catch (error) {
            console.error('Error getting access token:', error);
            throw new Error(`Failed to get access token: ${error.message}`);
        }
    }

    /**
     * Validate CDN URL
     * @param {string} url - CDN URL to validate
     * @returns {boolean} - True if valid FilCDN URL
     */
    isValidCDNUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.includes('filcdn.io') || 
                   urlObj.hostname.includes('filcdn.com');
        } catch (error) {
            return false;
        }
    }
}

export default FilCDNService; 