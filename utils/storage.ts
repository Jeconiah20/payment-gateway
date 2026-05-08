import { Transaction } from '@/types';

const STORAGE_KEY = 'payment_transactions';

export const getTransactionsFromStorage = (): Transaction[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTransactionsToStorage = (transactions: Transaction[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    console.error('Failed to save transactions');
  }
};