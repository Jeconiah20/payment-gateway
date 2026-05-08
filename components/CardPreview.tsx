'use client';

import { CardDetails } from '@/types';

interface CardPreviewProps {
  cardDetails: CardDetails;
}

export default function CardPreview({ cardDetails }: CardPreviewProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-blue-700 to-slate-900 p-6 text-white shadow-xl">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm font-semibold tracking-wide">Payment Card</p>
        <div className="h-8 w-10 rounded bg-yellow-300 opacity-90" />
      </div>

      <div className="mb-8">
        <p className="mb-2 text-xs uppercase text-white/70">Card Number</p>
        <p className="font-mono text-xl tracking-widest">
          {cardDetails.cardNumber || '•••• •••• •••• ••••'}
        </p>
      </div>

      <div className="flex justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-white/70">Cardholder</p>
          <p className="max-w-[190px] truncate text-sm font-semibold uppercase">
            {cardDetails.cardholderName || 'YOUR NAME'}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-white/70">Expires</p>
          <p className="text-sm font-semibold">
            {cardDetails.expiry || 'MM/YY'}
          </p>
        </div>
      </div>
    </div>
  );
}