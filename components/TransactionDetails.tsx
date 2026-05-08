'use client';

import { Transaction } from '@/types';

interface TransactionDetailsProps {
  transaction: Transaction;
  onClose: () => void;
}

export default function TransactionDetails({
  transaction,
  onClose,
}: TransactionDetailsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">Transaction Details</h2>

        <div className="mb-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="break-all font-mono font-semibold">
              {transaction.id}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Amount</p>
            <p className="text-lg font-semibold">
              {transaction.currency} {transaction.amount.toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p
              className={`font-semibold capitalize ${
                transaction.status === 'success'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {transaction.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Date & Time</p>
            <p className="font-semibold">
              {new Date(transaction.timestamp).toLocaleString()}
            </p>
          </div>

          {transaction.reason && (
            <div>
              <p className="text-sm text-gray-600">Reason</p>
              <p className="font-semibold text-red-600">{transaction.reason}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-600">Attempts</p>
            <p className="font-semibold">{transaction.attempts}/3</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}