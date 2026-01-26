# Credit Card Payment Setup Guide

## Overview
This implementation processes credit card payments through Stripe and provides instructions for transferring funds to your M-Pesa Paybill (254247, Account: 168665).

## Backend Setup

### 1. Install Required Dependencies
```bash
cd backend
npm install stripe
```

### 2. Get Stripe API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create an account or log in
3. Go to Developers > API Keys
4. Copy your:
   - **Secret Key** (starts with `sk_test_` for testing)
   - **Publishable Key** (starts with `pk_test_` for testing)

### 3. Update Environment Variables
Edit `backend/.env` and add your actual Stripe keys:
```env
# Replace with your actual Stripe keys
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
```

### 4. Start the Backend Server
```bash
cd backend
npm start
```

## How It Works

### Credit Card Payment Flow
1. **User fills card details** → Frontend validates information
2. **Payment processed** → Stripe charges the card in USD/EUR
3. **Funds received** → Money goes to your Stripe account
4. **Manual transfer** → You transfer equivalent KES to M-Pesa Paybill
5. **Confirmation sent** → User receives payment confirmation

### M-Pesa Payment Flow
1. **User gets instructions** → Manual Paybill steps displayed
2. **User pays directly** → Money goes straight to Paybill 254247, Account 168665
3. **No processing needed** → Direct payment to your account

## Important Notes

### Currency Conversion
- Credit cards are processed in USD (or EUR)
- You'll need to manually convert and transfer equivalent KES to M-Pesa
- Consider exchange rates and fees when setting donation amounts

### Automatic M-Pesa Transfer
To make this fully automatic, you would need:
1. **M-Pesa B2B API** access from Safaricom (requires business approval)
2. **Currency exchange service** to convert USD/EUR to KES
3. **Automated transfer system** to send funds to your Paybill

### Security & Compliance
- ✅ Stripe handles PCI compliance
- ✅ Card details are never stored on your server
- ✅ All transactions are encrypted
- ✅ Payment confirmations include reference IDs

## Testing

### Test Credit Cards (Stripe Test Mode)
```
Visa: 4242 4242 4242 4242
Mastercard: 5555 5555 5555 4444
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
```

### Test the Flow
1. Use test card numbers in your donation form
2. Check Stripe Dashboard for successful payments
3. Verify payment confirmations are sent to users

## Production Deployment

### 1. Switch to Live Keys
Replace test keys with live keys in `.env`:
```env
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
```

### 2. Set Up Webhooks (Optional)
For real-time payment notifications:
1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://yourdomain.com/payment/webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

## Manual Process for Fund Transfer

When a credit card payment succeeds:
1. **Check Stripe Dashboard** for new payments
2. **Calculate KES equivalent** (check current exchange rates)
3. **Transfer to M-Pesa** using Paybill 254247, Account 168665
4. **Keep records** of all transfers for accounting

## Support & Troubleshooting

### Common Issues
- **"Invalid API Key"** → Check your Stripe keys in `.env`
- **"Payment Failed"** → Usually invalid card details
- **"Network Error"** → Backend server not running

### Contact Information
For technical support with this implementation:
- Check Stripe documentation: https://stripe.com/docs
- Test with Stripe's test cards first
- Monitor Stripe Dashboard for payment details