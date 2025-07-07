'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Heart, MessageCircle, Share, User, Filter, Pause } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const ShortsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Categories for filtering
  const categories = ['All', 'Gaming', 'Cooking', 'Tech', 'Nature', 'Music', 'Fitness', 'Travel']

  // Mock data for shorts with working video URLs and categories
  const shorts = [
    {
      id: 1,
      title: "Amazing Sunset Views",
      creator: "NatureLover",
      category: "Nature",
      views: "1.2K",
      likes: 234,
      comments: 45,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
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
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
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
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
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
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
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
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnail: "https://picsum.photos/400/600?random=6"
    },
    {
      id: 7,
      title: "Guitar Solo Masterpiece",
      creator: "MusicPro",
      category: "Music",
      views: "6.7K",
      likes: 890,
      comments: 156,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnail: "https://picsum.photos/400/600?random=7"
    },
    {
      id: 8,
      title: "Mountain Climbing Adventure",
      creator: "AdventureSeeker",
      category: "Nature",
      views: "3.2K",
      likes: 445,
      comments: 78,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMobsters.mp4",
      thumbnail: "https://picsum.photos/400/600?random=8"
    }
  ]

  // Filter shorts based on selected category
  const filteredShorts = selectedCategory === 'All' 
    ? shorts 
    : shorts.filter(short => short.category === selectedCategory)

  // Handle category selection
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category)
    setCurrentVideoIndex(0)
  }, [])

  // Reset video index when category changes
  useEffect(() => {
    setCurrentVideoIndex(0)
  }, [selectedCategory])

  // Individual Video Component with Intersection Observer
  const VideoReel = ({ short, index }: { short: any; index: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    
    // Intersection Observer for auto-play
    const { ref, inView } = useInView({
      threshold: 0.5,
      triggerOnce: false
    })

    // Auto-play when video comes into view
    useEffect(() => {
      if (inView && videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true)
          setCurrentVideoIndex(index)
        }).catch(() => {
          setIsPlaying(false)
        })
      } else if (videoRef.current) {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }, [inView, index])

    // Handle manual play/pause
    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
          setIsPlaying(false)
        } else {
          videoRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch(() => {
            setIsPlaying(false)
          })
        }
      }
    }

    // Handle like toggle
    const toggleLike = () => {
      setIsLiked(!isLiked)
    }

    return (
      <div 
        ref={ref}
        className="relative h-screen bg-black snap-start"
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={short.thumbnail}
          loop
          muted
          playsInline
          preload="metadata"
          onClick={togglePlay}
        >
          <source src={short.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {short.category}
          </span>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
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
            <button 
              onClick={toggleLike}
              className="flex flex-col items-center space-y-1"
            >
              <Heart 
                className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} 
              />
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
        
        {/* Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button 
            onClick={togglePlay}
            className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm hover:bg-opacity-30 transition-all"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="h-8 w-8 text-white ml-1" />
            )}
          </button>
        </div>

        {/* Video Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: '0%' }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto">
        {/* Category Filter */}
        <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-20">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
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

        {/* Video Container with Snap Scrolling */}
        <div className="h-screen overflow-y-auto snap-y snap-mandatory">
          {filteredShorts.length > 0 ? (
            filteredShorts.map((short, index) => (
              <VideoReel 
                key={short.id} 
                short={short} 
                index={index}
              />
            ))
          ) : (
            // No videos found for selected category
            <div className="flex items-center justify-center h-screen">
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
        
        {/* Video Counter */}
        {filteredShorts.length > 0 && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
            {currentVideoIndex + 1} / {filteredShorts.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShortsPage 