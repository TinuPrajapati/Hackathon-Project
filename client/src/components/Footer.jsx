import React, { useState } from 'react';
import { Brain, Mail, Phone, MapPin } from 'lucide-react';


const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { email, message });
    setEmail('');
    setMessage('');
  };

  return (
    <footer className="bg-gradient-to-b from-purple-100 to-white text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Slogan */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-purple-800">BrainSquads</span>
            </div>
            <p className="text-sm text-gray-600">
              Revolutionizing teamwork with AI-powered matching, building dream teams that ignite creativity, conquer challenges, and turn bold ideas into extraordinary realities.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-800">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-purple-500" />
                <span>hello@brainsqauds.space</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-purple-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                <span>123 Innovation Street, Tech Valley</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-purple-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  required
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-purple-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-purple-200 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} BrainSquads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
