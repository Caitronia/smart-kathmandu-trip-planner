// src/Components/Navbar.js - CORRECTED VERSION
import React, { useState, useEffect } from 'react';
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
        <Link to="/" className={`text-2xl font-bold flex items-center gap-2 transition-colors ${scrolled ? 'text-blue-600' : 'text-white drop-shadow-lg'}`}>
          <img src={logo} alt="Trip Planner Logo" className="h-16 w-auto" />
          <span>Trip Planner</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`transition ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200 drop-shadow'}`}
          >
            Home
          </Link>
          <Link 
            to="/plan" 
            className={`transition ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200 drop-shadow'}`}
          >
            Plan Trip
          </Link>
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
          <Link 
            to="/plan" 
            className={`block transition ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Plan Trip
          </Link>
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
