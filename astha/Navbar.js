// src/Components/Navbar.js - UPDATED WITH DROPDOWN
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-white/10 backdrop-blur-sm'
      } px-4 py-3`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className={`text-2xl font-bold flex items-center gap-0 transition-colors ${scrolled ? 'text-blue-600' : 'text-white drop-shadow-lg'}`}>
          <img src={logo} alt="Trip Planner Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`transition ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200 drop-shadow'}`}
          >
            Home
          </Link>
          
          {/* Plan Trip Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onMouseEnter={() => setIsDropdownOpen(true)}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1 transition ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200 drop-shadow'}`}
            >
              Plan Trip
              <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className={`absolute top-full left-0 mt-1 w-64 rounded-lg shadow-xl overflow-hidden ${
                  scrolled 
                    ? 'bg-white border border-gray-200' 
                    : 'bg-black/30 backdrop-blur-md border border-white/20'
                }`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  to="/explore-destination"
                  className={`flex items-center gap-3 px-4 py-3 transition ${
                    scrolled 
                      ? 'hover:bg-blue-50 text-gray-700' 
                      : 'hover:bg-white/20 text-white'
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-sm">Explore Destination</div>
                    <div className="text-xs opacity-70">Discover beautiful places to visit</div>
                  </div>
                </Link>
                
                <Link
                  to="/explore-packages"
                  className={`flex items-center gap-3 px-4 py-3 transition border-t ${
                    scrolled 
                      ? 'hover:bg-blue-50 text-gray-700 border-gray-100' 
                      : 'hover:bg-white/20 text-white border-white/10'
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <div className="font-semibold text-sm">Explore Packages</div>
                    <div className="text-xs opacity-70">View our curated tour packages</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link 
            to="/about" 
            className={`transition ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200 drop-shadow'}`}
          >
            About
          </Link>
          
          {user ? (
            <>
              <span className={`text-sm ${scrolled ? 'text-gray-600' : 'text-white drop-shadow'}`}>
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg transition ${
                  scrolled 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-red-500/80 text-white hover:bg-red-600 backdrop-blur-sm'
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-lg transition ${
                  scrolled 
                    ? 'text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:bg-white/20 drop-shadow'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`px-4 py-2 rounded-lg transition ${
                  scrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden focus:outline-none ${scrolled ? 'text-gray-700' : 'text-white'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden mt-4 pt-4 rounded-lg p-4 space-y-3 ${
          scrolled 
            ? 'bg-white border border-gray-200 shadow-lg' 
            : 'bg-black/30 backdrop-blur-md border border-white/20'
        }`}>
          <Link 
            to="/" 
            className={`block transition ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          {/* Mobile Plan Trip with submenu */}
          <div className="space-y-2">
            <div className={`font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}>Plan Trip</div>
            <div className="pl-4 space-y-2">
              <Link 
                to="/explore-destination" 
                className={`block text-sm transition ${scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/80 hover:text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                • Explore Destination
              </Link>
              <Link 
                to="/explore-packages" 
                className={`block text-sm transition ${scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/80 hover:text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                • Explore Packages
              </Link>
            </div>
          </div>

          <Link 
            to="/about" 
            className={`block transition ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          
          {user ? (
            <>
              <span className={`block text-sm ${scrolled ? 'text-gray-600' : 'text-white'}`}>
                {user.displayName || user.email}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  scrolled 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-red-500/80 text-white hover:bg-red-600'
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`block px-4 py-2 rounded-lg transition ${
                  scrolled 
                    ? 'text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`block px-4 py-2 rounded-lg transition text-center ${
                  scrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}