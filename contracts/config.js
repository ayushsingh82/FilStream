// Contract addresses and configuration
export const USDFC_ADDRESS = "0xYourUSDFCContractAddress"; // Replace with actual USDFC contract address
export const PDP_PROVIDER_ADDRESS = "0xYourPDPProviderAddress"; // Filecoin PDP provider address
export const FILCDN_BASE_URL = "https://filcdn.io"; // FilCDN base URL

// USDFC Contract ABI
export const USDFC_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)"
];

// Filecoin PDP Contract ABI
export const PDP_ABI = [
  "function store(bytes calldata data) external returns (bytes32)",
  "function retrieve(bytes32 cid) external view returns (bytes memory)",
  "function getStoragePrice() external view returns (uint256)",
  "function payForStorage(bytes32 cid, uint256 amount) external payable"
];

// FilStream Platform Contract ABI
export const FILSTREAM_ABI = [
  "function uploadVideo(string memory title, string memory description, bytes32 cid, uint256 price) external",
  "function payForVideo(bytes32 videoId) external payable",
  "function getVideo(bytes32 videoId) external view returns (string memory, string memory, bytes32, uint256, address)",
  "function getUserVideos(address user) external view returns (bytes32[])",
  "function withdrawEarnings() external",
  "function getVideoEarnings(bytes32 videoId) external view returns (uint256)"
];

// Network Configuration
export const NETWORK_CONFIG = {
  chainId: 84532, // Base Sepolia testnet
  chainName: "Base Sepolia",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"]
};

// Pricing Configuration
export const PRICING_CONFIG = {
  STORAGE_PRICE_PER_WEEK: "20000000000000000000", // 20 USDFC in wei
  CDN_PRICE_PER_WEEK: "0", // CDN included in storage price
  MIN_FILE_SIZE: 1024, // 1KB minimum
  MAX_FILE_SIZE: 524288000 // 500MB maximum
};

// API Endpoints
export const API_ENDPOINTS = {
  PDP_UPLOAD: "/api/pdp/upload",
  PDP_RETRIEVE: "/api/pdp/retrieve",
  FILCDN_GET_URL: "/api/filcdn/get-url",
  USDFC_PAYMENT: "/api/usdfc/payment",
  VIDEO_UPLOAD: "/api/video/upload",
  VIDEO_LIST: "/api/video/list"
}; 