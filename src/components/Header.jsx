import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart, Search, Phone } from 'lucide-react'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navSections = [
    {
      header: 'About',
      links: [
        { name: 'Overview', href: '/about' },
        { name: 'Our Story', href: '/about#story' },
        { name: 'Leadership Team', href: '/about#team' },
        { name: 'Partnerships', href: '/partners' },
        { name: 'Contact Us', href: '/contact' }
      ]
    },
    {
      header: 'Our Work',
      links: [
        { name: 'Our Priorities', href: '/programs' },
        { name: 'School Fees Support', href: '/programs#education' },
        { name: 'Mentorship Programs', href: '/programs#mentorship' },
        { name: 'Vocational Training', href: '/programs#vocational' },
        { name: 'Educational Center Project', href: '/programs#center' }
      ]
    },
    {
      header: 'Impact',
      links: [
        { name: 'Overview', href: '/impact' },
        { name: 'Impact Stories', href: '/impact#stories' },
        { name: 'Reports', href: '/impact#reports' }
      ]
    },
    {
      header: 'Get Involved',
      links: [
        { name: 'Donate', href: '/donate' },
        { name: 'Sponsor a Child', href: '/getinvolved#sponsor' },
        { name: 'Partner With Us', href: '/partners' },
        { name: 'Volunteer', href: '/getinvolved#volunteer' }
      ]
    }
  ]

  const desktopNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Get Involved', href: '/getinvolved' },
    {name: 'Contact Us', href: '/contact'}
  ]

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Heart className="w-10 h-10 text-cyan-600" fill="currentColor" />
              <span className="text-2xl font-bold text-gray-900">Hopes for Communities</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {desktopNavLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`px-5 py-2 text-base font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'text-cyan-600'
                      : 'text-gray-700 hover:text-cyan-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                to="/donate"
                className="ml-4 bg-cyan-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-cyan-700 transition-colors"
              >
                Donate Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="lg:hidden fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 overflow-y-auto">
            {/* Sidebar Header */}
            <div className="bg-cyan-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
                <span className="text-white font-bold text-lg">Menu</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Sidebar Content */}
            <nav className="py-4">
              {navSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                  {/* Section Header */}
                  <div className="px-6 py-2">
                    <h3 className="text-sm font-bold text-cyan-600 uppercase tracking-wider">
                      {section.header}
                    </h3>
                  </div>
                  
                  {/* Section Links */}
                  <div className="space-y-1">
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-6 py-3 transition-colors ${
                          location.pathname === link.href
                            ? 'bg-cyan-50 text-cyan-700 font-semibold border-l-4 border-cyan-600'
                            : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                      >
                        <span className="text-sm">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Additional Actions */}
              <div className="px-6 mt-8 space-y-3">
                <Link 
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center border border-cyan-600 text-cyan-600 px-4 py-3 rounded-full font-semibold hover:bg-cyan-50 transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/donate"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-cyan-600 text-white px-4 py-3 rounded-full font-semibold hover:bg-cyan-700 transition-colors"
                >
                  Donate Now
                </Link>
                <a
                  href="tel:+254700168665"
                  className="flex items-center justify-center text-gray-700 hover:text-cyan-600 transition-colors text-sm py-2"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +254 719241159
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}

export default Header