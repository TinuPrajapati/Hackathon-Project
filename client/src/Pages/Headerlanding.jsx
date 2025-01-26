import React from "react";

const Headerlanding = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-8" />
        </div>

        {/* Hamburger menu for mobile */}
        <div className="block lg:hidden">
          <button className="text-white">
            <span className="block w-6 h-1 bg-white mb-2"></span>
            <span className="block w-6 h-1 bg-white mb-2"></span>
            <span className="block w-6 h-1 bg-white"></span>
          </button>
        </div>

        {/* Links (Desktop version) */}
        <nav className="hidden lg:flex space-x-6">
          <a href="#home" className="text-white    font-bold p-2 rounded-lg hover:bg-yellow-300 hover:text-purple-500 hover:border hover:border-2 hover:border-white">Home</a>
          <a href="#about" className="text-white   font-bold p-2 rounded-lg hover:bg-yellow-300 hover:text-purple-500 hover:border hover:border-2 hover:border-white">About</a>
          <a href="#contact" className="text-white font-bold p-2 rounded-lg hover:bg-yellow-300 hover:text-purple-500 hover:border hover:border-2 hover:border-white">Contact</a>
        </nav>

        {/* Get Started Button */}
        <button className="bg-transparent border border-2 border-white text-white px-6 py-2 rounded-md hover:bg-yellow-300 hover:text-purple-500 transition duration-200 hidden lg:block">
          Get Started
        </button>
      </div>

      {/* Mobile Navigation (Hidden on large screens) */}
      <div className="lg:hidden mt-4 bg-black bg-opacity-50 p-4">
        <nav className="flex flex-col space-y-4 text-center">
          <a href="#home" className="text-white hover:text-gray-300">Home</a>
          <a href="#about" className="text-white hover:text-gray-300">About</a>
          <a href="#contact" className="text-white hover:text-gray-300">Contact</a>
          <button className="bg-transparent text-white px-6 py-2 rounded-md hover:bg-yellow-300 transition duration-200">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Headerlanding;
