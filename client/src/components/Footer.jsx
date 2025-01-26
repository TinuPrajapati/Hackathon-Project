import React, { useState } from 'react';

function Footer() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Message submitted:', message);
    setMessage('');
  };

  return (
    <footer className="bg-[#f5f0ff] mt-10 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Slogan */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-[#8b5cf6] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <span className="ml-2 text-2xl font-bold text-[#8b5cf6]">TeamBuild</span>
            </div>
            <p className="text-gray-600">Building dream teams with AI-powered matching</p>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-[#8b5cf6]">Connect With Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-[#8b5cf6]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#8b5cf6]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#8b5cf6]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18.6h-2.472v-3.9c0-.923-.018-2.11-1.287-2.11-1.29 0-1.487 1.005-1.487 2.043v3.967H9.297V9.6h2.376v1.09h.033c.33-.627 1.14-1.29 2.347-1.29 2.51 0 2.97 1.65 2.97 3.8v4.4zM7.332 8.51a1.433 1.433 0 11.001-2.867 1.433 1.433 0 01-.001 2.867zM5.595 18.6h3.475V9.6H5.595v9z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left text-[#8b5cf6]">Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
                  rows="4"
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#8b5cf6] text-white py-2 px-6 rounded-lg hover:bg-[#7c3aed] transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;