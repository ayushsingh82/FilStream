'use client'
import React, { useState } from 'react'
import { Upload, FileVideo, DollarSign, CheckCircle } from 'lucide-react'

const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStep, setUploadStep] = useState(1)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStep(2)
      setIsUploading(false)
    }, 2000)
  }

  const handlePayment = async () => {
    setIsUploading(true)
    // Simulate payment process
    setTimeout(() => {
      setUploadStep(3)
      setIsUploading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Upload Your Content</h1>
            <p className="text-gray-300">Share your videos with the world on FilStream</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                uploadStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                <FileVideo className="h-5 w-5" />
              </div>
              <div className={`w-16 h-1 ${
                uploadStep >= 2 ? 'bg-blue-600' : 'bg-gray-700'
              }`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                uploadStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                <DollarSign className="h-5 w-5" />
              </div>
              <div className={`w-16 h-1 ${
                uploadStep >= 3 ? 'bg-blue-600' : 'bg-gray-700'
              }`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                uploadStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Step 1: Upload Form */}
          {uploadStep === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-white">Upload your video</p>
                  <p className="text-gray-400">MP4, MOV, or AVI up to 500MB</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
                {selectedFile && (
                  <p className="mt-4 text-sm text-gray-300">
                    Selected: {selectedFile.name}
                  </p>
                )}
                <p className="mt-4 text-sm font-medium text-blue-400">$20 USDFC/week</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Enter your video title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Describe your video content"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="education">Education</option>
                    <option value="gaming">Gaming</option>
                    <option value="music">Music</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedFile || isUploading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Continue to Payment'}
              </button>
            </form>
          )}

          {/* Step 2: Payment */}
          {uploadStep === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-900 border border-blue-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Upload Summary</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="font-medium">Title:</span> {formData.title}</p>
                  <p><span className="font-medium">File:</span> {selectedFile?.name}</p>
                  <p><span className="font-medium">Category:</span> {formData.category}</p>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Storage & CDN</span>
                  <span className="font-medium text-white">$20.00 USDFC / week</span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold text-blue-400">
                  <span>Total</span>
                  <span>$20.00 USDFC</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isUploading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Processing Payment...' : 'Pay with USDFC'}
              </button>
            </div>
          )}

          {/* Step 3: Success */}
          {uploadStep === 3 && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Upload Successful!</h3>
                <p className="text-gray-300">Your video has been uploaded and is now being processed.</p>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  Your video will be available for streaming in a few minutes. 
                  You&apos;ll receive a notification once it&apos;s ready.
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/shorts'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
              >
                View Your Content
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadPage 