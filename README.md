This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Structure & Payment Middleware

This project includes a payment-protected API route using [x402-next](https://www.npmjs.com/package/x402-next):

- **Protected API Route:**
  - `GET /api/pay` — Returns a protected resource. Requires payment via the x402 protocol.

- **Payment Middleware:**
  - Implemented in `src/app/api/pay/middleware.ts` using `paymentMiddleware` from `x402-next`.
  - Checks for valid payment before allowing access to `/api/pay`.
  - If payment is missing or invalid, responds with HTTP 402 (Payment Required).

### Example Usage

To access the protected endpoint:

```bash
curl -H "x-payment: <your-payment-token>" http://localhost:3000/api/pay
```

If the `x-payment` header is missing or invalid, you will receive a 402 error.

### Customization
- Update the wallet address, price, and network in `middleware.ts` as needed for your use case.
- Add more protected routes by extending the middleware configuration.
