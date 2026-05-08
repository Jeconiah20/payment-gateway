export type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown';
export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed' | 'timeout';
export type Currency = 'INR' | 'USD';

export interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface PaymentPayload {
  transactionId: string;
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
  currency: Currency;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  timestamp: string;
  reason?: string;
  attempts: number;
}

export interface PaymentState {
  status: PaymentStatus;
  currentTransactionId: string | null;
  currentAttempt: number;
  failureReason: string | null;
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
}