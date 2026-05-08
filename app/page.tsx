'use client';

import { useEffect, useState } from 'react';
import { CardDetails, PaymentPayload, Currency } from '@/types';
import { usePaymentStore } from '@/store/paymentStore';
import CardInput from '@/components/CardInput';
import CardPreview from '@/components/CardPreview';
import StatusScreen from '@/components/StatusScreen';
import TransactionHistory from '@/components/TransactionHistory';
import TransactionDetails from '@/components/TransactionDetails';
import { submitPayment } from '@/utils/api';

export default function Home() {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    currency: 'INR' as Currency,
  });

  const store = usePaymentStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    store.initializeTransactions();
  }, []);

  const handleSubmit = async (
    details: CardDetails,
    amount: number,
    currency: Currency
  ) => {
    setCardDetails(details);
    setPaymentDetails({ amount, currency });

    const transactionId = crypto.randomUUID();
    store.setCurrentTransaction(transactionId);
    store.setStatus('processing');

    await processPayment(details, amount, currency, transactionId);
  };

  const processPayment = async (
    details: CardDetails,
    amount: number,
    currency: Currency,
    transactionId: string
  ) => {
    const payload: PaymentPayload = {
      transactionId,
      cardholderName: details.cardholderName,
      cardNumber: details.cardNumber,
      expiry: details.expiry,
      cvv: details.cvv,
      amount,
      currency,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      // Simulate 2 seconds processing time before showing result
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await submitPayment(payload, controller.signal);
      clearTimeout(timeoutId);

      if (response.success) {
        store.setStatus('success');
        store.addTransaction({
          id: transactionId,
          amount,
          currency,
          status: 'success',
          timestamp: new Date().toISOString(),
          attempts: store.currentAttempt,
        });
      } else {
        store.setStatus('failed');
        store.setFailureReason(response.reason);
        store.addTransaction({
          id: transactionId,
          amount,
          currency,
          status: 'failed',
          timestamp: new Date().toISOString(),
          reason: response.reason,
          attempts: store.currentAttempt,
        });
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        store.setStatus('timeout');
        store.setFailureReason('Request timeout - please try again');
        store.addTransaction({
          id: transactionId,
          amount,
          currency,
          status: 'timeout',
          timestamp: new Date().toISOString(),
          reason: 'Request timeout',
          attempts: store.currentAttempt,
        });
      } else {
        store.setStatus('failed');
        store.setFailureReason('Network error - please try again');
        store.addTransaction({
          id: transactionId,
          amount,
          currency,
          status: 'failed',
          timestamp: new Date().toISOString(),
          reason: 'Network error',
          attempts: store.currentAttempt,
        });
      }
    }
  };

  const handleRetry = async () => {
    if (store.currentAttempt >= 3) return;

    store.incrementAttempt();
    store.setStatus('processing');
    store.setFailureReason(null);

    const currentTxn = store.transactions.find(
      (t) => t.id === store.currentTransactionId
    );

    if (currentTxn) {
      await processPayment(
        cardDetails,
        paymentDetails.amount,
        paymentDetails.currency,
        store.currentTransactionId!
      );
    }
  };

  const handleNewPayment = () => {
    store.setStatus('idle');
    store.resetAttempt();
    store.setFailureReason(null);
    store.selectTransaction(null);
    setCardDetails({
      cardholderName: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    });
    setPaymentDetails({ amount: 0, currency: 'INR' });
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-900">
          Payment Gateway
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Secure payment processing
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Form */}
          <div className="rounded-xl bg-white p-6 shadow-lg lg:col-span-1">
            {store.status === 'idle' ? (
              <>
                <h2 className="mb-6 text-2xl font-bold">Payment Details</h2>
                                <CardInput
                  onSubmit={handleSubmit}
                  onChange={setCardDetails}
                  isDisabled={store.status === 'processing'}
                />
              </>
            ) : (
              <StatusScreen
                status={store.status}
                reason={store.failureReason}
                amount={paymentDetails.amount}
                currency={paymentDetails.currency}
                currentAttempt={store.currentAttempt}
                onRetry={handleRetry}
                onNewPayment={handleNewPayment}
              />
            )}
          </div>

          {/* Middle: Card Preview */}
          <div className="flex items-center justify-center rounded-xl bg-white p-6 shadow-lg lg:col-span-1">
            <CardPreview cardDetails={cardDetails} />
          </div>

          {/* Right: Transaction History */}
          <div className="rounded-xl bg-white p-6 shadow-lg lg:col-span-1">
            <h2 className="mb-4 text-2xl font-bold">Transaction History</h2>
            <TransactionHistory
              transactions={store.transactions}
              onSelectTransaction={store.selectTransaction}
            />
          </div>
        </div>
      </div>

      {store.selectedTransaction && (
        <TransactionDetails
          transaction={store.selectedTransaction}
          onClose={() => store.selectTransaction(null)}
        />
      )}
    </main>
  );
}