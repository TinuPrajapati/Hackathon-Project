import React from "react";
import background from '../assets/background.png'
import char from '../assets/OIP.png'
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="px-30 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 flex items-center justify-between h-screen p-16 rounded-none shadow-xl">
      <div className="flex flex-col items-start space-y-6 max-w-xl">
        <h1 className="text-6xl font-extrabold text-white leading-tight">
          <span className="text-yellow-300">CONNECT</span> and 
          <br /> 
          <span className="text-yellow-300">COLLABORATE</span> to 
          <br /> 
          <span className="text-yellow-300">CONQUER</span> Your Goals
        </h1>
        <p className="text-xl text-white opacity-80 max-w-lg">
          Discover endless opportunities for collaboration and growth. Join our platform to connect with like-minded individuals and unlock your potential.
        </p>
        <Link to="/login" className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105" style={{  backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          Get Started
        </Link>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img
          src={char}
          alt="Placeholder"
          className="rounded-lg transform hover:scale-105 transition duration-300 ease-in-out animate-bounce"
        />
      </div>
    </div>
  );
};

export default Index;
