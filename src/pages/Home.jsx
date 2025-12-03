import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import ProgramCard from '../components/ProgramCard'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'
import { Link } from 'react-router-dom'
import { Quote } from 'lucide-react'

function Home() {
  const programs = [
    { 
      icon: 'GraduationCap', 
      title: 'Education', 
      description: 'School fee sponsorships helping vulnerable children stay in school and build their future.' 
    },
    { 
      icon: 'HeartHandshake', 
      title: 'Mentorship & Counseling', 
      description: 'One-on-one guidance and group counseling to support emotional and spiritual growth.' 
    },
    { 
      icon: 'Wrench', 
      title: 'Vocational Training', 
      description: 'Skills training in carpentry, electrical work, tailoring, and agriculture for youth empowerment.' 
    }
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <StatsBar />
        
        {/* WHAT WE DO */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What We Do</h2>
              <p className="text-lg text-text-light max-w-2xl mx-auto">
                We transform lives through targeted programs that address education, personal development, and economic empowerment.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <ProgramCard key={index} {...program} />
              ))}
            </div>
          </div>
        </section>

        {/* QUOTE + IMAGE */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 mx-auto mb-6 opacity-50" />
            <p className="text-2xl mb-6 italic">
              "Thanks to Hopes for Communities, I can now go to school and dream of becoming a teacher to help others like me."
            </p>
            <p className="text-lg opacity-90">— Grace, Student Beneficiary</p>

            {/* Circular Image with Border */}
            <img 
              src={`${import.meta.env.BASE_URL}images/grace-story.jpg`}
              alt="Grace beneficiary"
              className="mx-auto mt-6 rounded-full shadow-lg w-40 h-40 object-cover border-4 border-white"
            />

            <Link to="/impact" className="inline-block mt-8 btn-secondary">
              Read Success Stories
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default Home