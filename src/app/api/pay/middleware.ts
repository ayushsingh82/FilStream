import { paymentMiddleware, Network } from 'x402-next';

// Configure the payment middleware
export const middleware = paymentMiddleware(
  "0x62414d44AaE1aA532630eDa14Df7F449C475759C", // your receiving wallet address
  {
    '/api/pay': {
      price: '$0.01',
      network: "base-sepolia" as Network,
      config: {
        description: 'Access to pay-protected content'
      }
    },
  },
  {
    url: "https://x402.org/facilitator", // Facilitator URL for Base Sepolia testnet.
  }
);

export const config = {
  matcher: ['/api/pay/:path*'],
}; 