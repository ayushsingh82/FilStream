'use client'
import React, { useState } from 'react'
import { Play, Heart, MessageCircle, Share, User, Filter } from 'lucide-react'

const ShortsPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Categories for filtering
  const categories = ['All', 'Gaming', 'Cooking', 'Tech', 'Nature', 'Music', 'Fitness', 'Travel']

  // Mock data for shorts with categories
  const shorts = [
    {
      id: 1,
      title: "Amazing Sunset Views",
      creator: "NatureLover",
      category: "Nature",
      views: "1.2K",
      likes: 234,
      comments: 45,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://picsum.photos/400/600?random=1"
    },
    {
      id: 2,
      title: "Cooking Masterclass",
      creator: "ChefPro",
      category: "Cooking",
      views: "3.4K",
      likes: 567,
      comments: 89,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://picsum.photos/400/600?random=2"
    },
    {
      id: 3,
      title: "Tech Review: Latest Gadgets",
      creator: "TechGuru",
      category: "Tech",
      views: "5.6K",
      likes: 789,
      comments: 123,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://picsum.photos/400/600?random=3"
    },
    {
      id: 4,
      title: "Epic Gaming Moments",
      creator: "GameMaster",
      category: "Gaming",
      views: "8.9K",
      likes: 1200,
      comments: 234,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://picsum.photos/400/600?random=4"
    },
    {
      id: 5,
      title: "Workout Routine",
      creator: "FitLife",
      category: "Fitness",
      views: "2.1K",
      likes: 456,
      comments: 67,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://picsum.photos/400/600?random=5"
    },
    {
      id: 6,
      title: "Travel Vlog: Paris",
      creator: "Wanderlust",
      category: "Travel",
      views: "4.3K",
      likes: 678,
      comments: 98,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://picsum.photos/400/600?random=6"
    }
  ]

  // Filter shorts based on selected category
  const filteredShorts = selectedCategory === 'All' 
    ? shorts 
    : shorts.filter(short => short.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto h-screen overflow-hidden">
        {/* Category Filter */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentVideo(0) // Reset to first video when changing category
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Video Container */}
        <div className="relative h-full">
          {filteredShorts.length > 0 ? (
            filteredShorts.map((short, index) => (
              <div
                key={short.id}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === currentVideo ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Video Background */}
                <div className="relative h-full bg-gradient-to-b from-gray-900 to-black">
                  <img
                    src={short.thumbnail}
                    alt={short.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {short.category}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Creator Info */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{short.creator}</h3>
                        <p className="text-gray-300 text-sm">{short.views} views</p>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-white text-lg font-semibold mb-4">{short.title}</h2>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-6">
                      <button className="flex flex-col items-center space-y-1">
                        <Heart className="h-6 w-6 text-white" />
                        <span className="text-white text-sm">{short.likes}</span>
                      </button>
                      <button className="flex flex-col items-center space-y-1">
                        <MessageCircle className="h-6 w-6 text-white" />
                        <span className="text-white text-sm">{short.comments}</span>
                      </button>
                      <button className="flex flex-col items-center space-y-1">
                        <Share className="h-6 w-6 text-white" />
                        <span className="text-white text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // No videos found for selected category
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No videos found</h3>
                <p className="text-gray-600">Try selecting a different category</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation Dots */}
        {filteredShorts.length > 0 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {filteredShorts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentVideo ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShortsPage 