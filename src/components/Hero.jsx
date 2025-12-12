import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section 
      className="relative bg-cover bg-center py-32 px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-image.JPG')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Building Hope. One Child at a Time.
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          We transform lives through education, mentorship, and spiritual growth — 
          helping vulnerable children find stability, skills, and hope.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <Link to="/get-involved" className="btn-primary text-lg">
            Donate Now
          </Link>

          <a 
            href="/get-involved#sponsor" 
            className="btn-secondary text-lg"
          >
            Sponsor a Child
          </a>

          <Link 
            to="/about"
            className="btn-outline text-lg bg-white bg-opacity-10 backdrop-blur-sm 
                       border-white text-white hover:bg-white hover:text-text-dark"
          >
            Learn Our Story
          </Link>

          {/* Album Button */}
          <Link 
            to="/album"
            className="btn-outline text-lg bg-white bg-opacity-10 backdrop-blur-sm 
                       border-white text-white hover:bg-white hover:text-text-dark"
          >
            Album
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
