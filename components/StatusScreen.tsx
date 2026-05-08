'use client';

import { PaymentStatus } from '@/types';

interface StatusScreenProps {
  status: PaymentStatus;
  reason?: string | null;
  amount: number;
  currency: string;
  currentAttempt: number;
  onRetry: () => void;
  onNewPayment: () => void;
}

export default function StatusScreen({
  status,
  reason,
  amount,
  currency,
  currentAttempt,
  onRetry,
  onNewPayment,
}: StatusScreenProps) {
  const maxAttempts = 3;
  const canRetry =
    currentAttempt < maxAttempts && (status === 'failed' || status === 'timeout');

  if (status === 'processing') {
    return (
      <section className="rounded-lg bg-white p-6 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <h2 className="text-xl font-bold">Processing Payment...</h2>
        <p className="mt-2 text-sm text-gray-600">
          Please do not refresh or close this page.
        </p>
      </section>
    );
  }

  if (status === 'success') {
    return (
      <section className="rounded-lg bg-white p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-4xl text-green-700">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-green-700">Payment Successful</h2>
        <p className="mt-2 text-gray-600">
          {currency} {amount.toFixed(2)} was paid successfully.
        </p>

        <button
          type="button"
          onClick={onNewPayment}
          className="mt-6 rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Make New Payment
        </button>
      </section>
    );
  }

  if (status === 'failed') {
    return (
      <section className="rounded-lg bg-white p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-4xl text-red-700">
          ×
        </div>
        <h2 className="text-2xl font-bold text-red-700">Payment Failed</h2>
        <p className="mt-2 text-gray-600">
          {reason || 'We could not complete your payment.'}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Attempt {currentAttempt} of {maxAttempts}
        </p>

        <div className="mt-6 flex justify-center gap-3">
          {canRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              Retry
            </button>
          )}

          <button
            type="button"
            onClick={onNewPayment}
            className="rounded border border-gray-300 px-5 py-2 font-medium hover:bg-gray-100"
          >
            New Payment
          </button>
        </div>

        {!canRetry && (
          <p className="mt-4 text-sm font-medium text-red-600">
            Maximum retry attempts reached.
          </p>
        )}
      </section>
    );
  }

  if (status === 'timeout') {
    return (
      <section className="rounded-lg bg-white p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-4xl text-orange-700">
          !
        </div>
        <h2 className="text-2xl font-bold text-orange-700">Payment Timed Out</h2>
        <p className="mt-2 text-gray-600">
          The gateway took too long to respond. Please try again.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Attempt {currentAttempt} of {maxAttempts}
        </p>

        <div className="mt-6 flex justify-center gap-3">
          {canRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              Retry
            </button>
          )}

          <button
            type="button"
            onClick={onNewPayment}
            className="rounded border border-gray-300 px-5 py-2 font-medium hover:bg-gray-100"
          >
            New Payment
          </button>
        </div>
      </section>
    );
  }

  return null;
}