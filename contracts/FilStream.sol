// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FilStream is Ownable, ReentrancyGuard {
    IERC20 public usdfcToken;
    
    struct Video {
        string title;
        string description;
        bytes32 cid;
        uint256 price;
        address creator;
        uint256 uploadTime;
        bool isActive;
        uint256 totalViews;
        uint256 totalEarnings;
    }
    
    struct User {
        bytes32[] uploadedVideos;
        uint256 totalEarnings;
        bool isRegistered;
    }
    
    mapping(bytes32 => Video) public videos;
    mapping(address => User) public users;
    mapping(bytes32 => mapping(address => bool)) public hasWatched;
    
    uint256 public platformFee = 500; // 5% platform fee (in basis points)
    uint256 public storagePricePerWeek = 20 * 10**18; // 20 USDFC per week
    
    event VideoUploaded(bytes32 indexed videoId, address indexed creator, string title, bytes32 cid);
    event VideoWatched(bytes32 indexed videoId, address indexed viewer);
    event PaymentProcessed(bytes32 indexed videoId, address indexed creator, uint256 amount);
    event EarningsWithdrawn(address indexed user, uint256 amount);
    
    constructor(address _usdfcToken) {
        usdfcToken = IERC20(_usdfcToken);
    }
    
    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }
    
    function registerUser() external {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender].isRegistered = true;
    }
    
    function uploadVideo(
        string memory _title,
        string memory _description,
        bytes32 _cid,
        uint256 _price
    ) external onlyRegisteredUser nonReentrant {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_price >= storagePricePerWeek, "Price must be at least storage cost");
        
        bytes32 videoId = keccak256(abi.encodePacked(_cid, msg.sender, block.timestamp));
        
        videos[videoId] = Video({
            title: _title,
            description: _description,
            cid: _cid,
            price: _price,
            creator: msg.sender,
            uploadTime: block.timestamp,
            isActive: true,
            totalViews: 0,
            totalEarnings: 0
        });
        
        users[msg.sender].uploadedVideos.push(videoId);
        
        emit VideoUploaded(videoId, msg.sender, _title, _cid);
    }
    
    function payForVideo(bytes32 _videoId) external onlyRegisteredUser nonReentrant {
        Video storage video = videos[_videoId];
        require(video.isActive, "Video not active");
        require(video.creator != msg.sender, "Cannot pay for own video");
        require(!hasWatched[_videoId][msg.sender], "Already watched");
        
        uint256 paymentAmount = video.price;
        uint256 platformFeeAmount = (paymentAmount * platformFee) / 10000;
        uint256 creatorAmount = paymentAmount - platformFeeAmount;
        
        // Transfer USDFC from viewer to contract
        require(usdfcToken.transferFrom(msg.sender, address(this), paymentAmount), "Payment failed");
        
        // Update video stats
        video.totalViews++;
        video.totalEarnings += creatorAmount;
        hasWatched[_videoId][msg.sender] = true;
        
        // Update creator earnings
        users[video.creator].totalEarnings += creatorAmount;
        
        emit VideoWatched(_videoId, msg.sender);
        emit PaymentProcessed(_videoId, video.creator, creatorAmount);
    }
    
    function getVideo(bytes32 _videoId) external view returns (
        string memory title,
        string memory description,
        bytes32 cid,
        uint256 price,
        address creator,
        uint256 uploadTime,
        bool isActive,
        uint256 totalViews,
        uint256 totalEarnings
    ) {
        Video storage video = videos[_videoId];
        return (
            video.title,
            video.description,
            video.cid,
            video.price,
            video.creator,
            video.uploadTime,
            video.isActive,
            video.totalViews,
            video.totalEarnings
        );
    }
    
    function getUserVideos(address _user) external view returns (bytes32[] memory) {
        return users[_user].uploadedVideos;
    }
    
    function getVideoEarnings(bytes32 _videoId) external view returns (uint256) {
        return videos[_videoId].totalEarnings;
    }
    
    function withdrawEarnings() external onlyRegisteredUser nonReentrant {
        uint256 earnings = users[msg.sender].totalEarnings;
        require(earnings > 0, "No earnings to withdraw");
        
        users[msg.sender].totalEarnings = 0;
        
        require(usdfcToken.transfer(msg.sender, earnings), "Withdrawal failed");
        
        emit EarningsWithdrawn(msg.sender, earnings);
    }
    
    function setPlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 1000, "Fee cannot exceed 10%");
        platformFee = _newFee;
    }
    
    function setStoragePrice(uint256 _newPrice) external onlyOwner {
        storagePricePerWeek = _newPrice;
    }
    
    function withdrawPlatformFees() external onlyOwner {
        uint256 balance = usdfcToken.balanceOf(address(this));
        require(balance > 0, "No fees to withdraw");
        
        require(usdfcToken.transfer(owner(), balance), "Fee withdrawal failed");
    }
    
    function deactivateVideo(bytes32 _videoId) external {
        Video storage video = videos[_videoId];
        require(video.creator == msg.sender, "Only creator can deactivate");
        video.isActive = false;
    }
    
    function getUserEarnings(address _user) external view returns (uint256) {
        return users[_user].totalEarnings;
    }
    
    function getVideoCount() external view returns (uint256) {
        // This would need to be tracked separately in a real implementation
        return 0;
    }
} 