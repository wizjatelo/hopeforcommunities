import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Heart, Users, GraduationCap, Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// M-Pesa Logo Component
const MpesaLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="40" rx="4" fill="#00A651"/>
    <text x="50" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">
      M-PESA
    </text>
  </svg>
);

// Credit Card Logo Component with multiple brands
const CreditCardLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="80" height="64" rx="8" fill="#6366F1"/>
    
    {/* Main Card */}
    <rect x="8" y="12" width="48" height="30" rx="4" fill="white"/>
    <rect x="8" y="18" width="48" height="6" fill="#374151"/>
    <rect x="12" y="28" width="16" height="3" rx="1" fill="#D1D5DB"/>
    <rect x="12" y="34" width="12" height="2" rx="1" fill="#D1D5DB"/>
    
    {/* Visa Logo Area */}
    <rect x="40" y="28" width="12" height="8" rx="2" fill="#F3F4F6"/>
    <text x="46" y="34" textAnchor="middle" fill="#1E40AF" fontSize="5" fontFamily="Arial, sans-serif" fontWeight="bold">VISA</text>
    
    {/* Second Card (Mastercard) */}
    <rect x="20" y="20" width="48" height="30" rx="4" fill="white" opacity="0.9"/>
    <rect x="20" y="26" width="48" height="6" fill="#374151"/>
    
    {/* Mastercard Circles */}
    <circle cx="56" cy="38" r="4" fill="#FF5F00"/>
    <circle cx="60" cy="38" r="4" fill="#EB001B"/>
    <circle cx="58" cy="38" r="4" fill="#F79E1B"/>
  </svg>
);

const Donate = () => {
  // --- STATE VARIABLES (Consolidated from both blocks) ---
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [donorInfo, setDonorInfo] = useState({ name: '', email: '', phone: '', anonymous: false });
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaMessage, setMpesaMessage] = useState('');
  const [selectedCause, setSelectedCause] = useState('general'); // Added to fix missing state for cause selection

  // Credit Card Information
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  // --- CONSTANTS (Consolidated from the second block) ---
  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000];
  
  const causes = [
    { id: 'general', name: 'Where Most Needed', description: 'Support our most urgent needs', icon: <Heart className="w-6 h-6" /> },
    { id: 'education', name: 'School Fees Support', description: 'Help children access quality education', icon: <GraduationCap className="w-6 h-6" /> },
    { id: 'mentorship', name: 'Mentorship Programs', description: 'Support guidance and life skills training', icon: <Users className="w-6 h-6" /> },
    { id: 'center', name: 'Educational Center Project', description: 'Help build our learning facility', icon: <Home className="w-6 h-6" /> }
  ];

  const paymentMethods = [
    { id: 'mpesa', name: 'M-Pesa Paybill', description: 'Pay via M-Pesa Paybill', icon: <MpesaLogo className="w-8 h-6" />, details: 'Paybill: 254247, Account: 168665' },
    { id: 'card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, American Express', icon: <CreditCardLogo className="w-6 h-6" />, details: 'Secure online payment processing' }
  ];

  // --- HANDLERS ---

  const getFinalAmount = () => customAmount || selectedAmount;

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardInfo(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else if (name === 'cvv') {
      // Only allow numbers for CVV
      const numericValue = value.replace(/\D/g, '');
      setCardInfo(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else if (name.startsWith('billing.')) {
      const field = name.split('.')[1];
      setCardInfo(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    } else {
      setCardInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Using manual Paybill instructions for M-Pesa and API for credit cards
  const handleDonate = async (e) => {
    e.preventDefault();
    const amount = getFinalAmount();

    if (!amount || amount <= 0) {
      alert('Please select or enter a valid donation amount');
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      alert('Please fill in your name and email address.');
      return;
    }

    setIsProcessing(true);
    setMpesaMessage('');

    if (paymentMethod === 'mpesa') {
      // M-Pesa Paybill instructions (no API call)
      setTimeout(() => {
        setMpesaMessage(`✅ Thank you ${donorInfo.name}! To complete your donation of KES ${parseInt(amount).toLocaleString()}, please follow these steps:

📱 M-Pesa Paybill Instructions:
1. Go to M-Pesa on your phone
2. Select "Lipa na M-Pesa"
3. Select "Pay Bill"
4. Enter Business Number: 254247
5. Enter Account Number: 168665
6. Enter Amount: ${amount}
7. Enter your M-Pesa PIN
8. Confirm the transaction

💡 Important: Please keep your M-Pesa confirmation message as proof of payment. You can send it to us via WhatsApp or email for record keeping.`);
        setIsProcessing(false);
      }, 1500);
      
    } else if (paymentMethod === 'card') {
      // Credit card processing via API
      try {
        // Validate card information
        if (!cardInfo.cardNumber || !cardInfo.cardholderName || !cardInfo.expiryMonth || 
            !cardInfo.expiryYear || !cardInfo.cvv || !cardInfo.billingAddress.street ||
            !cardInfo.billingAddress.city || !cardInfo.billingAddress.zipCode || 
            !cardInfo.billingAddress.country) {
          alert('Please fill in all required card and billing information.');
          setIsProcessing(false);
          return;
        }

        const response = await fetch('http://localhost:5000/payment/card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(amount),
            cardInfo: cardInfo,
            donorInfo: donorInfo,
            cause: causes.find(c => c.id === selectedCause)?.name || 'General Donation'
          })
        });

        const data = await response.json();

        if (data.success) {
          setMpesaMessage(`✅ Thank you ${donorInfo.name}! Your credit card payment has been processed successfully.

💳 Payment Confirmation:
- Amount: KES ${parseInt(amount).toLocaleString()}
- Payment ID: ${data.paymentId}
- Status: ${data.instructions.status}

📋 Next Steps:
${data.instructions.next_steps}

🎯 Destination Details:
- Paybill: ${data.instructions.paybill_destination}
- Account: ${data.instructions.account_destination}
- Reference: ${data.instructions.reference}

📧 You will receive an email confirmation shortly. Thank you for your generous donation!`);
        } else {
          setMpesaMessage(`❌ Payment Failed: ${data.message}

Please check your card details and try again, or contact us for assistance:
- Email: info@hopesforcommunitieskenya.org
- Phone: +254 700 000 000`);
        }
      } catch (error) {
        console.error('Payment Error:', error);
        setMpesaMessage(`❌ Payment Error: Unable to process your card payment.

This could be due to:
- Network connectivity issues
- Invalid card information
- Server temporarily unavailable

Please try again or contact us for assistance:
- Email: info@hopesforcommunitieskenya.org
- Phone: +254 700 000 000`);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // --- JSX RETURN (Used the more complete structure from the second block) ---
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Make a Donation
            </h1>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Your generosity transforms lives. Every donation helps us provide education, mentorship, and hope to vulnerable children.
            </p>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Quick Payment Info */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-cyan-800 mb-4 flex items-center">
                <MpesaLogo className="w-12 h-5 mr-3" />
                Quick M-Pesa Payment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-700">Paybill Number</p>
                  <p className="text-2xl font-bold text-cyan-600">254247</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-700">Account Number</p>
                  <p className="text-2xl font-bold text-cyan-600">168665</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                💡 You can pay directly using these details, or fill out the form below for detailed instructions.
              </p>
            </div>

            <form onSubmit={handleDonate} className="bg-white rounded-lg shadow-md overflow-hidden">
              
              {/* Display Payment Instructions */}
              {mpesaMessage && (
                <div className={`p-6 ${mpesaMessage.startsWith('✅') ? 'bg-green-50 border-l-4 border-green-400' : 'bg-red-50 border-l-4 border-red-400'}`}>
                  <div className={`${mpesaMessage.startsWith('✅') ? 'text-green-800' : 'text-red-800'}`}>
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{mpesaMessage}</pre>
                  </div>
                </div>
              )}

              {/* Select Cause */}
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Cause</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {causes.map((cause) => (
                    <label
                      key={cause.id}
                      className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                        selectedCause === cause.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="cause"
                        value={cause.id}
                        checked={selectedCause === cause.id}
                        onChange={(e) => setSelectedCause(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start">
                        <div className={`${selectedCause === cause.id ? 'text-cyan-600' : 'text-gray-400'} mr-3 mt-1`}>
                          {cause.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{cause.name}</h3>
                          <p className="text-sm text-gray-600">{cause.description}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Select Amount */}
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Donation Amount (KES)</h2>
                
                {/* Predefined Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 border-2 rounded-lg font-semibold transition-all ${
                        selectedAmount === amount.toString()
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      KES {amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter custom amount
                  </label>
                  <input
                    type="number"
                    id="customAmount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount in KES"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`cursor-pointer p-4 border-2 rounded-lg transition-all block ${
                        paymentMethod === method.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`${paymentMethod === method.id ? 'text-cyan-600' : 'text-gray-400'} mr-3`}>
                            {method.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {method.details}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method Specific Fields */}
              {paymentMethod === 'card' && (
                <div className="p-8 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <CreditCardLogo className="w-8 h-8 mr-3" />
                    Credit/Debit Card Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardInfoChange}
                        required
                        maxLength="19"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        value={cardInfo.cardholderName}
                        onChange={handleCardInfoChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="Name as on card"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700 mb-2">
                          Month *
                        </label>
                        <select
                          id="expiryMonth"
                          name="expiryMonth"
                          value={cardInfo.expiryMonth}
                          onChange={handleCardInfoChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700 mb-2">
                          Year *
                        </label>
                        <select
                          id="expiryYear"
                          name="expiryYear"
                          value={cardInfo.expiryYear}
                          onChange={handleCardInfoChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="">YYYY</option>
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={2025 + i} value={2025 + i}>
                              {2025 + i}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardInfoChange}
                          required
                          maxLength="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Billing Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="billing.street" className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="billing.street"
                          name="billing.street"
                          value={cardInfo.billingAddress.street}
                          onChange={handleCardInfoChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div>
                        <label htmlFor="billing.city" className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="billing.city"
                          name="billing.city"
                          value={cardInfo.billingAddress.city}
                          onChange={handleCardInfoChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label htmlFor="billing.state" className="block text-sm font-medium text-gray-700 mb-2">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          id="billing.state"
                          name="billing.state"
                          value={cardInfo.billingAddress.state}
                          onChange={handleCardInfoChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="State/Province"
                        />
                      </div>
                      <div>
                        <label htmlFor="billing.zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP/Postal Code *
                        </label>
                        <input
                          type="text"
                          id="billing.zipCode"
                          name="billing.zipCode"
                          value={cardInfo.billingAddress.zipCode}
                          onChange={handleCardInfoChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="12345"
                        />
                      </div>
                      <div>
                        <label htmlFor="billing.country" className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <select
                          id="billing.country"
                          name="billing.country"
                          value={cardInfo.billingAddress.country}
                          onChange={handleCardInfoChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="">Select Country</option>
                          <option value="KE">Kenya</option>
                          <option value="US">United States</option>
                          <option value="GB">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="NL">Netherlands</option>
                          <option value="SE">Sweden</option>
                          <option value="NO">Norway</option>
                          <option value="DK">Denmark</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      🔒 <strong>Security:</strong> Your card information is encrypted and secure. We use industry-standard 
                      SSL encryption and never store your card details. All transactions are processed through 
                      PCI-compliant payment processors.
                    </p>
                  </div>
                </div>
              )}

              {/* Donor Information */}
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={donorInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={donorInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={donorInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="anonymous"
                        checked={donorInfo.anonymous}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Make this donation anonymous
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Summary and Submit */}
              <div className="p-8">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cause:</span>
                      <span className="font-medium">
                        {causes.find(c => c.id === selectedCause)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">
                        KES {getFinalAmount() ? parseInt(getFinalAmount()).toLocaleString() : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="font-medium">
                        {paymentMethods.find(p => p.id === paymentMethod)?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !getFinalAmount() || !donorInfo.name || !donorInfo.email}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Getting Payment Instructions...
                    </div>
                  ) : (
                    `Get Payment Instructions - KES ${getFinalAmount() ? parseInt(getFinalAmount()).toLocaleString() : '0'}`
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By donating, you agree to our Terms of Service and Privacy Policy. 
                  Your donation is secure and will be used for the selected cause.
                </p>

                {/* Contact Support */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Need Help with Payment?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    If you encounter any issues or need assistance with your donation, please contact us:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 text-sm">
                    <a href="mailto:info@hopesforcommunitieskenya.org" className="text-cyan-600 hover:text-cyan-700 font-medium">
                      📧 info@hopesforcommunitieskenya.org
                    </a>
                    <a href="tel:+254700000000" className="text-cyan-600 hover:text-cyan-700 font-medium">
                      📞 +254 700 000 000
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;