'use client';

import { useState } from 'react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors flex items-center gap-1"
      onClick={handleCopy}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our API Marketplace
          </h1>
          <p className="text-md text-gray-600 max-w-3xl mx-auto">
            Discover and integrate powerful APIs across various categories. Each API is verified, secure, and ready to enhance your applications.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            "All",
            "General",
            "Finance",
            "Automation",
            "Database",
            "Development",
            "Productivity",
            "Utilities",
            "Communication",
            "AI/ML"
          ].map((category) => (
            <button
              key={category}
              className="px-3 py-1.5 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* API Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Finance API Box */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Finance API Hub</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Verified</span>
            </div>
            <p className="text-gray-600 mb-4">
              A comprehensive API hub offering 13 powerful tools for financial analysis and research. Access vital information through tools like getCompanyFacts, getStockPrices, and getCompanyNews.
            </p>
            {/* API URL Box */}
            <div className="mb-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <code className="text-sm text-gray-600 block overflow-x-auto">
                  https://api.finance.iota/endpoint/781595ee-d7b7-46f6-acab-a3cb8f84d142
                </code>
              </div>
              <div className="mt-2">
                <CopyButton text="https://api.finance.iota/endpoint/781595ee-d7b7-46f6-acab-a3cb8f84d142" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="px-2 py-1 bg-gray-100 rounded">Finance</span>
              <span className="px-2 py-1 bg-gray-100 rounded">General</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500">13 Tools Available</span>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  View Tools
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  View Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* AI/ML API Box */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">AI/ML API Suite</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Verified</span>
            </div>
            <p className="text-gray-600 mb-4">
              Advanced AI and machine learning APIs for natural language processing, computer vision, and predictive analytics. Perfect for building intelligent applications.
            </p>
            {/* API URL Box */}
            <div className="mb-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <code className="text-sm text-gray-600 block overflow-x-auto">
                  https://api.aiml.iota/endpoint/9f8b7c6d-5e4f-3d2c-1b0a-9f8b7c6d5e4f
                </code>
              </div>
              <div className="mt-2">
                <CopyButton text="https://api.aiml.iota/endpoint/9f8b7c6d-5e4f-3d2c-1b0a-9f8b7c6d5e4f" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="px-2 py-1 bg-gray-100 rounded">AI/ML</span>
              <span className="px-2 py-1 bg-gray-100 rounded">Development</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500">8 Tools Available</span>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  View Tools
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  View Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Database API Box */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Database API Gateway</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Verified</span>
            </div>
            <p className="text-gray-600 mb-4">
              Secure and scalable database APIs for real-time data access, synchronization, and management. Supports multiple database types and advanced querying.
            </p>
            {/* API URL Box */}
            <div className="mb-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <code className="text-sm text-gray-600 block overflow-x-auto">
                  https://api.database.iota/endpoint/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p
                </code>
              </div>
              <div className="mt-2">
                <CopyButton text="https://api.database.iota/endpoint/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span className="px-2 py-1 bg-gray-100 rounded">Database</span>
              <span className="px-2 py-1 bg-gray-100 rounded">Development</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500">6 Tools Available</span>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  View Tools
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  View Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}