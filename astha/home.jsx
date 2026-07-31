import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

// ==========================================================
// === EXACT LOCAL ASSET IMPORTS =============================
// ==========================================================
import boudhaImage from '../assets/boudha.jpg';
import chitwanImage from '../assets/chitwan.jpg';
import mustangImage from '../assets/mustang.jpg';
import pokharaImage from '../assets/pokhara.jpg';
import sagarmathaImage from '../assets/sagarmatha.jpg';

// ==========================================================
// === PACKAGES (2 boxes) ======================================
// ==========================================================
const packages = [
  { name: "EXPLORE PACKAGES", image: mustangImage },
  { name: "EXPLORE DESTINATION", image: pokharaImage },
];

// ==========================================================
// === HERO SLIDESHOW IMAGES ===================================
// ==========================================================
const slideshowImages = [
  {
    id: 1,
    image: boudhaImage,
    title: 'Boudhanath Stupa',
    subtitle: 'Ancient Buddhist Pilgrimage Site'
  },
  {
    id: 2,
    image: sagarmathaImage,
    title: 'Mount Everest',
    subtitle: 'Sagarmatha - The Roof of the World'
  },
  {
    id: 3,
    image: pokharaImage,
    title: 'Pokhara Valley',
    subtitle: 'Peaceful Lakes & Himalayan Views'
  },
  {
    id: 4,
    image: mustangImage,
    title: 'Mustang',
    subtitle: 'The Forbidden Kingdom of Nepal'
  },
  {
    id: 5,
    image: chitwanImage,
    title: 'Chitwan Safari',
    subtitle: 'Wildlife Encounters in the Jungle'
  }
];

const TourCard = ({ tour, onClick }) => (
  <div
    onClick={onClick}
    className="group relative h-[340px] rounded-xl overflow-hidden shadow-lg cursor-pointer border border-gray-200"
  >
    <img
      src={tour.image}
      alt={tour.name}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
    />
    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-300" />
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <h3 className="text-white text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-center drop-shadow-lg">
        {tour.name}
      </h3>
    </div>
  </div>
);

// ==========================================================
// === MAIN HOME PAGE ========================================
// ==========================================================
export default function Home() {
  const navigate = useNavigate();
  const [floatingMouse, setFloatingMouse] = useState({ x: 0, y: 0 });

  // Hero slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setFloatingMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  return (
    <div className="font-sans antialiased text-[#1F2937] bg-white selection:bg-[#1E88E5]/20 selection:text-[#0F4C81] overflow-x-hidden">

      {/* ================= HERO SLIDESHOW SECTION ================= */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {/* Slides */}
        {slideshowImages.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-4">
                <h2 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-200">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slideshowImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= PACKAGES ================= */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-3 tracking-tight">Packages</h2>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto font-light">Curated, all-inclusive travel packages built for every kind of explorer — private and fully customizable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <TourCard
                key={pkg.name}
                tour={pkg}
                onClick={() => navigate('/GeoJango_Map')}
              />
            ))}
          </div>
        </div>
      </section>

    
      {/* ================= GLOBAL CSS ANIMATIONS ================= */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in forwards;
        }
      `}</style>
    </div>
  );
}
