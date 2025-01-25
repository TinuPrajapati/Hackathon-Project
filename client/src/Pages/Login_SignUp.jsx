import React, { useState } from 'react';
import axios from 'axios';
import logImg from '../assets/log.svg';
import registerImg from '../assets/register.svg';

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup
      ? `${process.env.REACT_APP_API_URL}/api/register`
      : `${process.env.REACT_APP_API_URL}/api/login`;

    try {
      if (isSignup) {
        await axios.post(url, { name, email, password, role: 'user' });
        alert('User registered successfully');
        setName('');
        setEmail('');
        setPassword('');
        window.location.href = '/dashboard';
      } else {
        const response = await axios.post(url, { email, password });
        sessionStorage.setItem('token', response.data.token);
        alert('Login successful');
        setEmail('');
        setPassword('');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      alert('Error submitting form');
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={`relative w-full min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden transition-all ${isSignup ? 'bg-gradient-to-r from-blue-900 to-red-500' : ''}`}>
      <div className="relative flex w-full max-w-5xl shadow-lg bg-white rounded-lg">
        {/* Form Section */}
        <div className={`flex-1 p-10 transition-all duration-700 ${isSignup ? 'order-2' : ''}`}>
          <form
            className="flex flex-col items-center space-y-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-bold text-gray-800">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </h2>

            {isSignup && (
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required={isSignup}
                />
              </div>
            )}

            <div className="relative w-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative w-full">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Panel Section */}
        <div
          className={`hidden md:flex flex-1 flex-col items-center justify-center space-y-6 transition-all duration-700 ${
            isSignup ? 'order-1' : ''
          }`}
        >
          <img
            src={isSignup ? registerImg : logImg}
            alt="Illustration"
            className="w-2/3"
          />
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-700">
              {isSignup ? 'One of us?' : 'New here?'}
            </h3>
            <p className="text-gray-500">
              {isSignup
                ? 'Sign in to access your account.'
                : 'Sign up to explore more features.'}
            </p>
          </div>
          <button
            onClick={toggleMode}
            className="px-6 py-3 text-sm font-semibold text-blue-500 bg-white border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
