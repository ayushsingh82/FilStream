import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { paymentMiddleware, Network } from "x402-hono";

// Configuration from environment variables
const facilitatorUrl = process.env.FACILITATOR_URL as Resource || "https://x402.org/facilitator";
const payTo = process.env.ADDRESS as `0x${string}`;
const network = (process.env.NETWORK as Network) || "base-sepolia";
const port = parseInt(process.env.PORT || "3001");

if (!payTo) {
  console.error("❌ Please set your wallet ADDRESS in the .env file");
  process.exit(1);
}

const app = new Hono();

app.use(
    paymentMiddleware(
      payTo,
      {
        // 24-hour session access
        "/api/pay/session": {
          price: "$1.00",
          network,
        },
        // One-time access/payment
        "/api/pay/onetime": {
          price: "$0.10",
          network,
        },
      },
      {
        url: facilitatorUrl,
      },
    ),
  );
  