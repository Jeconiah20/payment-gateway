# Payment Gateway

A production-ready payment gateway UI built with **Next.js 16+**, **TypeScript**, and **Tailwind CSS**. Features real-time form validation, card preview, payment lifecycle management, and transaction history with retry logic.

🚀  📁 **[GitHub Repo](https://github.com/Jeconiah20/payment-gateway)**

---

## ✨ Features

### Form & Validation
- ✅ **Real-time Field Validation** - Errors appear as you type, not on submit
- ✅ **Auto Card Formatting** - Spaces every 4 digits (4242 4242 4242 4242)
- ✅ **Card Type Detection** - Automatically detects Visa, Mastercard, Amex with badges
- ✅ **Smart CVV Validation** - 3 digits for Visa/MC, 4 for Amex
- ✅ **Expiry Validation** - Rejects past dates automatically
- ✅ **Submit Button State** - Disabled until form is fully valid

### Payment Flow
- ✅ **Full Lifecycle Management** - Idle → Processing → Success/Failed/Timeout
- ✅ **Live Card Preview** - Updates in real-time as you type
- ✅ **2-Second Processing State** - Shows loading spinner during payment
- ✅ **Distinct Result Screens** - Different UX for each outcome

### Reliability & Retry
- ✅ **Smart Retry Logic** - Max 3 attempts per transaction
- ✅ **Attempt Tracking** - Shows "Attempt 2 of 3" to user
- ✅ **Idempotent Requests** - Same transaction ID across retries
- ✅ **Timeout Handling** - 6-second AbortController for hung requests
- ✅ **Error Messages** - User-friendly reasons (not raw errors)

### Data Management
- ✅ **Transaction History** - Persists across page refreshes using localStorage
- ✅ **Transaction Details Modal** - Click any transaction to view full details
- ✅ **Status Tracking** - Shows Success/Failed/Timeout with timestamps
- ✅ **Multi-Currency** - Support for INR and USD

### UX & Accessibility
- ✅ **Responsive Design** - Mobile (375px) and desktop (1280px) optimized
- ✅ **ARIA Labels** - Proper aria-describedby for error messages
- ✅ **Focus Management** - Never loses place after state transitions
- ✅ **Prevent Double Submit** - Button disabled during processing
- ✅ **Dark Card Preview** - Professional credit card design

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16+** | React framework with App Router |
| **TypeScript** | Type-safe code, no `any` types |
| **Zustand** | Global state management |
| **Tailwind CSS** | Utility-first styling |
| **Fetch API** | HTTP requests with AbortController |

---

## 📂 Project Structure
```
payment-gateway/
├── app/
│ ├── api/
│ │ └── pay/route.ts 
│ ├── page.tsx 
│ ├── layout.tsx
│ └── globals.css 
├── components/ 
│ ├── CardInput.tsx 
│ ├── CardPreview.tsx 
│ ├── StatusScreen.tsx
│ ├── TransactionHistory.tsx 
│ └── TransactionDetails.tsx 
├── store/
│ └── paymentStore.ts 
├── types/
│ └── index.ts 
├── utils/ 
│ ├── cardValidation.ts 
│ ├── storage.ts 
│ └── api.ts 
├── hooks/ 
├── public/ 
├── tsconfig.json 
├── tailwind.config.ts 
├── next.config.ts 
├── package.json 
└── README.md 
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Jeconiah20/payment-gateway.git
cd payment-gateway

# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser.

### 📈 Performance Optimizations
✅ Component Code Splitting - Lazy load with dynamic imports
✅ Memoization - Prevent unnecessary re-renders
✅ Type Safety - Catch errors at compile time, not runtime
✅ CSS Optimization - Tailwind tree-shaking removes unused styles
✅ API Caching - No unnecessary API calls (6-second timeout)

### 🎯 What I Would Improve (Given More Time)
### Backend
  
 Real payment gateway integration (Stripe/Razorpay/PayPal)

 User authentication with JWT
 
 PostgreSQL database for transaction history
 
 Server-side validation and encryption
 
 Webhook handling for payment confirmation
 
### Frontend
  
 Unit tests with Jest

 E2E tests with Cypress/Playwright
 
 Storybook component documentation
 
 Advanced card validation (Luhn algorithm)
 
 3D Secure / OTP verification
 
 Apple Pay / Google Pay integration
 
 ### Dark mode support
 
 Internationalization (i18n)
 
 Error tracking (Sentry)
 
 Analytics integration
 
### DevOps

 GitHub Actions for CI/CD
 
 Automated testing on PR
 
 Pre-commit hooks (lint-staged)
 
 Docker containerization
 
 API rate limiting

