'use client'
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { Play, Heart, MessageCircle, Share, User, Filter, Pause } from 'lucide-react'
import throttle from 'lodash/throttle'

// Mock data for shorts with working video URLs and categories
const shortsData = [
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

// Memoized Short component to prevent unnecessary re-renders
const Short = React.memo(({
  short,
  isPlaying,
  isLiked,
  onLike,
  onShare,
  onComment
}: {
  short: any
  isPlaying: boolean
  isLiked: boolean
  onLike: () => void
  onShare: () => void
  onComment: () => void
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Video playback control
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        if (isPlaying) {
          await video.play()
        } else {
          video.pause()
        }
      } catch (err) {
        console.error("Playback error:", err)
      }
    }

    playVideo()
  }, [isPlaying])

  return (
    <div className="relative h-screen bg-black">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={short.thumbnail}
        loop
        muted
        playsInline
        preload="metadata"
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
            onClick={onLike}
            className="flex flex-col items-center space-y-1"
          >
            <Heart 
              className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} 
            />
            <span className="text-white text-sm">{short.likes}</span>
          </button>
          <button 
            onClick={onComment}
            className="flex flex-col items-center space-y-1"
          >
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="text-white text-sm">{short.comments}</span>
          </button>
          <button 
            onClick={onShare}
            className="flex flex-col items-center space-y-1"
          >
            <Share className="h-6 w-6 text-white" />
            <span className="text-white text-sm">Share</span>
          </button>
        </div>
      </div>
      
      {/* Play/Pause Button */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm">
          {isPlaying ? (
            <Pause className="h-8 w-8 text-white" />
          ) : (
            <Play className="h-8 w-8 text-white ml-1" />
          )}
        </div>
      </div>

      {/* Video Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: '0%' }}></div>
      </div>
    </div>
  )
})

Short.displayName = 'Short'

const ShortsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentShortIndex, setCurrentShortIndex] = useState(0)
  const [loadedShorts, setLoadedShorts] = useState(3)
  const [likedShorts, setLikedShorts] = useState<{[key: number]: boolean}>({})
  const loadingRef = useRef(false)

  // Categories for filtering
  const categories = ['All', 'Gaming', 'Cooking', 'Tech', 'Nature', 'Music', 'Fitness', 'Travel']

  // Filter shorts based on selected category
  const filteredShorts = useMemo(() => {
    return selectedCategory === 'All' 
      ? shortsData 
      : shortsData.filter(short => short.category === selectedCategory)
  }, [selectedCategory])

  // Throttled scroll handler
  const handleScroll = useMemo(() => throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const { innerHeight } = window

    const nextShortIndex = Math.floor((scrollTop + innerHeight / 2) / innerHeight)
    if (nextShortIndex !== currentShortIndex) {
      setCurrentShortIndex(nextShortIndex)
    }

    if (scrollTop + innerHeight >= scrollHeight - 100 && !loadingRef.current) {
      loadingRef.current = true
      setLoadedShorts(prev => Math.min(prev + 3, filteredShorts.length))
      setTimeout(() => loadingRef.current = false, 1000)
    }
  }, 200), [currentShortIndex, filteredShorts.length])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Reset when category changes
  useEffect(() => {
    setCurrentShortIndex(0)
    setLoadedShorts(3)
    setLikedShorts({})
  }, [selectedCategory])

  const handleLike = useCallback((id: number) => {
    setLikedShorts(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const handleShare = useCallback((id: number) => {
    const shareUrl = `https://filstream.io/shorts/${id}`
    if (navigator.share) {
      navigator.share({
        title: "Check out this FilStream short!",
        text: "Watch amazing content on FilStream",
        url: shareUrl,
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert("Link copied to clipboard!"))
        .catch(console.error)
    }
  }, [])

  const handleComment = useCallback((id: number) => {
    // Handle comment functionality
    console.log('Comment on short:', id)
  }, [])

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
                onClick={() => setSelectedCategory(category)}
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
        <div className="relative w-full min-h-screen p-0 m-0 overflow-y-auto">
          {filteredShorts.slice(0, loadedShorts).map((short, index) => (
            <div key={short.id} className="relative">
              <Short
                short={short}
                isPlaying={currentShortIndex === index}
                isLiked={!!likedShorts[short.id]}
                onLike={() => handleLike(short.id)}
                onShare={() => handleShare(short.id)}
                onComment={() => handleComment(short.id)}
              />
            </div>
          ))}

          {loadingRef.current && (
            <div className="fixed z-50 flex items-center justify-center gap-2 font-bold text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Loading more shorts...
            </div>
          )}
        </div>
        
        {/* Video Counter */}
        {filteredShorts.length > 0 && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
            {currentShortIndex + 1} / {filteredShorts.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShortsPage 