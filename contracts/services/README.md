# 📤 IPFS Service for FilStream Ad Uploads

This service handles uploading ad metadata, videos, and thumbnails to IPFS for the FilStream decentralized video streaming platform.

## 🚀 Features

- **Ad Metadata Upload**: Upload structured ad data to IPFS
- **Video File Upload**: Upload ad video files with proper metadata
- **Thumbnail Upload**: Upload ad thumbnails for preview
- **Complete Package Upload**: Upload entire ad package in one operation
- **Content Retrieval**: Retrieve metadata from IPFS using CID
- **Content Pinning**: Pin content for persistence
- **Gateway URLs**: Generate IPFS gateway URLs for content access
- **CID Validation**: Validate IPFS content identifiers

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# IPFS Configuration (Infura)
INFURA_IPFS_PROJECT_ID=your_infura_project_id
INFURA_IPFS_PROJECT_SECRET=your_infura_project_secret

# Alternative: Pinata Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key

# Alternative: Local IPFS Node
IPFS_HOST=localhost
IPFS_PORT=5001
IPFS_PROTOCOL=http
```

## 📋 Usage Examples

### 1. Upload Complete Ad Package

```javascript
const IPFSService = require('./services/IPFSService');

const ipfsService = new IPFSService();

const adData = {
  title: "Summer Sale - 50% Off Everything!",
  description: "Don't miss our biggest sale of the year.",
  category: "Retail",
  advertiserAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  budget: "1000",
  targetAudience: {
    ageRange: "18-45",
    interests: ["shopping", "fashion"],
    location: "Global"
  },
  duration: 30,
  videoPath: "./uploads/ad-video.mp4",
  thumbnailPath: "./uploads/ad-thumbnail.jpg"
};

// Upload complete ad package
const results = await ipfsService.uploadCompleteAd(adData);
console.log('Video CID:', results.videoCid);
console.log('Thumbnail CID:', results.thumbnailCid);
console.log('Metadata CID:', results.metadataCid);
```

### 2. Upload Metadata Only

```javascript
const adMetadata = {
  title: "New Product Launch",
  description: "Introducing our revolutionary new product.",
  category: "Technology",
  advertiserAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  budget: "5000",
  targetAudience: {
    ageRange: "25-55",
    interests: ["technology", "innovation"],
    location: "North America"
  },
  duration: 45,
  videoUrl: "ipfs://QmVideoCID123456789",
  thumbnailUrl: "ipfs://QmThumbnailCID123456789"
};

const metadataCid = await ipfsService.uploadAdMetadata(adMetadata);
console.log('Metadata CID:', metadataCid);
```

### 3. Retrieve Ad Metadata

```javascript
const metadata = await ipfsService.getAdMetadata(metadataCid);
console.log('Ad Title:', metadata.name);
console.log('Description:', metadata.description);
console.log('Category:', metadata.category);
```

### 4. Get Gateway URLs

```javascript
const videoUrl = ipfsService.getGatewayUrl(videoCid);
const thumbnailUrl = ipfsService.getGatewayUrl(thumbnailCid);
const metadataUrl = ipfsService.getGatewayUrl(metadataCid);

console.log('Video URL:', videoUrl);
console.log('Thumbnail URL:', thumbnailUrl);
console.log('Metadata URL:', metadataUrl);
```

### 5. Pin Content for Persistence

```javascript
await ipfsService.pinContent(videoCid);
await ipfsService.pinContent(thumbnailCid);
await ipfsService.pinContent(metadataCid);
console.log('Content pinned successfully');
```

## 📊 Ad Metadata Structure

```json
{
  "name": "Ad Title",
  "description": "Ad description",
  "category": "Ad category",
  "advertiser": "Advertiser wallet address",
  "budget": "Ad budget in USDFC",
  "targetAudience": {
    "ageRange": "18-45",
    "interests": ["shopping", "fashion"],
    "location": "Global"
  },
  "duration": 30,
  "videoUrl": "ipfs://QmVideoCID",
  "thumbnailUrl": "ipfs://QmThumbnailCID",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "platform": "FilStream"
}
```

## 🔗 IPFS Gateway Options

The service supports multiple IPFS gateways:

- **ipfs.io**: `https://ipfs.io/ipfs/{cid}`
- **dweb.link**: `https://dweb.link/ipfs/{cid}`
- **gateway.pinata.cloud**: `https://gateway.pinata.cloud/ipfs/{cid}`
- **infura.io**: `https://ipfs.infura.io/ipfs/{cid}`

## 🛠️ Available Methods

### Core Upload Methods
- `uploadAdMetadata(adData)` - Upload ad metadata
- `uploadAdVideo(filePath)` - Upload video file
- `uploadAdThumbnail(filePath)` - Upload thumbnail image
- `uploadCompleteAd(adData)` - Upload complete ad package

### Content Management
- `getAdMetadata(cid)` - Retrieve metadata from IPFS
- `pinContent(cid)` - Pin content for persistence
- `unpinContent(cid)` - Unpin content from IPFS

### Utility Methods
- `getGatewayUrl(cid, gateway)` - Generate gateway URL
- `isValidCID(cid)` - Validate CID format

## 🚀 Running Examples

```bash
# Run the complete ad upload example
npm run upload-ad

# Or run directly
node examples/adUploadExample.js
```

## 📝 Error Handling

The service includes comprehensive error handling:

```javascript
try {
  const results = await ipfsService.uploadCompleteAd(adData);
  console.log('Upload successful:', results);
} catch (error) {
  console.error('Upload failed:', error.message);
  // Handle specific error types
  if (error.message.includes('IPFS')) {
    // IPFS-specific error handling
  }
}
```

## 🔒 Security Considerations

- **Environment Variables**: Never commit API keys to version control
- **File Validation**: Validate file types and sizes before upload
- **CID Verification**: Always verify CIDs after upload
- **Content Pinning**: Pin important content to prevent garbage collection

## 📈 Performance Tips

- **Batch Uploads**: Upload multiple files in parallel when possible
- **File Compression**: Compress videos before upload to reduce costs
- **Caching**: Cache frequently accessed metadata
- **Gateway Selection**: Choose the fastest gateway for your region

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 