const { create } = require('ipfs-http-client');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

class IPFSService {
  constructor() {
    // Initialize IPFS client - you can use Infura, Pinata, or local node
    this.ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: `Basic ${Buffer.from(
          process.env.INFURA_IPFS_PROJECT_ID + ':' + process.env.INFURA_IPFS_PROJECT_SECRET
        ).toString('base64')}`
      }
    });
  }

  /**
   * Upload ad metadata to IPFS
   * @param {Object} adData - Ad metadata object
   * @returns {Promise<string>} IPFS hash (CID)
   */
  async uploadAdMetadata(adData) {
    try {
      const metadata = {
        name: adData.title,
        description: adData.description,
        category: adData.category,
        advertiser: adData.advertiserAddress,
        budget: adData.budget,
        targetAudience: adData.targetAudience,
        duration: adData.duration,
        videoUrl: adData.videoUrl,
        thumbnailUrl: adData.thumbnailUrl,
        createdAt: new Date().toISOString(),
        version: '1.0.0',
        platform: 'FilStream'
      };

      // Convert metadata to JSON string
      const metadataBuffer = Buffer.from(JSON.stringify(metadata, null, 2));

      // Upload to IPFS
      const result = await this.ipfs.add(metadataBuffer);
      
      console.log('Ad metadata uploaded to IPFS:', result.cid.toString());
      return result.cid.toString();
    } catch (error) {
      console.error('Error uploading ad metadata to IPFS:', error);
      throw new Error('Failed to upload ad metadata to IPFS');
    }
  }

  /**
   * Upload ad video file to IPFS
   * @param {string} filePath - Path to video file
   * @returns {Promise<string>} IPFS hash (CID)
   */
  async uploadAdVideo(filePath) {
    try {
      // Read file
      const fileBuffer = fs.readFileSync(filePath);
      
      // Upload to IPFS
      const result = await this.ipfs.add(fileBuffer, {
        pin: true,
        metadata: {
          name: path.basename(filePath),
          contentType: 'video/mp4'
        }
      });

      console.log('Ad video uploaded to IPFS:', result.cid.toString());
      return result.cid.toString();
    } catch (error) {
      console.error('Error uploading ad video to IPFS:', error);
      throw new Error('Failed to upload ad video to IPFS');
    }
  }

  /**
   * Upload ad thumbnail to IPFS
   * @param {string} filePath - Path to thumbnail image
   * @returns {Promise<string>} IPFS hash (CID)
   */
  async uploadAdThumbnail(filePath) {
    try {
      // Read file
      const fileBuffer = fs.readFileSync(filePath);
      
      // Upload to IPFS
      const result = await this.ipfs.add(fileBuffer, {
        pin: true,
        metadata: {
          name: path.basename(filePath),
          contentType: 'image/jpeg'
        }
      });

      console.log('Ad thumbnail uploaded to IPFS:', result.cid.toString());
      return result.cid.toString();
    } catch (error) {
      console.error('Error uploading ad thumbnail to IPFS:', error);
      throw new Error('Failed to upload ad thumbnail to IPFS');
    }
  }

  /**
   * Upload complete ad package (metadata + video + thumbnail)
   * @param {Object} adData - Complete ad data
   * @returns {Promise<Object>} Object containing all IPFS hashes
   */
  async uploadCompleteAd(adData) {
    try {
      const results = {};

      // Upload video file
      if (adData.videoPath) {
        results.videoCid = await this.uploadAdVideo(adData.videoPath);
      }

      // Upload thumbnail
      if (adData.thumbnailPath) {
        results.thumbnailCid = await this.uploadAdThumbnail(adData.thumbnailPath);
      }

      // Update metadata with IPFS URLs
      const metadataWithUrls = {
        ...adData,
        videoUrl: results.videoCid ? `ipfs://${results.videoCid}` : adData.videoUrl,
        thumbnailUrl: results.thumbnailCid ? `ipfs://${results.thumbnailCid}` : adData.thumbnailUrl
      };

      // Upload metadata
      results.metadataCid = await this.uploadAdMetadata(metadataWithUrls);

      console.log('Complete ad package uploaded to IPFS:', results);
      return results;
    } catch (error) {
      console.error('Error uploading complete ad package:', error);
      throw new Error('Failed to upload complete ad package to IPFS');
    }
  }

  /**
   * Retrieve ad metadata from IPFS
   * @param {string} cid - IPFS content identifier
   * @returns {Promise<Object>} Ad metadata object
   */
  async getAdMetadata(cid) {
    try {
      const chunks = [];
      for await (const chunk of this.ipfs.cat(cid)) {
        chunks.push(chunk);
      }
      
      const metadataBuffer = Buffer.concat(chunks);
      const metadata = JSON.parse(metadataBuffer.toString());
      
      return metadata;
    } catch (error) {
      console.error('Error retrieving ad metadata from IPFS:', error);
      throw new Error('Failed to retrieve ad metadata from IPFS');
    }
  }

  /**
   * Pin content to IPFS for persistence
   * @param {string} cid - IPFS content identifier
   * @returns {Promise<boolean>} Success status
   */
  async pinContent(cid) {
    try {
      await this.ipfs.pin.add(cid);
      console.log('Content pinned to IPFS:', cid);
      return true;
    } catch (error) {
      console.error('Error pinning content to IPFS:', error);
      throw new Error('Failed to pin content to IPFS');
    }
  }

  /**
   * Unpin content from IPFS
   * @param {string} cid - IPFS content identifier
   * @returns {Promise<boolean>} Success status
   */
  async unpinContent(cid) {
    try {
      await this.ipfs.pin.rm(cid);
      console.log('Content unpinned from IPFS:', cid);
      return true;
    } catch (error) {
      console.error('Error unpinning content from IPFS:', error);
      throw new Error('Failed to unpin content from IPFS');
    }
  }

  /**
   * Get IPFS gateway URL for content
   * @param {string} cid - IPFS content identifier
   * @param {string} gateway - IPFS gateway (default: ipfs.io)
   * @returns {string} Gateway URL
   */
  getGatewayUrl(cid, gateway = 'https://ipfs.io') {
    return `${gateway}/ipfs/${cid}`;
  }

  /**
   * Validate IPFS CID format
   * @param {string} cid - IPFS content identifier
   * @returns {boolean} Valid CID status
   */
  isValidCID(cid) {
    // Basic CID validation (starts with Qm for v0 or bafy for v1)
    const cidRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|bafy[a-z2-7]{55})$/;
    return cidRegex.test(cid);
  }
}

module.exports = IPFSService; 