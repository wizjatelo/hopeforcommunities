import React from "react";
import { Users, Heart, Award, Building } from "lucide-react";
import Header from '../components/Header'
import Footer from '../components/Footer'

const PartnersPage = () => {
  const partners = [
    {
      name: "Wachara Primary School",
      description:
        "Supporting education by providing tuition fees for students in need, ensuring every child has access to quality learning opportunities.",
      icon: <Award className="w-12 h-12 text-blue-600" />,
      color: "from-blue-50 to-blue-100",
    },
    {
      name: "Kenya Red Cross",
      description:
        "Collaborating on humanitarian initiatives and community health programs to improve lives and respond to emergencies.",
      icon: <Heart className="w-12 h-12 text-red-600" />,
      color: "from-red-50 to-red-100",
    },
    {
      name: "Winners Chapel International Nyahera",
      description:
        "Working together on community outreach programs and spiritual support services for vulnerable populations.",
      icon: <Users className="w-12 h-12 text-purple-600" />,
      color: "from-purple-50 to-purple-100",
    },
    {
      name: "Kisumu County Government",
      description:
        "Partnering with local government to strengthen community development initiatives and social welfare programs.",
      icon: <Building className="w-12 h-12 text-green-600" />,
      color: "from-green-50 to-green-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Valued Partners</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Together, we're making a lasting impact in our community through collaboration, dedication, and shared commitment to creating positive change.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${partner.color} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-white rounded-full shadow-md">{partner.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{partner.name}</h3>
                <p className="text-gray-700 leading-relaxed">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Interested in Partnering With Us?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join our network of organizations making a real difference in the community.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            Get In Touch
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PartnersPage;
