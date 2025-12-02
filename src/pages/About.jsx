import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'
import { Cross, ShieldCheck, Heart, Leaf, Target, Eye, Check, Download } from 'lucide-react'

function About() {
  const values = [
    { icon: Cross, title: 'Faith', description: 'Rooted in Christian values and spiritual guidance' },
    { icon: ShieldCheck, title: 'Integrity', description: 'Transparent and accountable in all we do' },
    { icon: Heart, title: 'Compassion', description: 'Serving with empathy and unconditional love' },
    { icon: Leaf, title: 'Sustainability', description: 'Building lasting change in communities' }
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Header />
        
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 text-center">About Us</h1>
            <p className="text-xl text-text-light text-center mb-12">
              Hopes for Communities is a faith-based community organization dedicated to giving vulnerable children access to education, mentorship, and vocational skills.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-primary text-white p-8 rounded-xl">
              <Target className="w-10 h-10 mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg">To transform lives through education, mentorship, and spiritual growth.</p>
            </div>
            <div className="bg-secondary text-text-dark p-8 rounded-xl">
              <Eye className="w-10 h-10 mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg">A future where every child has access to education and hope.</p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {values.map((Value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{Value.title}</h3>
                  <p className="text-sm text-text-light">{Value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Our Reach</h2>
            <p className="text-lg text-text-light mb-6 leading-relaxed">
              Hopes for Communities works in partnership with local schools and churches to deliver transformative programs. Our key partnerships include:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <Check className="text-primary mr-3 mt-1" />
                <span>Wachara Primary School</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-3 mt-1" />
                <span>Bar Union Secondary School</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-3 mt-1" />
                <span>Winners' Chapel International – Nyahera</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mr-3 mt-1" />
                <span>AIC (Africa Inland Church)</span>
              </li>
            </ul>
            
            <div className="mt-12 bg-primary text-white p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Download Our Annual Report</h3>
              <p className="mb-6">Learn more about our impact, programs, and financial transparency.</p>
              <button className="btn-secondary">
                <div className="flex items-center justify-center">
                  <Download className="mr-2" />
                  Download Report
                </div>
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default About
