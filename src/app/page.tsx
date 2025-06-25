import Image from "next/image";
import { 
  DatabaseZap, 
  ShieldCheck, 
  CircleDollarSign, 
  Orbit, 
  Gauge, 
  FileText, 
  Store, 
  Lock, 
  BrainCircuit, 
  Puzzle 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 animate-gradient tech-grid"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            {/* Animated circles */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-4s' }}></div>

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6 animate-float">
                Welcome to the
                <span className="text-blue-600"> Future of APIs</span> 
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto animate-float" style={{ animationDelay: '-1s' }}>
                A Decentralized Pay-Per-Call API Protocol powered by Filecoin. Monetize your APIs. Pay only when you use them.
              </p>
              <div className="flex gap-4 justify-center animate-float" style={{ animationDelay: '-2s' }}>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-glow">
                  Get Started
                </button>
                <button className="border border-gray-300 text-blue-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-16">Why Build on Filecoin?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <DatabaseZap className="h-10 w-10 text-blue-600" />,
                title: "Decentralized Storage",
                description: "Leverage Filecoin's massive, decentralized storage network."
              },
              {
                icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
                title: "Verifiable Storage",
                description: "Cryptographic proofs ensure your data is stored correctly."
              },
              {
                icon: <CircleDollarSign className="h-10 w-10 text-blue-600" />,
                title: "Competitive Pricing",
                description: "Storage is priced via an open market of providers."
              },
              {
                icon: <Orbit className="h-10 w-10 text-blue-600" />,
                title: "Built for Web3",
                description: "The native storage layer for a decentralized internet."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-600">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Gauge className="h-8 w-8 text-blue-500" />,
                title: "Smart Metering",
                description: "Track every API request and charge automatically"
              },
              {
                icon: <FileText className="h-8 w-8 text-blue-500" />,
                title: "Immutable Billing",
                description: "Usage logs stored on-chain for transparency"
              },
              {
                icon: <Store className="h-8 w-8 text-blue-500" />,
                title: "API Marketplace",
                description: "Discover & integrate APIs instantly"
              },
              {
                icon: <Lock className="h-8 w-8 text-blue-500" />,
                title: "Token-Gated Access",
                description: "Restrict premium endpoints via NFTs or Tokens"
              },
              {
                icon: <BrainCircuit className="h-8 w-8 text-blue-500" />,
                title: "AI/ML Ready",
                description: "Deploy inference models & charge per inference"
              },
              {
                icon: <Puzzle className="h-8 w-8 text-blue-500" />,
                title: "Plug & Play SDK",
                description: "Easy to integrate into your frontend/backend"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-gray-50 p-6 rounded-xl hover:bg-blue-600 hover:text-black transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full transition-all duration-300 group-hover:bg-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-600 group-hover:text-blue-200 transition-colors duration-300 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto border border-gray-200">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
              Join our developer program for early access, grants, and custom integration support.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-medium">
              Join Developer Program
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}