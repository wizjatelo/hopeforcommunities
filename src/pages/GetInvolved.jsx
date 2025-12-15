import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'

function GetInvolved() {
  const [activeTab, setActiveTab] = React.useState('donate')
  const [donationForm, setDonationForm] = React.useState({
    amount: '',
    frequency: 'one-time',
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'stripe'
  })

  const [sponsorForm, setSponsorForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    frequency: 'monthly',
    childAge: 'any'
  })

  const [volunteerForm, setVolunteerForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    interests: []
  })

  const handleDonationSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your donation! You will receive a confirmation email shortly.')
  }

  const handleSponsorSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for choosing to sponsor a child! We will contact you with child profile details.')
  }

  const handleVolunteerSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your interest in volunteering! We will review your application and contact you soon.')
  }

  const donationAmounts = [25, 50, 100, 250, 500]

  React.useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash === 'sponsor' || hash === 'volunteer') {
      setActiveTab(hash)
    }
  }, [])

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get Involved</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join our mission to transform lives. Your support creates lasting change.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                <div className="text-3xl font-bold">1,500+</div>
                <div className="text-sm opacity-90">Children Supported</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                <div className="text-3xl font-bold">250+</div>
                <div className="text-sm opacity-90">Active Volunteers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                <div className="text-3xl font-bold">$2.5M+</div>
                <div className="text-sm opacity-90">Funds Raised</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {/* Impact Statement */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Every Contribution Makes a Difference</h2>
              <p className="text-text-light max-w-3xl mx-auto">
                Whether you donate, sponsor a child, or volunteer your time, you become part of a community 
                dedicated to creating opportunities and changing lives.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="flex flex-col md:flex-row border-b">
                {[
                  { id: 'donate', label: 'Make a Donation', icon: '💝' },
                  { id: 'sponsor', label: 'Sponsor a Child', icon: '👧' },
                  { id: 'volunteer', label: 'Volunteer', icon: '🤝' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-3 px-8 py-6 font-semibold text-lg transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white' 
                        : 'text-text-light hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* Donate Tab */}
                {activeTab === 'donate' && (
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-6">Support Our Mission</h2>
                      <p className="text-text-light mb-6">
                        Your donation provides essential resources for education, healthcare, and 
                        community development programs that directly impact children's lives.
                      </p>
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3">What your donation provides:</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">✓ $25 - School supplies for one child</li>
                          <li className="flex items-center gap-2">✓ $50 - Nutritious meals for a week</li>
                          <li className="flex items-center gap-2">✓ $100 - Educational materials for a classroom</li>
                          <li className="flex items-center gap-2">✓ $500 - Support for a family in need</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <form onSubmit={handleDonationSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold mb-3">Select or Enter Amount</label>
                          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-3">
                            {donationAmounts.map((amount) => (
                              <button
                                type="button"
                                key={amount}
                                onClick={() => setDonationForm({...donationForm, amount: amount.toString()})}
                                className={`py-3 rounded-lg font-semibold transition-all ${
                                  donationForm.amount === amount.toString()
                                    ? 'bg-primary text-white'
                                    : 'bg-white border hover:border-primary'
                                }`}
                              >
                                ${amount}
                              </button>
                            ))}
                          </div>
                          <input
                            type="number"
                            value={donationForm.amount}
                            onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                            placeholder="Or enter custom amount"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-3">Frequency</label>
                          <div className="grid grid-cols-2 gap-3">
                            {['one-time', 'monthly', 'quarterly', 'annually'].map((freq) => (
                              <button
                                type="button"
                                key={freq}
                                onClick={() => setDonationForm({...donationForm, frequency: freq})}
                                className={`py-3 rounded-lg font-semibold transition-all ${
                                  donationForm.frequency === freq
                                    ? 'bg-primary text-white'
                                    : 'bg-white border hover:border-primary'
                                }`}
                              >
                                {freq.charAt(0).toUpperCase() + freq.slice(1).replace('-', ' ')}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold">Your Information</h4>
                          <input
                            type="text"
                            value={donationForm.name}
                            onChange={(e) => setDonationForm({...donationForm, name: e.target.value})}
                            placeholder="Full Name"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <input
                            type="email"
                            value={donationForm.email}
                            onChange={(e) => setDonationForm({...donationForm, email: e.target.value})}
                            placeholder="Email Address"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                        >
                          {donationForm.frequency === 'one-time' ? 'Donate Now' : 'Start Recurring Donation'}
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Sponsor Tab */}
                {activeTab === 'sponsor' && (
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-6">Change a Child's Future</h2>
                      <p className="text-text-light mb-6">
                        By sponsoring a child, you provide consistent support for their education, 
                        healthcare, and overall well-being. You'll receive regular updates about 
                        your sponsored child's progress.
                      </p>
                      <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mb-6">
                        <h3 className="font-semibold mb-2">Sponsorship Includes:</h3>
                        <ul className="space-y-1 text-text-light">
                          <li>• Quality education and school supplies</li>
                          <li>• Regular health check-ups</li>
                          <li>• Nutritious meals</li>
                          <li>• Emotional support and mentorship</li>
                          <li>• Quarterly progress reports</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <form onSubmit={handleSponsorSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={sponsorForm.name}
                            onChange={(e) => setSponsorForm({...sponsorForm, name: e.target.value})}
                            placeholder="Your Full Name"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <input
                            type="email"
                            value={sponsorForm.email}
                            onChange={(e) => setSponsorForm({...sponsorForm, email: e.target.value})}
                            placeholder="Email Address"
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <input
                            type="tel"
                            value={sponsorForm.phone}
                            onChange={(e) => setSponsorForm({...sponsorForm, phone: e.target.value})}
                            placeholder="Phone Number (Optional)"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <div>
                            <label className="block text-sm font-semibold mb-3">Preferred Age Group</label>
                            <div className="grid grid-cols-3 gap-3">
                              {['5-8', '9-12', '13+', 'Any'].map((age) => (
                                <button
                                  type="button"
                                  key={age}
                                  onClick={() => setSponsorForm({...sponsorForm, childAge: age.toLowerCase()})}
                                  className={`py-3 rounded-lg font-semibold transition-all ${
                                    sponsorForm.childAge === age.toLowerCase()
                                      ? 'bg-primary text-white'
                                      : 'bg-white border hover:border-primary'
                                  }`}
                                >
                                  {age}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                        >
                          Begin Sponsorship Journey
                        </button>
                        <p className="text-sm text-center text-text-light">
                          You'll receive a child's profile within 48 hours of application.
                        </p>
                      </form>
                    </div>
                  </div>
                )}

                {/* Volunteer Tab */}
                {activeTab === 'volunteer' && (
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-6">Share Your Time & Skills</h2>
                      <p className="text-text-light mb-6">
                        Join our team of dedicated volunteers and make a hands-on impact. 
                        We offer various opportunities to match your skills and interests.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {['Tutoring', 'Mentoring', 'Event Planning', 'Administration', 'Fundraising', 'Creative Arts'].map((skill) => (
                          <div 
                            key={skill}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              volunteerForm.interests.includes(skill)
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white border-gray-200 hover:border-primary'
                            }`}
                            onClick={() => {
                              const interests = volunteerForm.interests.includes(skill)
                                ? volunteerForm.interests.filter(i => i !== skill)
                                : [...volunteerForm.interests, skill]
                              setVolunteerForm({...volunteerForm, interests})
                            }}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={volunteerForm.name}
                            onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                            placeholder="Full Name"
                            required
                            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <input
                            type="email"
                            value={volunteerForm.email}
                            onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                            placeholder="Email"
                            required
                            className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <textarea
                          value={volunteerForm.skills}
                          onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                          placeholder="Tell us about your skills, experience, and why you want to volunteer..."
                          rows="4"
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        ></textarea>
                        <div>
                          <label className="block text-sm font-semibold mb-3">Weekly Availability</label>
                          <div className="grid grid-cols-4 gap-2">
                            {['5-10', '10-15', '15-20', '20+'].map((hours) => (
                              <button
                                type="button"
                                key={hours}
                                onClick={() => setVolunteerForm({...volunteerForm, availability: hours})}
                                className={`py-2 rounded-lg font-semibold transition-all ${
                                  volunteerForm.availability === hours
                                    ? 'bg-primary text-white'
                                    : 'bg-white border hover:border-primary'
                                }`}
                              >
                                {hours} hrs
                              </button>
                            ))}
                          </div>
                        </div>
                        <button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                        >
                          Submit Volunteer Application
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Ways to Support */}
            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold mb-6">Other Ways to Get Involved</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Corporate Partnerships', desc: 'Partner with us for employee engagement and CSR initiatives', icon: '🏢' },
                  { title: 'Host a Fundraiser', desc: 'Organize events in your community to support our cause', icon: '🎉' },
                  { title: 'Spread Awareness', desc: 'Share our mission with your network on social media', icon: '📢' }
                ].map((way) => (
                  <div key={way.title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4">{way.icon}</div>
                    <h4 className="font-bold text-lg mb-2">{way.title}</h4>
                    <p className="text-text-light text-sm">{way.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default GetInvolved