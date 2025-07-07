import Image from "next/image";
import { 
  Play, 
  Shield, 
  Globe, 
  Zap, 
  Users, 
  FileVideo, 
  Cloud, 
  Lock, 
  BrainCircuit, 
  Puzzle 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 animate-gradient tech-grid"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            {/* Animated circles */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '-4s' }}></div>

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-float">
                Welcome to FilStream
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-float" style={{ animationDelay: '-1s' }}>
                The future of decentralized video streaming. Powered by Filecoin's distributed storage network, 
                FilStream delivers high-quality video content with unmatched reliability and censorship resistance.
              </p>
              <div className="flex gap-4 justify-center animate-float" style={{ animationDelay: '-2s' }}>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-glow">
                  Start Streaming
                </button>
                <button className="border border-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-16">Why Choose FilStream?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Play className="h-10 w-10 text-blue-400" />,
                title: "Decentralized Streaming",
                description: "Stream content from Filecoin's distributed network, ensuring 24/7 availability."
              },
              {
                icon: <Shield className="h-10 w-10 text-blue-400" />,
                title: "Censorship Resistant",
                description: "Your content stays accessible, protected by decentralized storage."
              },
              {
                icon: <Zap className="h-10 w-10 text-blue-400" />,
                title: "Lightning Fast",
                description: "Optimized CDN delivery ensures smooth streaming experience."
              },
              {
                icon: <Globe className="h-10 w-10 text-blue-400" />,
                title: "Global Access",
                description: "Access content from anywhere in the world without restrictions."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-600">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-16">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileVideo className="h-8 w-8 text-blue-400" />,
                title: "Video Upload",
                description: "Upload your videos securely to Filecoin's decentralized storage"
              },
              {
                icon: <Cloud className="h-8 w-8 text-blue-400" />,
                title: "Smart Storage",
                description: "Automatic replication and redundancy across the network"
              },
              {
                icon: <Users className="h-8 w-8 text-blue-400" />,
                title: "Creator Tools",
                description: "Monetize your content with built-in payment systems"
              },
              {
                icon: <Lock className="h-8 w-8 text-blue-400" />,
                title: "Content Protection",
                description: "Advanced DRM and access control for your content"
              },
              {
                icon: <BrainCircuit className="h-8 w-8 text-blue-400" />,
                title: "AI Recommendations",
                description: "Smart content discovery powered by decentralized AI"
              },
              {
                icon: <Puzzle className="h-8 w-8 text-blue-400" />,
                title: "Easy Integration",
                description: "Simple APIs and SDKs for developers"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-gray-900 p-6 rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 p-3 rounded-full transition-all duration-300 group-hover:bg-blue-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-300 group-hover:text-blue-200 transition-colors duration-300 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-16">How FilStream Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Content",
                description: "Upload your video content to our platform. We'll automatically store it on Filecoin's decentralized network using PDP (Provider Data Protocol)."
              },
              {
                step: "02",
                title: "Distributed Storage",
                description: "Your content gets replicated across multiple Filecoin storage providers, ensuring maximum availability and redundancy."
              },
              {
                step: "03",
                title: "Global Streaming",
                description: "Viewers can stream your content instantly from anywhere in the world via our optimized CDN network."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900 rounded-2xl shadow-xl p-12 max-w-4xl mx-auto border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Streaming?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of creators and viewers on the decentralized streaming platform of the future.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-medium">
                Start Streaming
              </button>
              <button className="border border-blue-600 text-blue-400 px-8 py-4 rounded-xl hover:bg-blue-900 transition-all duration-300 text-lg font-medium">
                Upload Content
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}