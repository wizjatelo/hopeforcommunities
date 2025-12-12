import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for subscribing! You will receive updates from Hopes for Communities.')
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Organization Info */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold mb-4">Hopes for Communities</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Hopes for Communities is a community-led nonprofit organization that catalyzes large-scale transformation in underserved communities by providing critical services for all, community advocacy platforms, and education and leadership development for women and girls.
            </p>
            
            <hr className="border-cyan-500 mb-6" />
            
            <h4 className="font-semibold mb-4">Subscribe to our newsletter</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
              <button 
                type="submit" 
                className="w-full bg-cyan-600 text-white px-4 py-3 rounded font-semibold hover:bg-cyan-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="lg:col-span-1"></div>

          {/* About Us Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4">
              <Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link>
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/about#team" className="text-gray-400 hover:text-white transition-colors">Leadership Team</Link></li>
              <li><Link to="/partners" className="text-gray-400 hover:text-white transition-colors">Partnerships</Link></li>
            </ul>

            <h4 className="font-semibold mb-4 mt-6">
              <Link to="/impact" className="hover:text-cyan-400 transition-colors">Our Impact</Link>
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/impact" className="text-gray-400 hover:text-white transition-colors">Measuring Impact</Link></li>
              <li><Link to="/impact#reports" className="text-gray-400 hover:text-white transition-colors">Reports</Link></li>
              <li><Link to="/impact#stories" className="text-gray-400 hover:text-white transition-colors">Impact Stories</Link></li>
            </ul>

            <h4 className="font-semibold mb-4 mt-6">
              <Link to="/getinvolved" className="hover:text-cyan-400 transition-colors">Get Involved</Link>
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/donate" className="text-gray-400 hover:text-white transition-colors">Donate</Link></li>
              <li><Link to="/getinvolved#sponsor" className="text-gray-400 hover:text-white transition-colors">Sponsorships</Link></li>
              <li><Link to="/partners" className="text-gray-400 hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link to="/getinvolved#volunteer" className="text-gray-400 hover:text-white transition-colors">Volunteer</Link></li>
            </ul>

            <p className="mt-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            </p>
          </div>

          {/* Our Work Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4">
              <Link to="/programs" className="hover:text-cyan-400 transition-colors">Our Work</Link>
            </h4>
            
            <h5 className="font-medium text-sm mb-3">Priorities</h5>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link to="/programs#organizing" className="text-gray-400 hover:text-white transition-colors">Community Organizing</Link></li>
              <li><Link to="/programs#gender" className="text-gray-400 hover:text-white transition-colors">Gender Equality</Link></li>
              <li><Link to="/programs#health" className="text-gray-400 hover:text-white transition-colors">Health and Wellbeing</Link></li>
              <li><Link to="/programs#economic" className="text-gray-400 hover:text-white transition-colors">Economic Opportunity</Link></li>
              <li><Link to="/programs#resilience" className="text-gray-400 hover:text-white transition-colors">Community Resilience</Link></li>
            </ul>

            <h5 className="font-medium text-sm mb-3">Programs</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/programs#education" className="text-gray-400 hover:text-white transition-colors">Education</Link></li>
              <li><Link to="/programs#mentorship" className="text-gray-400 hover:text-white transition-colors">Mentorship</Link></li>
              <li><Link to="/programs#vocational" className="text-gray-400 hover:text-white transition-colors">Vocational Training</Link></li>
              <li><Link to="/programs#center" className="text-gray-400 hover:text-white transition-colors">Educational Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold mb-4">
              <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link>
            </h4>
            
            <div className="space-y-4 text-sm mb-6">
              <div>
                <h5 className="font-medium mb-2">Kenya Office</h5>
                <div className="flex items-start space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>Nairobi, Kenya</p>
                    <p>P.O. Box 12345-00100</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@hopeforcommunities.co.ke" className="hover:text-white transition-colors">
                  info@hopeforcommunities.co.ke
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+254700000000" className="hover:text-white transition-colors">
                  +254 700 000 000
                </a>
              </div>
            </div>

            <hr className="border-cyan-500 mb-6" />

            <div className="space-y-2 text-sm mb-6">
              <Link to="/faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">Media Center</Link>
              <Link to="/album" className="block text-gray-400 hover:text-white transition-colors">Photo Gallery</Link>
            </div>

            <hr className="border-cyan-500 mb-6" />

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 Hopes for Communities. All rights reserved</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
