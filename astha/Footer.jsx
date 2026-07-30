// src/Components/Footer.js
import { useNavigate, Link } from 'react-router-dom';
import { FaGithub, FaEnvelope, FaInstagram, FaLinkedinIn} from "react-icons/fa";
import logo from '../assets/logo.png';

const Footer = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    // 🔐 Intercept protected link clicks if not logged in
    const handleProtectedClick = (e, path) => {
        if (!isLoggedIn) {
            e.preventDefault();
            navigate('/login');
        }
    };

    return (
        <footer 
            className="w-full bg-gray-800 text-gray-300 py-10 border-t border-gray-700" 
            role="contentinfo" 
            aria-label="Footer"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700 pb-8">

                    {/* Brand Section */}
                    {/* Brand Section */}
<div className="flex flex-col space-y-4">
    <div className="flex items-center gap-2">
        <img src={logo} alt="Trip Planner Logo" className="h-10 w-auto" />
        <h3 className="text-2xl font-bold text-blue-400">Trip Planner</h3>
    </div>
    <p className="text-sm text-gray-400">
        Your ultimate companion for exploring the incredible destinations of Nepal. 
        Plan smarter, travel better.
    </p>
    <div className="flex space-x-4 text-xl">
        <a href="mailto:your@email.com" className="hover:text-blue-400 transition-colors duration-200" aria-label="Email">
            <FaEnvelope />
        </a>
        <a href="https://github.com" className="hover:text-blue-400 transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
        </a>
        <a href="https://www.instagram.com" className="hover:text-blue-400 transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
        </a>
        <a href="https://www.linkedin.com" className="hover:text-blue-400 transition-colors duration-200" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
        </a>
    </div>
</div>
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    to="/plan" 
                                    onClick={(e) => handleProtectedClick(e, '/plan')} 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    Plan Your Trip
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/" 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    Discover Nepal
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/about" 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Destinations */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Popular Destinations</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    to="/" 
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    🏛️ Kathmandu
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/" 
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    🏔️ Pokhara
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/" 
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    🗻 Everest Base Camp
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/" 
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    🐘 Chitwan
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/" 
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    🏜️ Mustang
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support & Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
                        <ul className="space-y-2 mb-4">
                            <li>
                                <Link 
                                    to="/login" 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    Login / Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/" 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/" 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/" 
                                    className="hover:text-blue-400 transition-colors duration-200"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>

                        <h4 className="text-lg font-semibold text-white mb-3">Stay Updated</h4>
                        <p className="text-sm text-gray-400 mb-2">Get the latest travel tips.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-600 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-6">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Trip Planner. All rights reserved.
                    </p>
                    <div className="flex space-x-4 text-sm text-gray-400 mt-2 md:mt-0">
                        <Link to="/" className="hover:text-blue-400 transition-colors duration-200">Sitemap</Link>
                        <span>|</span>
                        <Link to="/" className="hover:text-blue-400 transition-colors duration-200">Accessibility</Link>
                        <span>|</span>
                        <Link to="/" className="hover:text-blue-400 transition-colors duration-200">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
