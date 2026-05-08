import { PaymentPayload } from '@/types';

export const submitPayment = async (
  payload: PaymentPayload,
  signal: AbortSignal
): Promise<any> => {
  const response = await fetch('/api/pay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    throw new Error('Network error');
  }

  return response.json();
};