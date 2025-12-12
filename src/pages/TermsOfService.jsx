import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Please read these terms carefully before using our website and services.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  <strong>Last updated:</strong> December 10, 2025
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-6">
                  By accessing and using the Hopes for Communities website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 mb-6">
                  Hopes for Communities provides information about our nonprofit programs, facilitates donations and sponsorships, and enables volunteer registration. Our services are designed to support vulnerable children through education and community development programs.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                <p className="text-gray-600 mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Provide accurate and truthful information</li>
                  <li>Use the website for lawful purposes only</li>
                  <li>Respect the privacy and rights of others</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not transmit harmful or malicious content</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Donations and Payments</h2>
                <p className="text-gray-600 mb-4">
                  Regarding donations and payments:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>All donations are voluntary and non-refundable unless required by law</li>
                  <li>We will use donations for the purposes described on our website</li>
                  <li>Payment processing is handled by secure third-party providers</li>
                  <li>You are responsible for any transaction fees imposed by your payment method</li>
                  <li>We reserve the right to refuse or return donations at our discretion</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
                <p className="text-gray-600 mb-6">
                  The content, organization, graphics, design, and other matters related to this website are protected under applicable copyrights and other proprietary laws. Copying, redistribution, or publication of any such content is strictly prohibited without our express written permission.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
                <p className="text-gray-600 mb-6">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices regarding the collection and use of your personal information.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
                <p className="text-gray-600 mb-6">
                  This website and its content are provided "as is" without any representations or warranties, express or implied. We make no representations or warranties in relation to this website or the information and materials provided on this website.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600 mb-6">
                  Hopes for Communities will not be liable for any consequential, incidental, indirect, special, or punitive damages arising out of your use of the website or services, even if we have been advised of the possibility of such damages.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Volunteer Services</h2>
                <p className="text-gray-600 mb-4">
                  For volunteer services:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Volunteer positions are subject to application and approval</li>
                  <li>We reserve the right to terminate volunteer relationships at any time</li>
                  <li>Volunteers must comply with our policies and procedures</li>
                  <li>Background checks may be required for certain positions</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications to Terms</h2>
                <p className="text-gray-600 mb-6">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after changes are posted constitutes your acceptance of the modified terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
                <p className="text-gray-600 mb-6">
                  We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                <p className="text-gray-600 mb-6">
                  These terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <ul className="list-none text-gray-600 mb-6">
                  <li><strong>Email:</strong> info@hopeforcommunities.co.ke</li>
                  <li><strong>Phone:</strong> +254 700 000 000</li>
                  <li><strong>Address:</strong> Nairobi, Kenya</li>
                </ul>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">
                    Questions about these terms?
                  </h3>
                  <p className="text-amber-700">
                    We're here to help clarify any questions you may have about our terms of service. Please don't hesitate to contact us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;