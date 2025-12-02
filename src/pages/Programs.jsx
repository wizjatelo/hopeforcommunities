import React from 'react'
import Header from '../components/Header'
import ProgramDetail from '../components/ProgramDetail'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'

function Programs() {
  const programs = [
    {
      icon: 'GraduationCap',
      title: 'School Fees Sponsorship',
      description: 'Providing targeted school fee support to families in economic hardship so children can stay in school.',
      details: 'We provide full or partial school fee sponsorships for primary and secondary students from vulnerable families. Support covers tuition, uniforms, books, and essential supplies. Students are selected based on need assessment and maintained through regular academic progress monitoring.',
      impact: 'Over the last year we supported 30+ students with school fees, helping them stay in school and continue their education.',
      cta: { text: 'Sponsor a Child', link: '/get-involved#sponsor' }
    },
    {
      icon: 'HeartHandshake',
      title: 'Mentorship & Counseling',
      description: 'One-on-one guidance and group counseling to support emotional and spiritual growth.',
      details: 'Our mentorship program pairs vulnerable children with trained mentors who provide emotional support, life skills guidance, and spiritual counseling. Programs include weekly one-on-one sessions, group workshops, and family counseling services.',
      impact: '70+ participants engaged in regular mentorship activities, showing improved confidence and decision-making skills.',
      cta: { text: 'Learn More', link: '/get-involved#volunteer' }
    },
    {
      icon: 'BookOpen',
      title: 'Weekend & Holiday Bible Study',
      description: 'Spiritual education and character development through structured Bible study programs.',
      details: 'Regular weekend Bible study sessions and holiday programs that provide spiritual grounding, character development, and moral education. Programs are age-appropriate and include interactive learning, music, and community activities.',
      impact: 'Regular participation from 50+ children across different age groups, building strong faith foundations.',
      cta: { text: 'Get Involved', link: '/get-involved' }
    },
    {
      icon: 'Wrench',
      title: 'Vocational & Skills Training',
      description: 'Skills training in carpentry, electrical work, tailoring, and agriculture for youth empowerment.',
      details: 'Practical vocational training programs designed to equip youth with marketable skills. Planned modules include electrical/solar installation, carpentry and woodworking, tailoring and fashion, and modern agriculture techniques. Training combines theoretical learning with hands-on practice.',
      impact: 'Program in development — targeting 50+ youth participants in the first year with job placement support.',
      cta: { text: 'Support This Program', link: '/get-involved' }
    },
    {
      icon: 'Building2',
      title: 'Educational Center Project',
      description: 'Building a dedicated educational center with classrooms, library, and vocational training facilities.',
      details: 'Our ambitious project to establish a comprehensive educational center that will provide centralized learning spaces, a well-stocked library, computer lab, and vocational training workshops. The center will serve as the hub for all our programs and expand our capacity to serve more children.',
      impact: 'Goals: Secure land, build 4 classrooms, establish library and computer lab, enroll first cohort of 100+ students.',
      cta: { text: 'Donate to This Project', link: '/get-involved' }
    }
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Header />
        
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl text-text-light">
              Comprehensive programs designed to transform lives through education, mentorship, and skills development.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {programs.map((program, index) => (
              <ProgramDetail key={index} {...program} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default Programs
