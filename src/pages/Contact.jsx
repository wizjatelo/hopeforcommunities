import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create form data object for FormSubmit
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("subject", formData.subject);
    payload.append("message", formData.message);

    // FormSubmit hidden fields
    payload.append("_captcha", "false");
    payload.append("_template", "table");
    payload.append("_subject", "New Contact Message");
    payload.append("_next", window.location.href);

    try {
      await fetch("https://formsubmit.co/hopeforcommunities254@gmail.com", {
        method: "POST",
        body: payload
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "hopeforcommunities254@gmail.com",
      action: "mailto:hopeforcommunities254@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+254  719241159",
      action: "tel:+254719241159"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      details: "Chat with us directly",
      action: "https://wa.me/254719241159"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "Nairobi, Kenya",
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">
        {/* YOUR ORIGINAL UI (unchanged) */}
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Get In Touch
                </h1>
                <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
                  We'd love to hear from you...
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+254719241159"
                    className="inline-flex items-center bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Call Now: +254 719241159
                  </a>
                  <a
                    href="https://wa.me/254719241159"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-500 text-white px-8 py-4 rounded-lg font-semibold"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>

                {/* Quick info unchanged */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 mr-4 text-cyan-200" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:hopeforcommunities254@gmail.com" className="text-cyan-200 hover:text-white">
                        info@hopeforcommunities.co.ke
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 mr-4 text-cyan-200" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+254719241159" className="text-cyan-200 hover:text-white">
                        +254 7192411159
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-4 text-cyan-200" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-cyan-200">Nairobi, Kenya</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-6 h-6 mr-4 text-cyan-200" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <a 
                        href="https://wa.me/254719241159" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-200 hover:text-white"
                      >
                        Chat with us directly
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-cyan-500">
                  <div className="text-cyan-600 mb-6 flex justify-center">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{info.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{info.details}</p>
                  {info.action && (
                    <a
                      href={info.action}
                      className="inline-flex items-center bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold"
                      target={info.action.startsWith('http') ? '_blank' : undefined}
                      rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      Contact Now
                    </a>
                  )}
                </div>
              ))}
            </div>


            {/* Contact Form */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Send Us a Message</h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    Something went wrong. Please try again.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-md"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;