// src/pages/AboutContact.jsx
import {
  FaRobot
} from "react-icons/fa";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPhone,  
  FaMapMarkerAlt, 
  FaTripadvisor,
  FaGlobe,
  FaAward,
  FaUsers,
  FaStar,
  FaCompass,
  FaMedal,
  FaShieldAlt,
  FaClock,
  FaUser,
  FaPhoneAlt,
  FaFileAlt,
  FaGoogle,
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png'; // adjust path to wherever logo.png lives

const AboutContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        nationality: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1500);
  };

  // Featured Tour Packages
const tourPackages = [
  {
    name: "Pokhara Adventure Package",
    country: "Gandaki Province",
    rating: 5,
    comment: "Experience the beauty of Pokhara with boating on Phewa Lake, paragliding, Davis Falls, World Peace Pagoda, and breathtaking Himalayan views.",
    date: "4 Days / 3 Nights",
    platform: "Adventure Package"
  },
  {
    name: "Lumbini Heritage Package",
    country: "Lumbini Province",
    rating: 5,
    comment: "Visit the sacred birthplace of Lord Buddha, Maya Devi Temple, monasteries, and other UNESCO World Heritage sites.",
    date: "3 Days / 2 Nights",
    platform: "Cultural Package"
  },
  {
    name: "Chitwan Wildlife Package",
    country: "Bagmati Province",
    rating: 5,
    comment: "Enjoy jungle safaris, canoe rides, Tharu cultural performances, bird watching, and wildlife adventures in Chitwan National Park.",
    date: "3 Days / 2 Nights",
    platform: "Wildlife Package"
  },
  {
    name: "Rara Lake Escape",
    country: "Karnali Province",
    rating: 5,
    comment: "Relax beside Nepal's largest freshwater lake while enjoying peaceful nature, hiking, and stunning mountain scenery.",
    date: "5 Days / 4 Nights",
    platform: "Nature Package"
  },
  {
    name: "Upper Mustang Expedition",
    country: "Gandaki Province",
    rating: 5,
    comment: "Discover the ancient Himalayan kingdom, explore centuries-old monasteries, caves, and unique desert landscapes.",
    date: "7 Days / 6 Nights",
    platform: "Adventure Package"
  },
  {
    name: "Ilam Tea Garden Tour",
    country: "Koshi Province",
    rating: 4,
    comment: "Enjoy refreshing tea gardens, scenic hills, sunrise viewpoints, and the peaceful beauty of eastern Nepal.",
    date: "3 Days / 2 Nights",
    platform: "Nature Package"
  }
];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-blue-900/80 to-indigo-900/85"></div>
      
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
      
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-4 text-5xl md:text-7xl font-extrabold">
      
            <img
              src={logo}
              alt="Nepal Trip Planner Logo"
              className="h-16 md:h-20 w-auto"
              style={{
                 filter: "drop-shadow(4px 4px 8px rgba(0,0,0,.8))",
             }}
            />
      
            <span className="text-white">
               Trip Planner
            </span>
      
          </h1>
      
          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-2xl text-blue-100 leading-relaxed">
            Explore the beauty of Nepal with our expertly curated 
            <span className="text-yellow-300 font-semibold">
             {" "}  Featured Tour Packages
            </span>
            , offering memorable experiences, comfortable accommodations, guided tours, and well-planned itineraries for every traveler.
              </p>
      
          {/* Buttons */}
      
          <div className="mt-10 flex flex-wrap justify-center gap-5">
      
            <button className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-full font-semibold hover:bg-yellow-300 transition shadow-xl hover:scale-105">
               Explore Our Popular Tour Packages
            </button>
      
            <button className="px-8 py-4 border border-white rounded-full hover:bg-white hover:text-blue-900 transition">
              Plan Your Trip
            </button>
      
          </div>
      
          {/* Statistics */}
      
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
      
            <div className="p-6">
              <h2 className="text-3xl font-bold text-yellow-400">7</h2>
              <p>Provinces</p>
            </div>
      
            <div className="p-6">
              <h2 className="text-3xl font-bold text-yellow-400">100+</h2>
              <p>Tourist Destinations</p>
            </div>
      
            <div className="p-6">
              <h2 className="text-3xl font-bold text-yellow-400">20+</h2>
              <p>Tour Packages</p>
            </div>
      
            <div className="p-6">
              <h2 className="text-3xl font-bold text-yellow-400">24/7</h2>
              <p>Customer Support</p>
            </div>
      
          </div>
      
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">About the Project</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
            Discover <span className="text-blue-600">Nepal</span> with Confidence
          </h2>
          <div className="space-y-4 text-gray-600 max-w-3xl mx-auto">
            <p className="leading-relaxed">
               Our Nepal Tour Package Planner is designed to help travellers discover
                the country's most beautiful destinations through carefully planned tour
                packages. From breathtaking mountain landscapes to rich cultural heritage,
                the platform offers travel experiences for every type of traveller.
            
            </p>
            <p className="leading-relaxed">
               Users can explore a variety of tour packages, compare destinations,
                view package details, and plan memorable trips with ease. The platform
                provides a simple and user-friendly experience for planning holidays
                 across Nepal.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <FaAward className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Comprehensive Tourist Information</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <FaShieldAlt className="text-green-600" />
              <span className="text-sm font-medium text-gray-700"> Safe & Reliable Travel</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
              <FaClock className="text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">Verified Tour Packages</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Featured Tour Packages</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Explore Our Popular Tour Packages</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                 Choose from our carefully designed tour packages that combine Nepal's natural beauty, cultural heritage, adventure, and unforgettable travel experiences.
            </p>
          </div>
          </div> 

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {tourPackages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6"
              >
          <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
            {pkg.name.charAt(0)}
          </div>

          <div>
            <div className="font-semibold text-gray-900 text-sm">
              {pkg.name}
            </div>
            <div className="text-xs text-gray-500">
              {pkg.country}
            </div>
            </div>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
              <FaStar
              key={i}
              className={i < pkg.rating ? "text-yellow-400" : "text-gray-300"}
              size={14}
             />
           ))}
           </div>
           </div>

           <p className="text-gray-600 text-sm leading-relaxed">
            {pkg.comment}
          </p>

          <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {pkg.platform}
            </span>

            <span className="font-medium">
            {pkg.date}
            </span>
          </div>
         </div>
         ))}
         </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-6 bg-gray-50 px-6 py-3 rounded-full">
             <div className="text-center mt-10">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                View All Tour Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Get In Touch</h2>
            <p className="text-gray-600 mt-4">
              Have questions? We're here to help! Reach out to us through any of the channels below.
            </p>
          </div>

          {/* Contact Info Cards - Centered */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900">Our Office</h4>
              <p className="text-sm text-gray-600 mt-1">New Baneshwor-10, Kathmandu, Nepal</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaPhone className="text-green-600 text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900">Call Us</h4>
              <p className="text-sm text-gray-600 mt-1">+977 9843021763</p>
              <p className="text-xs text-gray-400">+977-1-4790064 (Landline)</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaRobot className="text-purple-600 text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900">Email Us</h4>
              <p className="text-sm text-gray-600 mt-1">support@NepalTripPlanners.com</p>
              <p className="text-xs text-gray-400">WhatsApp: +977 9843021763</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaUser className="inline mr-2" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaRobot className="inline mr-2" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaPhoneAlt className="inline mr-2" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaGlobe className="inline mr-2" /> Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaCompass className="inline mr-2" /> Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>General Inquiry</option>
                  <option>Tour Booking</option>
                  <option>Custom Itinerary</option>
                  <option>Group Travel</option>
                  <option>Corporate Travel</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaFileAlt className="inline mr-2" /> Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Email →'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutContact;
