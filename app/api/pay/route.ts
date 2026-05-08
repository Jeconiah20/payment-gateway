import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const random = Math.random();

    // 60% Success
    if (random < 0.6) {
      return NextResponse.json({
        success: true,
        transactionId: body.transactionId,
        message: 'Payment successful',
      });
    }

    // 25% Failed with reason
    if (random < 0.85) {
      const reasons = [
        'Insufficient funds',
        'Card declined',
        'Invalid CVV',
        'Transaction not allowed',
      ];
      return NextResponse.json(
        {
          success: false,
          transactionId: body.transactionId,
          reason: reasons[Math.floor(Math.random() * reasons.length)],
        },
        { status: 400 }
      );
    }

    // 15% Timeout (respond after 8 seconds)
    await new Promise((resolve) => setTimeout(resolve, 7000));
    return NextResponse.json(
      {
        success: false,
        transactionId: body.transactionId,
        reason: 'Request timeout',
      },
      { status: 408 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, reason: 'Server error' },
      { status: 500 }
    );
  }
}