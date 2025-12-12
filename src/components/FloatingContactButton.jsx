import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, X, Headphones } from 'lucide-react';

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call Us",
      action: "tel:+254700000000",
      color: "bg-blue-500 hover:bg-blue-600",
      text: "+254 700 000 000"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      action: "https://wa.me/254700000000",
      color: "bg-green-500 hover:bg-green-600",
      text: "Chat with us",
      external: true
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      action: "mailto:info@hopeforcommunities.co.ke",
      color: "bg-red-500 hover:bg-red-600",
      text: "Send Email"
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <div className="mb-4 space-y-3">
          {contactOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-lg shadow-lg p-2 mr-3 border border-gray-200">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap px-2">
                  {option.text}
                </span>
              </div>
              <a
                href={option.action}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noopener noreferrer" : undefined}
                className={`${option.color} text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110`}
                aria-label={option.label}
              >
                {option.icon}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-cyan-600 hover:bg-cyan-700'
        } text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110`}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Headphones className="w-6 h-6" />
        )}
      </button>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-cyan-600 animate-ping opacity-20"></div>
      )}
    </div>
  );
};

export default FloatingContactButton;