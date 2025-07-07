const IPFSService = require('../services/IPFSService');
const path = require('path');

// Example usage of IPFSService for ad uploads
async function uploadAdExample() {
  try {
    // Initialize IPFS service
    const ipfsService = new IPFSService();

    // Example ad data
    const adData = {
      title: "Summer Sale - 50% Off Everything!",
      description: "Don't miss our biggest sale of the year. Get 50% off all items in our store.",
      category: "Retail",
      advertiserAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      budget: "1000", // USDFC amount
      targetAudience: {
        ageRange: "18-45",
        interests: ["shopping", "fashion", "deals"],
        location: "Global"
      },
      duration: 30, // seconds
      videoPath: path.join(__dirname, '../uploads/ad-video.mp4'),
      thumbnailPath: path.join(__dirname, '../uploads/ad-thumbnail.jpg')
    };

    console.log('🚀 Starting ad upload to IPFS...');

    // Upload complete ad package
    const uploadResults = await ipfsService.uploadCompleteAd(adData);

    console.log('✅ Ad upload completed successfully!');
    console.log('📊 Upload Results:');
    console.log('- Video CID:', uploadResults.videoCid);
    console.log('- Thumbnail CID:', uploadResults.thumbnailCid);
    console.log('- Metadata CID:', uploadResults.metadataCid);

    // Get gateway URLs
    const videoUrl = ipfsService.getGatewayUrl(uploadResults.videoCid);
    const thumbnailUrl = ipfsService.getGatewayUrl(uploadResults.thumbnailCid);
    const metadataUrl = ipfsService.getGatewayUrl(uploadResults.metadataCid);

    console.log('\n🌐 Gateway URLs:');
    console.log('- Video URL:', videoUrl);
    console.log('- Thumbnail URL:', thumbnailUrl);
    console.log('- Metadata URL:', metadataUrl);

    // Pin content for persistence
    await ipfsService.pinContent(uploadResults.videoCid);
    await ipfsService.pinContent(uploadResults.thumbnailCid);
    await ipfsService.pinContent(uploadResults.metadataCid);

    console.log('\n📌 Content pinned to IPFS for persistence');

    return uploadResults;

  } catch (error) {
    console.error('❌ Error uploading ad:', error);
    throw error;
  }
}

// Example: Retrieve ad metadata
async function retrieveAdMetadata(metadataCid) {
  try {
    const ipfsService = new IPFSService();
    
    console.log('📥 Retrieving ad metadata from IPFS...');
    const metadata = await ipfsService.getAdMetadata(metadataCid);
    
    console.log('✅ Metadata retrieved successfully:');
    console.log(JSON.stringify(metadata, null, 2));
    
    return metadata;
  } catch (error) {
    console.error('❌ Error retrieving metadata:', error);
    throw error;
  }
}

// Example: Upload metadata only (when video is already uploaded)
async function uploadMetadataOnly() {
  try {
    const ipfsService = new IPFSService();

    const adMetadata = {
      title: "New Product Launch",
      description: "Introducing our revolutionary new product that will change your life.",
      category: "Technology",
      advertiserAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      budget: "5000",
      targetAudience: {
        ageRange: "25-55",
        interests: ["technology", "innovation", "gadgets"],
        location: "North America"
      },
      duration: 45,
      videoUrl: "ipfs://QmVideoCID123456789", // Already uploaded video
      thumbnailUrl: "ipfs://QmThumbnailCID123456789" // Already uploaded thumbnail
    };

    console.log('📤 Uploading ad metadata to IPFS...');
    const metadataCid = await ipfsService.uploadAdMetadata(adMetadata);
    
    console.log('✅ Metadata uploaded successfully!');
    console.log('📄 Metadata CID:', metadataCid);
    
    return metadataCid;
  } catch (error) {
    console.error('❌ Error uploading metadata:', error);
    throw error;
  }
}

// Example: Validate CID and get gateway URL
function validateAndGetUrl(cid) {
  const ipfsService = new IPFSService();
  
  if (ipfsService.isValidCID(cid)) {
    const gatewayUrl = ipfsService.getGatewayUrl(cid);
    console.log('✅ Valid CID:', cid);
    console.log('🌐 Gateway URL:', gatewayUrl);
    return gatewayUrl;
  } else {
    console.error('❌ Invalid CID format:', cid);
    return null;
  }
}

// Export functions for use in other modules
module.exports = {
  uploadAdExample,
  retrieveAdMetadata,
  uploadMetadataOnly,
  validateAndGetUrl
};

// Run example if this file is executed directly
if (require.main === module) {
  // Example usage
  uploadAdExample()
    .then(results => {
      console.log('\n🎉 Ad upload example completed successfully!');
      console.log('📋 Results:', results);
    })
    .catch(error => {
      console.error('\n💥 Ad upload example failed:', error);
    });
} 