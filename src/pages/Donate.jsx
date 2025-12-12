import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Heart, Users, GraduationCap, Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('general');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    anonymous: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000];
  
  const causes = [
    {
      id: 'general',
      name: 'Where Most Needed',
      description: 'Support our most urgent needs',
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 'education',
      name: 'School Fees Support',
      description: 'Help children access quality education',
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      id: 'mentorship',
      name: 'Mentorship Programs',
      description: 'Support guidance and life skills training',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 'center',
      name: 'Educational Center Project',
      description: 'Help build our learning facility',
      icon: <Home className="w-6 h-6" />
    }
  ];

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Pay via M-Pesa STK Push',
      icon: <Smartphone className="w-6 h-6" />,
      details: 'Paybill: 247247, Account: HOPE2024'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank to bank transfer',
      icon: <Building className="w-6 h-6" />,
      details: 'Account: 1234567890, Bank: KCB Bank'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'International payments accepted',
      icon: <CreditCard className="w-6 h-6" />,
      details: 'Secure payment via Stripe'
    }
  ];

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

  const getFinalAmount = () => {
    return customAmount || selectedAmount;
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    const amount = getFinalAmount();
    
    if (!amount || amount <= 0) {
      alert('Please select or enter a valid donation amount');
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      alert('Please fill in your name and email');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Thank you for your donation of KES ${amount}! You will receive a confirmation email shortly. Note: This is a demo - no actual payment was processed.`);
      
      // Reset form
      setSelectedAmount('');
      setCustomAmount('');
      setDonorInfo({ name: '', email: '', phone: '', anonymous: false });
    }, 2000);
  };

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
            <form onSubmit={handleDonate} className="bg-white rounded-lg shadow-md overflow-hidden">
              
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
                      placeholder="+254 700 000 000"
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
                      Processing Donation...
                    </div>
                  ) : (
                    `Donate KES ${getFinalAmount() ? parseInt(getFinalAmount()).toLocaleString() : '0'}`
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By donating, you agree to our Terms of Service and Privacy Policy. 
                  Your donation is secure and will be used for the selected cause.
                </p>
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