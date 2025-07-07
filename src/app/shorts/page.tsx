'use client'
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { Filter } from 'lucide-react'
import { FaShareAlt, FaThumbsUp, FaVolumeUp, FaVolumeMute } from "react-icons/fa"
import { motion } from "framer-motion"
import videolinks from './videolinks'

// Simple throttle implementation
const throttle = (func: (...args: unknown[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null
  return (...args: unknown[]) => {
    if (timeoutId) return
    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }
}

interface Short {
  id: number
  src: string
  tags: string[]
}

// Memoized Short component to prevent unnecessary re-renders
const Short = React.memo(({
  short,
  isPlaying,
  isLiked,
  isMuted,
  onLike,
  onShare,
  toggleMute
}: {
  short: Short
  isPlaying: boolean
  isLiked: boolean
  isMuted: boolean
  onLike: () => void
  onShare: () => void
  toggleMute: () => void
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [animateThumb, setAnimateThumb] = useState(false)
  const [animateSpeaker, setAnimateSpeaker] = useState(false)

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

  // Animation handlers
  const triggerAnimation = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true)
    setTimeout(() => setter(false), 1000)
  }

  const handleLikeClick = useCallback(() => {
    onLike()
    triggerAnimation(setAnimateThumb)
  }, [onLike])

  const handleMuteClick = useCallback(() => {
    toggleMute()
    triggerAnimation(setAnimateSpeaker)
  }, [toggleMute])

  // Memoized buttons to prevent unnecessary re-renders
  const ControlButtons = useMemo(() => (
    <div className="absolute z-10 flex items-center justify-center gap-2 bottom-5 left-5">
      <motion.button
        onClick={handleMuteClick}
        className="px-4 py-2 text-base text-white transition-colors duration-300 rounded-md bg-black/50 hover:bg-black/70"
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? "Unmute" : "Mute"}
      </motion.button>

      <motion.button
        onClick={handleLikeClick}
        className={`text-base px-4 py-2 rounded-md transition-colors duration-300 ${
          isLiked ? "bg-blue-500 text-white" : "bg-black/50 text-white hover:bg-black/70"
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <FaThumbsUp />
      </motion.button>

      <motion.button
        onClick={onShare}
        className="px-4 py-2 text-base text-white transition-colors duration-300 rounded-md bg-black/50 hover:bg-black/70"
        whileTap={{ scale: 0.95 }}
      >
        <FaShareAlt />
      </motion.button>
    </div>
  ), [isMuted, isLiked, handleLikeClick, handleMuteClick, onShare])

  return (
    <div className="box-border relative flex items-center justify-center w-full h-screen p-4 bg-black border-4 border-white shadow-lg">
      <video
        ref={videoRef}
        src={short.src}
        className="object-contain w-full h-full transition-opacity duration-300 ease-in-out rounded-lg cursor-pointer"
        loop
        muted={isMuted}
        playsInline
        onClick={handleMuteClick}
      />

      {/* Animation overlays */}
      {animateThumb && (
        <motion.div
          className="absolute z-20"
          animate={{ scale: [1, 1.5, 2], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5 }}
        >
          <FaThumbsUp className="text-6xl text-sky-500" />
        </motion.div>
      )}

      {animateSpeaker && (
        <motion.div
          className="absolute z-20"
          animate={{ scale: [1, 1.5, 2], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5 }}
        >
          {isMuted ? (
            <FaVolumeMute className="text-6xl text-sky-500" />
          ) : (
            <FaVolumeUp className="text-6xl text-sky-500" />
          )}
        </motion.div>
      )}

      {ControlButtons}

      {/* Video info */}
      <motion.div
        className="absolute px-4 py-2 text-base text-white rounded-md top-10 left-5 bg-black/70"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🤳 FilStream id: {short.id}
      </motion.div>

      {/* Tags */}
      <div className="absolute left-0 flex flex-wrap justify-center w-full gap-2 px-4 py-2 text-sm text-white rounded-md bottom-20 bg-black/70">
        {short.tags.map((tag: string, index: number) => (
          <span
            key={`${tag}-${index}`}
            className="text-blue-400 transition duration-200 cursor-pointer hover:text-blue-500 hover:underline"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
})

Short.displayName = 'Short'

const ShortsPage = () => {
  const [shortsData] = useState(videolinks)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentShortIndex, setCurrentShortIndex] = useState(0)
  const [loadedShorts, setLoadedShorts] = useState(3)
  const [isMuted, setIsMuted] = useState(true)
  const [likedShorts, setLikedShorts] = useState<{[key: number]: boolean}>({})
  const loadingRef = useRef(false)

  // Categories matching the upload page
  const categories = ['All', 'Entertainment', 'Education', 'Gaming', 'Music', 'Sports', 'Technology', 'Lifestyle']

  // Filter shorts based on selected category
  const filteredShorts = useMemo(() => {
    if (selectedCategory === 'All') {
      return shortsData
    }
    
    return shortsData.filter(short => {
      const tagString = short.tags.join(' ').toLowerCase()
      
      // Special handling for different categories based on current video tags
      switch (selectedCategory) {
        case 'Entertainment':
          return tagString.includes('zale') || tagString.includes('funny') || tagString.includes('meme')
        case 'Education':
          return tagString.includes('education') || tagString.includes('learn')
        case 'Gaming':
          return tagString.includes('dice') || tagString.includes('game') || tagString.includes('gaming')
        case 'Music':
          return tagString.includes('music') || tagString.includes('song') || tagString.includes('audio')
        case 'Sports':
          return tagString.includes('sport') || tagString.includes('fitness') || tagString.includes('workout')
        case 'Technology':
          return tagString.includes('tech') || tagString.includes('technology') || tagString.includes('gadget')
        case 'Lifestyle':
          return tagString.includes('lifestyle') || tagString.includes('life') || tagString.includes('daily')
        default:
          return tagString.includes(selectedCategory.toLowerCase())
      }
    })
  }, [selectedCategory, shortsData])

  // Throttled scroll handler
  const handleScroll = useMemo(() => throttle(() => {
    const { scrollTop, scrollHeight } = document.documentElement
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

  const toggleMute = useCallback(() => setIsMuted(prev => !prev), [])

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

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-md mx-auto">
        {/* Category Filter */}
        <div className="bg-black border-b border-gray-800 p-4 sticky top-0 z-20">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="h-5 w-5 text-gray-300" />
            <h2 className="text-lg font-semibold text-white">Categories</h2>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Video Container */}
        <div className="relative w-full min-h-screen p-0 m-0 overflow-y-auto">
          {filteredShorts.length === 0 ? (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center text-white">
                <div className="text-2xl mb-2">No videos found</div>
                <div className="text-gray-400">Try selecting a different category</div>
              </div>
            </div>
          ) : (
            filteredShorts.slice(0, loadedShorts).map((short, index) => (
              <div key={short.id} className="relative">
                <Short
                  short={short}
                  isPlaying={currentShortIndex === index}
                  isLiked={!!likedShorts[short.id]}
                  isMuted={isMuted}
                  onLike={() => handleLike(short.id)}
                  onShare={() => handleShare(short.id)}
                  toggleMute={toggleMute}
                />
              </div>
            ))
          )}

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