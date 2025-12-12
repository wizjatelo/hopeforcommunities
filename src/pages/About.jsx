import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'
import { Heart, Users, Target, Lightbulb, Download, ArrowRight, Award, Globe, BookOpen } from 'lucide-react'

function About() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Faith",
      description: "We believe in the power of faith to transform lives and communities, providing hope and strength in challenging times."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Integrity", 
      description: "We operate with transparency, honesty, and accountability in all our programs and partnerships."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Compassion",
      description: "We approach every individual with empathy, understanding, and genuine care for their wellbeing."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Sustainability",
      description: "We focus on creating lasting change through programs that empower communities to thrive independently."
    }
  ]

  const leadership = [
    {
      name: "Sarah Wanjiku",
      role: "Executive Director",
      image: "/images/grace-story.jpg",
      bio: "Sarah brings over 15 years of experience in community development and education advocacy."
    },
    {
      name: "James Mwangi", 
      role: "Program Director",
      image: "/images/john-story.jpg",
      bio: "James oversees all program implementation and community partnerships across our service areas."
    },
    {
      name: "Grace Akinyi",
      role: "Education Coordinator", 
      image: "/images/mary-story.jpg",
      bio: "Grace manages our education programs and works directly with schools and families."
    }
  ]

  const partnerships = [
    {
      category: "Educational Partners",
      partners: ["Local Primary Schools", "Secondary Schools", "Vocational Training Centers", "Universities"]
    },
    {
      category: "Community Partners", 
      partners: ["Local Churches", "Community Leaders", "Women's Groups", "Youth Organizations"]
    },
    {
      category: "Government Partners",
      partners: ["Ministry of Education", "County Government", "Local Administration", "Social Services"]
    },
    {
      category: "International Partners",
      partners: ["International NGOs", "Donor Organizations", "Volunteer Networks", "Sister Organizations"]
    }
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-2">
                  <h1 className="text-5xl lg:text-6xl font-bold uppercase mb-6 leading-tight">
                    About Us
                  </h1>
                  <p className="text-xl text-cyan-100 leading-relaxed mb-8">
                    <strong>Hopes for Communities is a leading community-based organization mobilizing the largest network of social groups in Kenya to provide holistic, needs-driven services and redefine the potential of citizen-led change.</strong>
                  </p>
                  <a 
                    href="#story" 
                    className="inline-flex items-center text-cyan-200 hover:text-white font-medium text-lg transition-colors"
                  >
                    Learn more about us <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Award className="w-6 h-6 mr-3 text-cyan-200" />
                        <span>Founded in 2020</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-6 h-6 mr-3 text-cyan-200" />
                        <span>500+ Lives Impacted</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-6 h-6 mr-3 text-cyan-200" />
                        <span>Operating in Kenya</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-6 h-6 mr-3 text-cyan-200" />
                        <span>5 Core Programs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section id="story" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      Hopes for Communities was born from a simple yet powerful belief: that every child deserves access to quality education and the opportunity to reach their full potential, regardless of their circumstances.
                    </p>
                    <p className="mb-6">
                      Founded in 2020 by a group of passionate educators and community leaders, our organization emerged from witnessing firsthand the challenges faced by vulnerable children in underserved communities across Kenya.
                    </p>
                    <p className="mb-6">
                      What started as a small initiative to support school fees for a handful of children has grown into a comprehensive community development organization that addresses the holistic needs of children and families.
                    </p>
                    <p>
                      Today, we operate five core programs that span education support, mentorship, vocational training, and community development, impacting over 500 lives and continuing to grow our reach across Kenya.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="/images/hero-image.JPG"
                    alt="Children in our programs"
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-lg font-semibold">Transforming Lives Since 2020</p>
                    <p className="text-sm text-gray-200">Building stronger communities together</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our mission and vision guide every decision we make and every program we implement.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-white rounded-lg shadow-lg p-10 border-l-4 border-cyan-500">
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 text-cyan-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    To empower vulnerable children and communities through comprehensive education support, 
                    mentorship programs, and sustainable development initiatives that break the cycle of poverty 
                    and create lasting positive change.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-10 border-l-4 border-amber-500">
                  <div className="flex items-center mb-6">
                    <Lightbulb className="w-8 h-8 text-amber-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    A world where every child has access to quality education and the opportunity to reach 
                    their full potential, regardless of their background or circumstances. We envision thriving 
                    communities where hope, dignity, and opportunity flourish.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  These fundamental principles guide everything we do and shape our approach to community development.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="text-center group hover:bg-gray-50 p-6 rounded-lg transition-colors">
                    <div className="text-cyan-600 mb-6 flex justify-center group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Leadership Team */}
          <section id="team" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Meet the dedicated leaders who guide our mission and drive our impact in communities across Kenya.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {leadership.map((leader, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="aspect-w-3 aspect-h-4">
                      <img 
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                      <p className="text-cyan-600 font-medium mb-4">{leader.role}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partnerships */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partnerships</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We work closely with various organizations and stakeholders to maximize our impact and reach across communities.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {partnerships.map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-cyan-200 pb-2">
                      {category.category}
                    </h3>
                    <ul className="space-y-2">
                      {category.partners.map((partner, partnerIndex) => (
                        <li key={partnerIndex} className="text-gray-600 text-sm flex items-center">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 flex-shrink-0"></div>
                          {partner}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Annual Report */}
          <section className="py-20 bg-gradient-to-r from-cyan-600 to-cyan-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-12">
                <Download className="w-16 h-16 text-white mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Download Our Annual Report</h3>
                <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
                  Learn more about our impact, programs, financial transparency, and the communities we serve through our comprehensive annual report.
                </p>
                <a 
                  href="/annual-report-2024.pdf" 
                  download="Hopes-for-Communities-Annual-Report-2024.pdf"
                  className="inline-flex items-center bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
                >
                  <Download className="w-5 h-5 mr-3" />
                  Download 2024 Report
                </a>
                <p className="text-cyan-200 text-sm mt-4">PDF • 2.5 MB • English</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default About