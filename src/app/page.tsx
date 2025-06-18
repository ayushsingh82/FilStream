import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 animate-gradient tech-grid"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            {/* Animated circles */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-4s' }}></div>

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-float">
                Welcome to the Future of APIs
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-float" style={{ animationDelay: '-1s' }}>
                A Decentralized Pay-Per-Call API Protocol powered by IOTA. Monetize your APIs. Pay only when you use them.
              </p>
              <div className="flex gap-4 justify-center animate-float" style={{ animationDelay: '-2s' }}>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-glow">
                  Get Started
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Build on IOTA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Zero Fees",
                description: "Enable microtransactions per API call with no gas cost"
              },
              {
                title: "High Scalability",
                description: "Perfect for high-frequency ML models and edge devices"
              },
              {
                title: "Feeless Micropayments",
                description: "Real-time billing per API usage, no subscriptions"
              },
              {
                title: "GDPR-Compliant",
                description: "Respect user privacy with full data ownership"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Metering",
                description: "Track every API request and charge automatically"
              },
              {
                title: "Immutable Billing",
                description: "Usage logs stored on-chain for transparency"
              },
              {
                title: "API Marketplace",
                description: "Discover & integrate APIs instantly"
              },
              {
                title: "Token-Gated Access",
                description: "Restrict premium endpoints via NFTs or IOTA tokens"
              },
              {
                title: "AI/ML Ready",
                description: "Deploy inference models & charge per inference"
              },
              {
                title: "Plug & Play SDK",
                description: "Easy to integrate into your frontend/backend"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Join our developer program for early access, grants, and custom integration support.
            </p>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-medium">
              Join Developer Program
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}