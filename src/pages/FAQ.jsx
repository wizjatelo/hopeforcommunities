import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState(new Set());

  const faqData = [
    {
      category: "About Our Organization",
      questions: [
        {
          id: 1,
          question: "What is Hopes for Communities?",
          answer: "Hopes for Communities is a nonprofit organization dedicated to supporting vulnerable children through education, mentorship, and community development programs. We focus on breaking the cycle of poverty through sustainable interventions."
        },
        {
          id: 2,
          question: "Where do you operate?",
          answer: "We primarily operate in Kenya, focusing on underserved communities where children face significant barriers to education and development. Our programs are designed to meet the specific needs of each community we serve."
        },
        {
          id: 3,
          question: "How long has the organization been operating?",
          answer: "Hopes for Communities has been serving vulnerable children and communities for several years, building strong relationships and sustainable programs that create lasting impact."
        }
      ]
    },
    {
      category: "Programs & Services",
      questions: [
        {
          id: 4,
          question: "What programs do you offer?",
          answer: "We offer five main programs: School Fees Support, Mentorship Programs, Bible Study & Spiritual Growth, Vocational Training, and our Educational Center Project. Each program is designed to address different aspects of child development and community empowerment."
        },
        {
          id: 5,
          question: "How do you select beneficiaries?",
          answer: "We work with local communities to identify children and families most in need. Our selection criteria include financial need, academic potential, family circumstances, and community recommendations."
        },
        {
          id: 6,
          question: "What is the Educational Center Project?",
          answer: "Our Educational Center Project aims to build a comprehensive learning facility that will serve as a hub for education, vocational training, and community activities. This center will provide a safe, nurturing environment for children to learn and grow."
        }
      ]
    },
    {
      category: "Getting Involved",
      questions: [
        {
          id: 7,
          question: "How can I donate?",
          answer: "You can donate through our website using various payment methods including M-Pesa, bank transfers, or international payment options. Visit our 'Get Involved' page for detailed donation instructions."
        },
        {
          id: 8,
          question: "Can I sponsor a specific child?",
          answer: "Yes! Our child sponsorship program allows you to directly support a child's education and development. Sponsors receive regular updates and can build a meaningful relationship with their sponsored child."
        },
        {
          id: 9,
          question: "Are there volunteer opportunities?",
          answer: "Absolutely! We welcome volunteers for various activities including tutoring, mentorship, event organization, and administrative support. Fill out our volunteer form to get started."
        },
        {
          id: 10,
          question: "Is my donation tax-deductible?",
          answer: "Tax deductibility depends on your location and local tax laws. Please consult with your tax advisor regarding the deductibility of charitable contributions in your jurisdiction."
        }
      ]
    },
    {
      category: "Impact & Transparency",
      questions: [
        {
          id: 11,
          question: "How do you measure impact?",
          answer: "We track various metrics including school enrollment rates, academic performance, graduation rates, and long-term outcomes for our beneficiaries. We also conduct regular community assessments to measure broader impact."
        },
        {
          id: 12,
          question: "Can I see how my donation is used?",
          answer: "Yes! We believe in complete transparency. Donors receive regular reports showing how funds are allocated and the impact achieved. You can also download our annual reports from the About page."
        },
        {
          id: 13,
          question: "Do you have success stories?",
          answer: "Yes! Visit our Impact page to read inspiring stories from our beneficiaries who have overcome challenges and achieved their goals through our programs."
        }
      ]
    }
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQ = faqData
    .map(category => ({
      ...category,
      questions: category.questions.filter(
        item =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Find answers to common questions about our programs, donations, and how you can get involved.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* FAQ + Sidebar Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">

              {/* Sidebar — stays on the RIGHT */}
              <div className="lg:col-span-1 lg:order-2">
                <div className="sticky top-24 space-y-6">

                  {/* Quick Navigation */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                    <ul className="space-y-2">
                      {faqData.map((category, index) => (
                        <li key={index}>
                          <a
                            href={`#${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-cyan-600 hover:text-cyan-800 text-sm transition-colors"
                          >
                            {category.category}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Card */}
                  <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-lg shadow-md p-6 text-white">
                    <h3 className="text-lg font-semibold mb-4">Need More Help?</h3>
                    <p className="text-cyan-100 text-sm mb-6">
                      Can't find what you're looking for? Our team is here to help you.
                    </p>
                    <div className="space-y-3">
                      <a
                        href="/contact"
                        className="block w-full bg-white text-cyan-600 text-center py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors text-sm"
                      >
                        Contact Us
                      </a>
                      <a
                        href="https://wa.me/254700000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full bg-cyan-700 text-white py-2 px-4 rounded-md font-medium hover:bg-cyan-800 transition-colors text-sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Us
                      </a>
                      <a
                        href="tel:+254700000000"
                        className="flex items-center justify-center w-full bg-cyan-500 text-white py-2 px-4 rounded-md font-medium hover:bg-cyan-600 transition-colors text-sm"
                      >
                        📞 Call Us Now
                      </a>
                    </div>
                  </div>

                  {/* Popular Questions */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Questions</h3>
                    <ul className="space-y-3">
                      <li>
                        <button
                          onClick={() => toggleItem(7)}
                          className="text-left text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                        >
                          How can I donate?
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => toggleItem(8)}
                          className="text-left text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                        >
                          Can I sponsor a specific child?
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => toggleItem(9)}
                          className="text-left text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                        >
                          Are there volunteer opportunities?
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => toggleItem(4)}
                          className="text-left text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                        >
                          What programs do you offer?
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Resources */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="/about" className="text-sm text-gray-600 hover:text-cyan-600">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="/programs" className="text-sm text-gray-600 hover:text-cyan-600">
                          Our Programs
                        </a>
                      </li>
                      <li>
                        <a href="/impact" className="text-sm text-gray-600 hover:text-cyan-600">
                          Impact Stories
                        </a>
                      </li>
                      <li>
                        <a
                          href="/annual-report-2024.pdf"
                          download
                          className="text-sm text-gray-600 hover:text-cyan-600"
                        >
                          Annual Report
                        </a>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* FAQ Content — stays on the LEFT */}
              <div className="lg:col-span-3 lg:order-1">
                {filteredFAQ.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {filteredFAQ.map((category) => (
                      <div key={category.category} id={category.category.toLowerCase().replace(/\s+/g, '-')} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-cyan-50 px-6 py-4 border-b border-cyan-100">
                          <h2 className="text-xl font-semibold text-cyan-800">
                            {category.category}
                          </h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {category.questions.map((item) => (
                            <div key={item.id} className="p-6">
                              <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset rounded-md p-2 -m-2"
                              >
                                <h3 className="text-lg font-medium text-gray-900 pr-4">
                                  {item.question}
                                </h3>
                                {openItems.has(item.id) ? (
                                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                )}
                              </button>
                              {openItems.has(item.id) && (
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                  {item.answer}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
