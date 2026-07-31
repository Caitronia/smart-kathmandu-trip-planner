import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DestinationCard from '../Components/DestinationCard';

// Import local images from src/assets/
import boudhaImage from '../assets/boudha.jpeg';
import chitwanImage from '../assets/chitwan.jpg';
import mustangImage from '../assets/mustangg.jpg';
import pokharaImage from '../assets/pokhara.jpg';
import sagarmathaImage from '../assets/sagarmatha.jpg';

// Nepal Destinations Data
const destinations = [
  {
    id: 1,
    name: 'Kathmandu',
    location: 'Kathmandu Valley',
    image: '🏛️',
    rating: 4.8,
    description: 'Capital City & Cultural Hub'
  },
  {
    id: 2,
    name: 'Pokhara',
    location: 'Gandaki Province',
    image: '🏔️',
    rating: 4.9,
    description: 'City of Lakes & Mountain Views'
  },
  {
    id: 3,
    name: 'Everest Base Camp',
    location: 'Solukhumbu',
    image: '🗻',
    rating: 4.9,
    description: "Gateway to the World's Highest Peak"
  },
  {
    id: 4,
    name: 'Lumbini',
    location: 'Rupandehi',
    image: '🕉️',
    rating: 4.7,
    description: 'Birthplace of Lord Buddha'
  },
  {
    id: 5,
    name: 'Chitwan',
    location: 'Chitwan District',
    image: '🐘',
    rating: 4.6,
    description: 'Wildlife & Jungle Safari'
  },
  {
    id: 6,
    name: 'Langtang Valley',
    location: 'Rasuwa District',
    image: '🏞️',
    rating: 4.5,
    description: 'Himalayan Trekking Paradise'
  },
  {
    id: 7,
    name: 'Bhaktapur',
    location: 'Kathmandu Valley',
    image: '🏘️',
    rating: 4.4,
    description: 'Ancient Newari Kingdom'
  },
  {
    id: 8,
    name: 'Mustang',
    location: 'Mustang District',
    image: '🏜️',
    rating: 4.6,
    description: 'The Forbidden Kingdom'
  },
  {
    id: 9,
    name: 'Ilam',
    location: 'Ilam District',
    image: '🍃',
    rating: 4.3,
    description: 'Tea Gardens & Scenic Hills'
  }
];

// Slideshow Images - USING LOCAL IMAGES FROM src/assets/
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

export default function Home() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [interests, setInterests] = useState({
    interested: [],
    notInterested: []
  });

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const handleInterestToggle = (id, status) => {
    setInterests(prev => {
      const newInterested = prev.interested.filter(i => i !== id);
      const newNotInterested = prev.notInterested.filter(i => i !== id);
      
      if (status === 'interested') {
        return { interested: [...newInterested, id], notInterested: newNotInterested };
      }
      if (status === 'not-interested') {
        return { interested: newInterested, notInterested: [...newNotInterested, id] };
      }
      return { interested: newInterested, notInterested: newNotInterested };
    });
  };

  const filteredDestinations = destinations.filter(dest => {
    if (filter === 'Interested') {
      return interests.interested.includes(dest.id);
    }
    if (filter === 'Not Interested') {
      return interests.notInterested.includes(dest.id);
    }
    return true; // 'All' filter
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slideshow Section */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Discover Nepal 🌏
          </h2>
          <p className="text-gray-600 text-lg">
            Plan your perfect adventure with AI-powered recommendations
          </p>
        </div>

        {/* Filter Buttons - Only All, Interested, Not Interested */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setFilter('All')}
            className={`px-6 py-2 rounded-full transition ${
              filter === 'All' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({destinations.length})
          </button>
          
          <button
            onClick={() => setFilter('Interested')}
            className={`px-6 py-2 rounded-full transition ${
              filter === 'Interested' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Interested ({interests.interested.length})
          </button>
          
          <button
            onClick={() => setFilter('Not Interested')}
            className={`px-6 py-2 rounded-full transition ${
              filter === 'Not Interested' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Not Interested ({interests.notInterested.length})
          </button>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onInterestToggle={handleInterestToggle}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/plan')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            🚀 Start Planning Your Nepal Trip
          </button>
        </div>
      </div>
    </div>
  );
}