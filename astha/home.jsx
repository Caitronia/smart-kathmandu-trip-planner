import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMapMarkedAlt, 
  FaUserFriends, FaHeadset, FaArrowRight, 
  FaSun, FaHotel, FaRoute, FaUserTie,
  FaChartLine, FaPlane
} from 'react-icons/fa';

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

const AnimatedCounter = ({ target, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);
  return <span className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
};

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

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E88E5]/5 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0F4C81]/5 rounded-full blur-3xl opacity-50 -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-[#1F2937] mb-3 tracking-tight">Why Choose Trip Planner</h2>
            <p className="text-[#6B7280] text-lg font-light">Built for the modern explorer. We fuse AI intelligence with hyper-local expertise to simplify your journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaChartLine className="text-[#1E88E5]" />, title: "AI Trip Planning", desc: "Machine learning algorithms craft itineraries perfectly matched to your travel style and pace." },
              { icon: <FaHotel className="text-[#0F4C81]" />, title: "Hotel Recommendation", desc: "Hand-picked luxury, boutique, and traditional accommodations based on your preferences." },
              { icon: <FaSun className="text-yellow-500" />, title: "Weather Forecast", desc: "Hyper-accurate, high-altitude weather modeling to ensure you pack perfectly for the peaks." },
              { icon: <FaRoute className="text-red-500" />, title: "Route Optimization", desc: "Intelligent pathfinding helps you avoid traffic and maximize your exploration time." },
              { icon: <FaUserTie className="text-indigo-500" />, title: "Local Guides", desc: "Connect with verified, vetted native experts who know the hidden gems of Nepal." },
            ].map((feature, i) => (
              <div key={i} className="group bg-white/60 backdrop-blur-xl p-10 rounded-2xl shadow-lg border border-gray-100/80 hover:shadow-2xl hover:border-[#1E88E5]/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#F8FAFC] backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">{feature.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="py-20 bg-[#0F4C81] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          {[
            { target: 500, label: "Destinations", icon: <FaMapMarkedAlt /> },
            { target: 10000, label: "Happy Travelers", icon: <FaUserFriends /> },
            { target: 1500, label: "Trips Planned", icon: <FaPlane /> },
            { target: 247, label: "Support Hours", icon: <FaHeadset /> },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="text-4xl text-[#1E88E5] mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:text-white">
                {stat.icon}
              </div>
              <span className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight">
                {stat.target === 247 ? "24/7" : <AnimatedCounter target={stat.target} suffix={stat.target === 247 ? "" : "+"} />}
              </span>
              <span className="text-blue-200/70 text-sm font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative py-32 overflow-hidden bg-[#0F4C81]">
        <div className="absolute inset-0 opacity-30">
          <img src={mustangImage} alt="Nepal Adventure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C81]/90 via-[#0F4C81]/60 to-black/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-5 drop-shadow-2xl tracking-tight">Ready to Start Planning?</h2>
          <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto font-light">Join thousands of explorers. Create your personalized, AI-powered Nepal itinerary in minutes.</p>
          <button onClick={() => navigate('/GeoJango_Map')} className="px-10 py-4 bg-white text-[#0F4C81] rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl shadow-white/20 flex items-center gap-3 mx-auto">
            Start Planning <FaArrowRight size={16} />
          </button>
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
