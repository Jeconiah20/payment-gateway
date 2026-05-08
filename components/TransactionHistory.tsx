'use client';

import { Transaction } from '@/types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
}

export default function TransactionHistory({
  transactions,
  onSelectTransaction,
}: TransactionHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'timeout':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50';
      case 'failed':
        return 'bg-red-50';
      case 'timeout':
        return 'bg-orange-50';
      default:
        return 'bg-gray-50';
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {[...transactions].reverse().map((transaction) => (
        <button
          key={transaction.id}
          onClick={() => onSelectTransaction(transaction)}
          className={`w-full rounded-lg border border-gray-200 p-4 text-left transition hover:shadow-md ${getStatusBg(
            transaction.status
          )}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold">
                {transaction.id.substring(0, 8)}...
              </p>
              <p className="text-sm text-gray-600">
                {transaction.currency} {transaction.amount.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(transaction.timestamp).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`font-bold uppercase ${getStatusColor(
                transaction.status
              )}`}
            >
              {transaction.status}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}