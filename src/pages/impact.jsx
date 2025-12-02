import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Quote, X } from 'lucide-react'

function Impact() {
const [selectedStory, setSelectedStory] = useState(null)

const stories = [
{
name: 'Grace',
role: 'Student Beneficiary',
quote: 'Thanks to Hopes for Communities, I can now go to school and dream of becoming a teacher to help others like me.',
fullStory: 'Grace struggled to continue school due to financial challenges. Through our school fee sponsorship program, she can now attend classes consistently and pursue her dream of becoming a teacher, inspiring other children in her community.',
image: '/images/grace-story.jpg'
},
{
name: 'John',
role: 'Youth Apprentice',
quote: 'The vocational training program gave me the skills to start my own carpentry business.',
fullStory: 'John joined our carpentry training program and gained practical skills. He has since started his own small business, providing employment opportunities and becoming a role model for other youths in his neighborhood.',
image: '/images/john-story.jpg'
},
{
name: 'Mary',
role: 'Mentorship Program Beneficiary',
quote: 'Through one-on-one counseling, I gained emotional support and guidance.',
fullStory: 'Mary faced challenges at home and school. By participating in our mentorship and counseling programs, she learned coping strategies, built confidence, and now mentors younger students herself.',
image: '/images/mary-story.jpg'
},
{
name: 'Peter',
role: 'Student Beneficiary',
quote: 'I received school fees support and can now focus fully on my studies.',
fullStory: 'Peter used to skip school due to fees. Our education sponsorship ensured he could continue his studies uninterrupted. He now excels academically and aspires to pursue higher education.',
image: '/images/peter-story.jpg'
}
]

return (
  <div className="min-h-screen">
    <Header />

  <section className="py-20 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
      <p className="text-lg text-text-light max-w-2xl mx-auto">
        Every story represents hope, growth, and empowerment. Click a story to read more.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
      {stories.map((story, index) => (
        <div
          key={index}
          onClick={() => setSelectedStory(story)}
          className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:shadow-2xl transition-shadow"
        >
          <img 
            src={story.image} 
            alt={story.name} 
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
          />
          <Quote className="w-8 h-8 text-primary mb-3 opacity-50" />
          <p className="text-gray-700 italic mb-2">"{story.quote}"</p>
          <h3 className="font-bold text-lg">{story.name}</h3>
          <p className="text-sm text-text-light">{story.role}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Modal */}
  {selectedStory && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative shadow-2xl">
        <button
          onClick={() => setSelectedStory(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        <img 
          src={selectedStory.image} 
          alt={selectedStory.name} 
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-primary"
        />
        <Quote className="w-8 h-8 text-primary mx-auto mb-3 opacity-50" />
        <p className="text-gray-700 italic mb-4">"{selectedStory.fullStory}"</p>
        <h3 className="font-bold text-lg">{selectedStory.name}</h3>
        <p className="text-sm text-text-light">{selectedStory.role}</p>
      </div>
    </div>
  )}

  <Footer />
  </div>
);

}

export default Impact
