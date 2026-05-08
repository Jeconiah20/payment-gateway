import { create } from 'zustand';
import { PaymentState, Transaction, PaymentStatus } from '@/types';
import { getTransactionsFromStorage, saveTransactionsToStorage } from '@/utils/storage';

interface PaymentStore extends PaymentState {
  setStatus: (status: PaymentStatus) => void;
  setCurrentTransaction: (id: string) => void;
  incrementAttempt: () => void;
  resetAttempt: () => void;
  setFailureReason: (reason: string | null) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  initializeTransactions: () => void;
  selectTransaction: (transaction: Transaction | null) => void;
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  status: 'idle',
  currentTransactionId: null,
  currentAttempt: 0,
  failureReason: null,
  transactions: [],
  selectedTransaction: null,

  setStatus: (status) => set({ status }),
  
  setCurrentTransaction: (id) => set({ currentTransactionId: id, currentAttempt: 1 }),
  
  incrementAttempt: () => set((state) => ({ currentAttempt: state.currentAttempt + 1 })),
  
  resetAttempt: () => set({ currentAttempt: 0 }),
  
  setFailureReason: (reason) => set({ failureReason: reason }),
  
  addTransaction: (transaction) => {
    const transactions = [...get().transactions, transaction];
    set({ transactions });
    saveTransactionsToStorage(transactions);
  },
  
  updateTransaction: (id, updates) => {
    const transactions = get().transactions.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    set({ transactions });
    saveTransactionsToStorage(transactions);
  },
  
  initializeTransactions: () => {
    const stored = getTransactionsFromStorage();
    set({ transactions: stored });
  },
  
  selectTransaction: (transaction) => set({ selectedTransaction: transaction }),
}));