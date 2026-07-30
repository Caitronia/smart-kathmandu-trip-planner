import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaSearch, FaHeart, FaStar, FaPlane, FaMapMarkedAlt, 
  FaMountain, FaTree, FaLandmark, FaPray, FaSpa, FaUsers, FaRing, 
  FaChartLine, FaCheckCircle, FaUserFriends, FaHeadset, FaArrowRight, 
  FaBars, FaTimes, FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaGlobe,
  FaCalendarAlt, FaWallet, FaCompass, FaSun, FaHotel, FaRoute, FaUserTie
} from 'react-icons/fa';
import { GiHiking, GiElephant, GiCampingTent } from 'react-icons/gi';

// ==========================================================
// === EXACT LOCAL ASSET IMPORTS =============================
// ==========================================================
import boudhaImage from '../assets/boudha.jpg';
import chitwanImage from '../assets/chitwan.jpg';
import mustangImage from '../assets/mustang.jpg';
import pokharaImage from '../assets/pokhara.jpg';
import sagarmathaImage from '../assets/sagarmatha.jpg';

// ==========================================================
// === MOCK API INTEGRATION ==================================
// ==========================================================
const api = {
  getDestinations: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Kathmandu Valley", location: "Bagmati Province", rating: 4.8, price: "NPR 9,500", duration: "5 Days", season: "Autumn & Spring", image: boudhaImage, desc: "Immerse yourself in millennia-old architecture, vibrant culture, and sacred stupas." },
          { id: 2, name: "Pokhara", location: "Gandaki Province", rating: 4.9, price: "NPR 7,200", duration: "4 Days", season: "Year-round", image: pokharaImage, desc: "A serene lakeside retreat offering breathtaking panoramic views of the majestic Annapurna range." },
          { id: 3, name: "Chitwan", location: "Bagmati Province", rating: 4.6, price: "NPR 6,500", duration: "3 Days", season: "Winter & Spring", image: chitwanImage, desc: "Experience thrilling jungle safaris and close encounters with endangered rhinos and tigers." },
          { id: 4, name: "Mustang", location: "Gandaki Province", rating: 4.7, price: "NPR 22,000", duration: "12 Days", season: "Summer & Autumn", image: mustangImage, desc: "The mystical 'Forbidden Kingdom', featuring ancient cave monasteries and lunar-like landscapes." },
        ]);
      }, 1200);
    });
  }
};

// ==========================================================
// === REUSABLE HOOKS & UTILITIES ============================
// ==========================================================
const useDataFetching = (fetchFn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchFn()
      .then(res => { if (isMounted) setData(res); })
      .catch(err => { if (isMounted) setError(err); })
      .finally(() => { if (isMounted) setIsLoading(false); });
    return () => { isMounted = false; };
  }, [fetchFn]);

  return { data, isLoading, error };
};

// ==========================================================
// === SUB-COMPONENTS ========================================
// ==========================================================
const StarRating = memo(({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-200"} size={14} />
    ))}
    <span className="text-xs font-bold text-gray-700 ml-1.5 tracking-tight">{rating.toFixed(1)}</span>
  </div>
));

const DestinationCard = memo(({ dest }) => {
  const navigate = useNavigate();
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out hover:-translate-y-2 border border-gray-100/80">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
        <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-rose-500 hover:bg-white shadow-sm transition-all duration-200 hover:scale-105">
          <FaHeart size={16} />
        </button>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 pt-12">
          <div className="flex justify-between items-end text-white">
            <div className="flex flex-col">
              <span className="text-xs font-medium tracking-wide uppercase opacity-90">{dest.location}</span>
              <div className="flex items-center gap-2 mt-1 text-xs opacity-80">
                <FaCalendarAlt size={12} /> {dest.duration}
              </div>
            </div>
            <div className="text-xs font-medium bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="opacity-70">Best:</span> {dest.season}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">{dest.name}</h3>
          <StarRating rating={dest.rating} />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 h-10 mb-5">{dest.desc}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100/80">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Starting from</span>
            <span className="text-lg font-bold text-gray-900">{dest.price}</span>
          </div>
          <button 
            onClick={() => navigate('/GeoJango_Map')}
            className="inline-flex items-center gap-2 bg-[#0F4C81] text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#1E88E5] hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Explore <FaArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
});

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [floatingMouse, setFloatingMouse] = useState({ x: 0, y: 0 });
  const destinationsRef = useRef(null);

  const { data: destinations, isLoading: destLoading, error: destError } = useDataFetching(api.getDestinations);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleScrollToDestinations = useCallback((e) => {
    e.preventDefault();
    destinationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="font-sans antialiased text-[#1F2937] bg-white selection:bg-[#1E88E5]/20 selection:text-[#0F4C81] overflow-x-hidden">
      
      {/* ================= 1. PREMIUM HERO SECTION ================= */}
      <section className="relative h-screen min-h-[700px] pt-20 flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 transform transition-transform duration-700 ease-out" style={{ transform: `translate(${floatingMouse.x * -0.02}px, ${floatingMouse.y * -0.02}px)` }}>
          <img src={sagarmathaImage} alt="Mount Everest Landscape" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>
        </div>

        <div className="absolute top-1/4 right-10 md:right-20 z-10 w-24 h-24 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-10 md:left-20 z-10 w-16 h-16 bg-blue-500/20 backdrop-blur-2xl rounded-full border border-white/10 animate-pulse hidden lg:block"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full animate-fade-in-up">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 mb-6 shadow-lg">
              <FaGlobe className="text-[#1E88E5]" /> Unlock the Himalayas
            </span>
            
            {/* Reduced Font Sizes for Presentable, Smaller Hero */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl mb-4">
              Explore Nepal <br /> Beyond Your Imagination
            </h1>
            
            <p className="text-base md:text-lg text-gray-300 max-w-lg mb-8 font-light leading-relaxed drop-shadow-lg">
              Discover breathtaking mountains, ancient heritage, unforgettable adventures, and personalized travel experiences across Nepal.
            </p>

            {/* Professional Search Bar with Real Nepal Destinations */}
            <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl shadow-2xl max-w-4xl flex flex-col md:flex-row gap-4 border border-white/20 mb-8 relative">
              <div className="flex-1 flex flex-col bg-white/10 rounded-xl px-4 py-2 border border-white/10 focus-within:border-[#1E88E5] transition-colors">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Destination</span>
                <select className="bg-transparent w-full outline-none text-white text-sm font-medium cursor-pointer appearance-none">
                  <option className="text-[#1F2937]">Kathmandu</option>
                  <option className="text-[#1F2937]">Pokhara</option>
                  <option className="text-[#1F2937]">Chitwan</option>
                  <option className="text-[#1F2937]">Mustang</option>
                  <option className="text-[#1F2937]">Everest Region</option>
                  <option className="text-[#1F2937]">Lumbini</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col bg-white/10 rounded-xl px-4 py-2 border border-white/10 focus-within:border-[#1E88E5] transition-colors">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Travel Date</span>
                <input type="text" placeholder="Select date" className="bg-transparent w-full outline-none text-white placeholder-gray-400/80 text-sm font-medium" />
              </div>
              <div className="flex-1 flex flex-col bg-white/10 rounded-xl px-4 py-2 border border-white/10 focus-within:border-[#1E88E5] transition-colors">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Duration</span>
                <select className="bg-transparent w-full outline-none text-white text-sm font-medium cursor-pointer appearance-none">
                  <option className="text-[#1F2937]">3-5 Days</option>
                  <option className="text-[#1F2937]">6-10 Days</option>
                  <option className="text-[#1F2937]">11+ Days</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col bg-white/10 rounded-xl px-4 py-2 border border-white/10 focus-within:border-[#1E88E5] transition-colors">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Budget</span>
                <select className="bg-transparent w-full outline-none text-white text-sm font-medium cursor-pointer appearance-none">
                  <option className="text-[#1F2937]">NPR 5,000 - 15,000</option>
                  <option className="text-[#1F2937]">NPR 15,000 - 35,000</option>
                  <option className="text-[#1F2937]">NPR 35,000+</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col bg-white/10 rounded-xl px-4 py-2 border border-white/10 focus-within:border-[#1E88E5] transition-colors">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Travel Type</span>
                <select className="bg-transparent w-full outline-none text-white text-sm font-medium cursor-pointer appearance-none">
                  <option className="text-[#1F2937]">Adventure</option>
                  <option className="text-[#1F2937]">Cultural</option>
                  <option className="text-[#1F2937]">Trekking</option>
                  <option className="text-[#1F2937]">Luxury</option>
                </select>
              </div>
              <button className="bg-[#0F4C81] hover:bg-[#1E88E5] text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-[#0F4C81]/40 flex items-center justify-center gap-2 self-center md:self-auto">
                <FaSearch size={14} /> Search
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button onClick={() => navigate('/GeoJango_Map')} className="px-7 py-3 bg-white text-[#0F4C81] rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl shadow-white/10">
                Plan My Trip
              </button>
              <button onClick={() => navigate('/GeoJango_Map')} className="px-7 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium hover:bg-white/20 transition-all flex items-center gap-2 group">
                Explore Destinations <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-3 text-white/30">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* ================= 2. FEATURED DESTINATIONS GRID ================= */}
      <section ref={destinationsRef} className="py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-3 tracking-tight">Exclusive Destinations</h2>
              <p className="text-[#6B7280] text-lg max-w-lg font-light">Hand-picked experiences showcasing the breathtaking diversity of Nepal's landscapes and culture.</p>
            </div>
            <button onClick={() => navigate('/GeoJango_Map')} className="text-sm font-semibold text-[#0F4C81] hover:text-[#1E88E5] transition-colors flex items-center gap-2 group border-b border-transparent hover:border-[#0F4C81] pb-1 cursor-pointer">
              View all destinations <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {destLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 h-[450px] animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-16 bg-gray-100 rounded mt-4"></div>
                    <div className="h-10 bg-gray-200 rounded mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {destError && (
            <div className="text-center py-16 text-red-500 bg-red-50/50 rounded-2xl border border-red-100 backdrop-blur-sm">
              <p className="font-medium">Failed to load destinations.</p>
              <p className="text-sm mt-2 text-red-400">Please refresh the page.</p>
            </div>
          )}

          {!destLoading && !destError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {destinations.map(dest => <DestinationCard key={dest.id} dest={dest} />)}
            </div>
          )}
        </div>
      </section>

      {/* ================= 3. WHY CHOOSE US ================= */}
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
              { icon: <FaWallet className="text-[#16A34A]" />, title: "Budget Calculator", desc: "Real-time expense tracking and smart currency conversion for absolute financial peace of mind." },
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

      {/* ================= 4. TRAVEL CATEGORIES ================= */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#1F2937] mb-14 tracking-tight">Curated Travel Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Adventure", gradient: "from-[#1E88E5] to-[#0F4C81]", icon: <GiCampingTent /> },
              { name: "Trekking", gradient: "from-[#16A34A] to-emerald-600", icon: <GiHiking /> },
              { name: "Wildlife", gradient: "from-yellow-500 to-amber-600", icon: <GiElephant /> },
              { name: "Heritage", gradient: "from-amber-600 to-yellow-600", icon: <FaLandmark /> },
              { name: "Pilgrimage", gradient: "from-indigo-500 to-purple-600", icon: <FaPray /> },
              { name: "Luxury", gradient: "from-pink-500 to-rose-600", icon: <FaSpa /> },
              { name: "Family", gradient: "from-[#1E88E5] to-cyan-500", icon: <FaUsers /> },
              { name: "Honeymoon", gradient: "from-purple-500 to-pink-500", icon: <FaRing /> },
            ].map((cat) => (
              <div key={cat.name} className={`relative group h-44 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="text-4xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{cat.icon}</div>
                  <span className="font-semibold text-base tracking-wide">{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. STATISTICS ================= */}
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

      {/* ================= 6. CALL TO ACTION ================= */}
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

      {/* ================= 7. PROFESSIONAL FOOTER ================= */}
      <footer className="bg-[#F8FAFC] pt-20 pb-8 border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="font-bold text-lg text-[#0F4C81] tracking-tight mb-4 block">Trip Planner</Link>
              <p className="text-sm text-[#6B7280] leading-relaxed font-light">Redefining how the world experiences the majestic landscapes of Nepal.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-5">Company</h4>
              <ul className="space-y-3 text-sm text-[#6B7280] font-light">
                <li><Link to="/about" className="hover:text-[#0F4C81] transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-[#0F4C81] transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-[#0F4C81] transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-5">Quick Links</h4>
              <ul className="space-y-3 text-sm text-[#6B7280] font-light">
                <li><Link to="/packages" className="hover:text-[#0F4C81] transition-colors">Packages</Link></li>
                <li><Link to="/GeoJango_Map" className="hover:text-[#0F4C81] transition-colors">Destinations</Link></li>
                <li><Link to="/GeoJango_Map" className="hover:text-[#0F4C81] transition-colors">Plan a Trip</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-5">Support</h4>
              <ul className="space-y-3 text-sm text-[#6B7280] font-light">
                <li><Link to="/faq" className="hover:text-[#0F4C81] transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-[#0F4C81] transition-colors">Contact Support</Link></li>
                <li><Link to="/privacy" className="hover:text-[#0F4C81] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-5">Connect</h4>
              <div className="flex gap-5 text-[#6B7280] mb-5">
                <a href="#" className="hover:text-[#0F4C81] transition-colors"><FaFacebook size={20} /></a>
                <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram size={20} /></a>
                <a href="#" className="hover:text-sky-500 transition-colors"><FaTwitter size={20} /></a>
                <a href="#" className="hover:text-red-600 transition-colors"><FaYoutube size={20} /></a>
              </div>
              <div className="text-sm text-[#6B7280] font-light space-y-1">
                <p>hello@tripplanner.com</p>
                <p>+977-1-555-1234</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#6B7280] font-light">
            <p>&copy; {new Date().getFullYear()} Trip Planner. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <Link to="/terms" className="hover:text-[#1F2937] transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-[#1F2937] transition-colors">Privacy</Link>
              <Link to="/cookies" className="hover:text-[#1F2937] transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= GLOBAL CSS ANIMATIONS ================= */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
