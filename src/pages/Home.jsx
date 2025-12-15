import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero' 
import ErrorBoundary from '../components/ErrorBoundary'
import { Link } from 'react-router-dom'
import { Heart, Users, GraduationCap, Home as HomeIcon, ChevronDown, ArrowRight } from 'lucide-react'
const Wave = ({ flip = false, color = "#fff" }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-12 md:h-20 lg:h-24"
    >
      <path
        d="M0,0V46.29c47.79,22.2,103.59,35.77,158,27,70-11.37,136-57.46,206-66,73.11-9,147,32.89,218,54,69,20.67,138,22.38,209,2,66-19,132-57,201-61,57-.31,113,20.34,168,35V0Z"
        fill={color}
      ></path>
    </svg>
  </div>
)

function Home() {
  const priorities = [
    {
      title: 'Community Organizing',
      description: 'Communities collectively articulate their dreams and aspirations for the future and raise their voices to seek tangible change in their community and broader society.'
    },
    {
      title: 'Gender Equality',
      description: 'Inclusive practices dismantle barriers that prevent marginalized groups from fully participating in society, ensuring everyone has an equal opportunity to thrive.'
    },
    {
      title: 'Health and Wellbeing',
      description: 'Affordable, quality health and education services enable individuals to experience physical, mental, and social well-being and lead healthy and productive lives.'
    },
    {
      title: 'Economic Opportunity',
      description: 'Individuals possess the skills, agency, and financial means needed to enhance their mobility and make informed, sustainable choices for themselves and their communities.'
    },
    {
      title: 'Community Resilience',
      description: 'Drawing on their collective strength, communities have the knowledge, drive, and hope to break through survival mode and adapt.'
    }
  ]

  const [openAccordion, setOpenAccordion] = React.useState(0)

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Header />
        
       
<Hero />


        {/* Quick Links */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16 px-4 border-b border-cyan-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <h2 className="text-3xl font-bold uppercase mb-4">Quick Links</h2>
                <p className="text-xl text-cyan-100 leading-relaxed">
                  Whether you're here to give, learn, or spread the word, jump to the resources you need.
                </p>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white bg-opacity-10 border border-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all shadow-sm">
                    <div className="flex items-center text-cyan-200 mb-4">
                      <Heart className="w-8 h-8 mr-3" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Donor Hub</h3>
                    <p className="text-cyan-100 mb-4 text-sm">
                      Everything you need to see your impact and stay involved.
                    </p>
                    <Link 
                      to="/donate" 
                      className="inline-flex items-center text-white hover:text-cyan-200 font-medium"
                    >
                      Go <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>

                  <div className="bg-white bg-opacity-10 border border-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all shadow-sm">
                    <div className="flex items-center text-cyan-200 mb-4">
                      <Users className="w-8 h-8 mr-3" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Media Center</h3>
                    <p className="text-cyan-100 mb-4 text-sm">
                      Treasured moments during  our journey.
                    </p>
                    <Link 
                      to="/album" 
                      className="inline-flex items-center text-white hover:text-cyan-200 font-medium"
                    >
                      Go <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-16 px-4 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-start">

              <div className="lg:col-span-5">
                <h1 className="text-5xl lg:text-6xl font-bold text-cyan-600 uppercase mb-6 leading-tight">How We Work</h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our holistic approach empowers individuals by addressing their essential physical, social, and economic needs, enabling them to lead their own sustainable change and thrive.
                </p>
                <Link 
                  to="/programs" 
                  className="inline-flex items-center bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 transition-colors font-medium"
                >
                  Learn more
                </Link>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <h6 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                  Our Priorities
                </h6>

                <div className="space-y-2">
                  {priorities.map((priority, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <button
                        onClick={() => setOpenAccordion(openAccordion === index ? -1 : index)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-medium text-gray-900">{priority.title}</h3>
                        <ChevronDown 
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            openAccordion === index ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {openAccordion === index && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{priority.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Featured Story */}
        <section className="relative py-20 px-4 bg-gray-900 text-white overflow-hidden border-b border-gray-700">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('${import.meta.env.BASE_URL}images/grace-story.jpg')`
            }}
          ></div>

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-12 border border-white/20 shadow-lg">
              <h2 className="text-4xl font-bold mb-6">From Crisis to Confidence</h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                How Hopes for Communities is transforming lives through education, mentorship, and community support programs that create lasting change.
              </p>
              <hr className="border-cyan-500 w-24 mx-auto mb-8" />
              <Link 
                to="/impact" 
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-lg"
              >
                Read More
              </Link>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 py-16 px-4 border-b border-cyan-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-center">

              <div className="lg:col-span-7">
                <h6 className="text-sm font-semibold text-cyan-200 uppercase tracking-wider mb-4">
                  Recent Recognition
                </h6>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Hope for Communities
                </h2>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white">
                    <Link to="/about" className="hover:text-cyan-200 transition-colors">
                      Transforming Lives Since 2020
                    </Link>
                  </h3>
                  <h3 className="text-2xl font-semibold text-white">
                    <Link to="/impact" className="hover:text-cyan-200 transition-colors">
                      Impacting 500+ Children and Families
                    </Link>
                  </h3>
                </div>
              </div>

              <div className="lg:col-span-5 text-right">
                <div className="inline-block max-w-xs border border-white/20 rounded-lg shadow-lg overflow-hidden">
                  <Link to="/about" className="block hover:opacity-80 transition-opacity">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/grad.jpg`}
                      alt="Hopes for Communities Impact"
                      className="rounded-lg w-full h-auto" 
                     
                    />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default Home
