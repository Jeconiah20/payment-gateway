import { CardType } from '@/types';

export const detectCardType = (cardNumber: string): CardType => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  return 'unknown';
};

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, '');
  const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
  return formatted.slice(0, 19);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return cleaned.length >= 13 && cleaned.length <= 16;
};

export const validateExpiry = (expiry: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
  
  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expiryYear = parseInt(year);
  const expiryMonth = parseInt(month);
  
  if (expiryYear < currentYear) return false;
  if (expiryYear === currentYear && expiryMonth < currentMonth) return false;
  if (expiryMonth < 1 || expiryMonth > 12) return false;
  if (expiryYear > currentYear + 20) return false;
  
  return true;
};

export const validateCVV = (cvv: string, cardType: CardType): boolean => {
  if (cardType === 'amex') return /^\d{4}$/.test(cvv);
  return /^\d{3}$/.test(cvv);
};

export const validateCardholderName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

export const validateAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 999999;
};