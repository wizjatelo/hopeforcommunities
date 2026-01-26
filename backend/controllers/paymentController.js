import Stripe from 'stripe';
import { sendToMpesa } from '../services/mpesaService.js';

// Initialize Stripe (you'll need to add STRIPE_SECRET_KEY to .env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processCardPayment = async (req, res) => {
  try {
    const { 
      amount, 
      cardInfo, 
      donorInfo,
      cause 
    } = req.body;

    // Validate required fields
    if (!amount || !cardInfo || !donorInfo) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required payment information" 
      });
    }

    // Convert amount to cents for Stripe (Stripe uses smallest currency unit)
    const amountInCents = Math.round(amount * 100);

    // Create payment method
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardInfo.cardNumber.replace(/\s/g, ''),
        exp_month: parseInt(cardInfo.expiryMonth),
        exp_year: parseInt(cardInfo.expiryYear),
        cvc: cardInfo.cvv,
      },
      billing_details: {
        name: cardInfo.cardholderName,
        email: donorInfo.email,
        address: {
          line1: cardInfo.billingAddress.street,
          city: cardInfo.billingAddress.city,
          state: cardInfo.billingAddress.state,
          postal_code: cardInfo.billingAddress.zipCode,
          country: cardInfo.billingAddress.country,
        },
      },
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd', // You might want to use 'kes' if Stripe supports it
      payment_method: paymentMethod.id,
      confirm: true,
      description: `Donation to Hopes for Communities - ${cause}`,
      metadata: {
        donor_name: donorInfo.name,
        donor_email: donorInfo.email,
        cause: cause,
        paybill_target: '254247',
        account_target: '168665'
      },
      return_url: 'https://your-website.com/donation-success',
    });

    if (paymentIntent.status === 'succeeded') {
      // Payment successful - now we need to handle the M-Pesa transfer
      // Since direct card-to-M-Pesa isn't possible, we'll log this for manual processing
      
      console.log('✅ Card Payment Successful:', {
        amount: amount,
        donor: donorInfo.name,
        email: donorInfo.email,
        stripe_payment_id: paymentIntent.id,
        target_paybill: '254247',
        target_account: '168665'
      });

      // Here you would typically:
      // 1. Store the payment record in your database
      // 2. Send confirmation email to donor
      // 3. Notify admin to manually transfer to M-Pesa
      // 4. Or integrate with a service that can convert USD/EUR to KES and send to M-Pesa

      res.json({
        success: true,
        message: 'Payment processed successfully',
        paymentId: paymentIntent.id,
        amount: amount,
        instructions: {
          status: 'Payment Received',
          next_steps: 'Your card payment has been processed. We will transfer the equivalent amount to our M-Pesa account within 24 hours.',
          paybill_destination: '254247',
          account_destination: '168665',
          reference: paymentIntent.id
        }
      });

    } else {
      res.status(400).json({
        success: false,
        message: 'Payment failed',
        error: paymentIntent.last_payment_error?.message || 'Unknown error'
      });
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment processing failed',
      error: error.message
    });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    
    res.json({
      success: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve payment status',
      error: error.message
    });
  }
};