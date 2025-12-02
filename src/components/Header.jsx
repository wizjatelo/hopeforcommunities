import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart } from 'lucide-react'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Get Involved', href: '/GetInvolved' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            <span className="text-xl font-bold text-text-dark">Hopes for Communities</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary font-semibold'
                    : 'text-text-light hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/GetInvolved" className="btn-primary">
              Donate Now
            </Link>
          </nav>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary font-semibold'
                    : 'text-text-light hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/GetInvolved" 
              onClick={() => setIsOpen(false)}
              className="block mt-4 btn-primary text-center"
            >
              Donate Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
