import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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

                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-6">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Make a donation or become a sponsor</li>
                  <li>Fill out volunteer applications or contact forms</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in our programs or events</li>
                  <li>Communicate with us via email, phone, or social media</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Process donations and sponsorship payments</li>
                  <li>Communicate with you about our programs and impact</li>
                  <li>Send newsletters and updates (with your consent)</li>
                  <li>Coordinate volunteer activities</li>
                  <li>Improve our services and website functionality</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-600 mb-6">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>To trusted service providers who assist in operating our website and programs</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent for specific purposes</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-600 mb-6">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-6">
                  Our website may use cookies to enhance your experience. You can choose to disable cookies through your browser settings, though this may affect website functionality.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Access and update your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>File a complaint with relevant data protection authorities</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
                <p className="text-gray-600 mb-6">
                  Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13 without parental consent.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
                <p className="text-gray-600 mb-6">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this privacy policy, please contact us:
                </p>
                <ul className="list-none text-gray-600 mb-6">
                  <li><strong>Email:</strong> info@hopeforcommunities.co.ke</li>
                  <li><strong>Phone:</strong> +254 700 000 000</li>
                  <li><strong>Address:</strong> Nairobi, Kenya</li>
                </ul>

                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-cyan-800 mb-2">
                    Questions about your data?
                  </h3>
                  <p className="text-cyan-700">
                    We're committed to transparency. If you have any questions about how we handle your personal information, please don't hesitate to reach out to us.
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

export default PrivacyPolicy;