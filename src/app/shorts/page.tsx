'use client'
import React, { useState } from 'react'
import { Play, Heart, MessageCircle, Share, User } from 'lucide-react'

const ShortsPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0)

  // Mock data for shorts
  const shorts = [
    {
      id: 1,
      title: "Amazing Sunset Views",
      creator: "NatureLover",
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
      views: "5.6K",
      likes: 789,
      comments: 123,
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://picsum.photos/400/600?random=3"
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto h-screen overflow-hidden">
        {/* Video Container */}
        <div className="relative h-full">
          {shorts.map((short, index) => (
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
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {shorts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideo(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentVideo ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShortsPage 