import React from 'react'

function StatsBar() {
  const stats = [
    { number: '100+', label: 'Students Engaged' },
    { number: '30+', label: 'School Fee Sponsorships' },
    { number: '70+', label: 'Mentorship Participants' }
  ]

  return (
    <section className="py-16 px-4 bg-primary text-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar
