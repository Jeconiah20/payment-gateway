'use client';

import { useState } from 'react';
import { CardDetails, CardType, Currency } from '@/types';
import {
  formatCardNumber,
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateCardholderName,
  validateAmount,
  detectCardType,
} from '@/utils/cardValidation';

interface CardInputProps {
  onSubmit: (details: CardDetails, amount: number, currency: Currency) => void;
  onChange?: (details: CardDetails) => void;
  isDisabled: boolean;
}

export default function CardInput({ onSubmit, onChange, isDisabled }: CardInputProps) {
  const [formData, setFormData] = useState<CardDetails>({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const cardType = detectCardType(formData.cardNumber);

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'cardholderName':
        if (!validateCardholderName(value)) error = 'Invalid cardholder name';
        break;
      case 'cardNumber':
        if (value && !validateCardNumber(value)) error = 'Invalid card number';
        break;
      case 'expiry':
        if (value && !validateExpiry(value)) error = 'Invalid or expired date';
        break;
      case 'cvv':
        if (value && !validateCVV(value, cardType)) {
          error = cardType === 'amex' ? 'CVV must be 4 digits' : 'CVV must be 3 digits';
        }
        break;
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'cardNumber') {
      finalValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      if (value.length === 2 && !value.includes('/')) {
        finalValue = value + '/';
      }
    }

        const newFormData = { ...formData, [name]: finalValue };
    setFormData(newFormData);
    onChange?.(newFormData);

    if (touched[name]) {
      const error = validateField(name, finalValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid =
    validateCardholderName(formData.cardholderName) &&
    validateCardNumber(formData.cardNumber) &&
    validateExpiry(formData.expiry) &&
    validateCVV(formData.cvv, cardType) &&
    validateAmount(parseFloat(amount) || 0) &&
    amount.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formData, parseFloat(amount), currency);
    }
  };

  const getCardTypeBadge = () => {
    const colors: Record<CardType, string> = {
      visa: 'bg-blue-500',
      mastercard: 'bg-red-500',
      amex: 'bg-green-500',
      unknown: 'bg-gray-500',
    };
    return cardType !== 'unknown' ? (
      <span className={`${colors[cardType]} text-white text-xs px-2 py-1 rounded`}>
        {cardType.toUpperCase()}
      </span>
    ) : null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Cardholder Name</label>
        <input
          type="text"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="John Doe"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isDisabled}
          aria-describedby={errors.cardholderName ? 'cardholderName-error' : undefined}
        />
        {errors.cardholderName && (
          <p id="cardholderName-error" className="text-red-500 text-sm mt-1">
            {errors.cardholderName}
          </p>
        )}
      </div>

      {/* Card Number */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium">Card Number</label>
          {getCardTypeBadge()}
        </div>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="4242 4242 4242 4242"
          maxLength="19"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isDisabled}
          aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
        />
        {errors.cardNumber && (
          <p id="cardNumber-error" className="text-red-500 text-sm mt-1">
            {errors.cardNumber}
          </p>
        )}
      </div>

      {/* Expiry & CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expiry (MM/YY)</label>
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="12/25"
            maxLength="5"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDisabled}
            aria-describedby={errors.expiry ? 'expiry-error' : undefined}
          />
          {errors.expiry && (
            <p id="expiry-error" className="text-red-500 text-sm mt-1">
              {errors.expiry}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="123"
            maxLength="4"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDisabled}
            aria-describedby={errors.cvv ? 'cvv-error' : undefined}
          />
          {errors.cvv && (
            <p id="cvv-error" className="text-red-500 text-sm mt-1">
              {errors.cvv}
            </p>
          )}
        </div>
      </div>

      {/* Amount & Currency */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
            placeholder="100"
            min="1"
            step="0.01"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDisabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDisabled}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || isDisabled}
        className="w-full bg-blue-600 text-white py-2 rounded font-medium disabled:bg-gray-400 cursor-pointer hover:bg-blue-700 transition"
      >
        Pay {currency} {amount || '0'}
      </button>
    </form>
  );
}