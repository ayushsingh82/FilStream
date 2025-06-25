import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // The payment middleware will have already checked for payment
  return NextResponse.json({
    report: {
      message: "You have accessed a payment-protected resource!",
      value: 42,
    },
  });
} 