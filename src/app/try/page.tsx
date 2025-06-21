'use client'
import React, { useState } from 'react'

const TryPage = () => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold mb-12 text-blue-600 text-center">x402 Integration Guide</h1>
        
        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
              activeTab === 'buyer' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-blue-700 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab('buyer')}
          >
            Quickstart for Buyers
          </button>
          <button
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
              activeTab === 'seller' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-blue-700 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab('seller')}
          >
            Quickstart for Sellers
          </button>
        </div>

        {/* Buyer Section */}
        {activeTab === 'buyer' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-8">Quickstart for Buyers</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">Prerequisites</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>A crypto wallet with USDC (any EVM-compatible wallet)</li>
                <li>Node.js and npm installed</li>
                <li>A service that requires payment via x402</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">1. Install Dependencies</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm font-mono">
                {`npm install x402-axios
# or
npm install x402-fetch`}
              </pre>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">2. Create a Wallet Client</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm font-mono">
                {`import { CdpClient } from "@coinbase/cdp-sdk";
import { createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";

const cdp = new CdpClient();
const account = await cdp.evm.createAccount();`}
              </pre>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">3. Make Paid Requests</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm font-mono">
                {`import { wrapFetchWithPayment, decodeXPaymentResponse } from "x402-fetch";

const fetchWithPayment = wrapFetchWithPayment(fetch, account);

fetchWithPayment(url, {
  method: "GET",
})
  .then(async response => {
    const body = await response.json();
    console.log(body);
    const paymentResponse = decodeXPaymentResponse(response.headers.get("x-payment-response")!);
    console.log(paymentResponse);
  })
  .catch(error => {
    console.error(error.response?.data?.error);
  });`}
              </pre>
            </div>
          </div>
        )}

        {/* Seller Section */}
        {activeTab === 'seller' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-8">Quickstart for Sellers</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">Prerequisites</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>A crypto wallet to receive funds (any EVM-compatible wallet)</li>
                <li>A Coinbase Developer Platform (CDP) account and API Keys</li>
                <li>Node.js and npm installed</li>
                <li>An existing API or server</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">1. Install Dependencies</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm font-mono">
                {`npm install x402-next
npm install @coinbase/x402 // for the mainnet facilitator`}
              </pre>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">2. Add Payment Middleware</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm font-mono">
                {`import { paymentMiddleware, Network } from 'x402-next';

// Configure the payment middleware
export const middleware = paymentMiddleware(
  "0xYourAddress", // your receiving wallet address 
  {  // Route configurations for protected endpoints
    '/protected': {
      price: '$0.01',
      network: "base-sepolia",
      config: {
        description: 'Access to protected content'
      }
    },
  },
  {
    url: "https://x402.org/facilitator", // Facilitator URL for Base Sepolia testnet
  }
);

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/protected/:path*',
  ]
};`}
              </pre>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">3. Test Your Integration</h3>
              <p className="text-gray-700 text-lg mb-6">To verify your integration:</p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700 text-lg">
                <li>Make a request to your endpoint</li>
                <li>Server responds with 402 Payment Required</li>
                <li>Complete payment using a compatible client</li>
                <li>Retry request with X-PAYMENT header</li>
                <li>Server verifies payment and returns API response</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TryPage