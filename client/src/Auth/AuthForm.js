import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
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
    <div className={`container ${isSignup ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn solid">Login</button>
          </form>

          <form className="sign-up-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignup}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">Sign Up</button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Welcome to our platform! Sign up to explore more.</p>
            <button className="btn transparent" onClick={toggleMode}>
              Sign up
            </button>
          </div>
          <img src={logImg} className="image" alt="Sign Up" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>If you already have an account, just sign in.</p>
            <button className="btn transparent" onClick={toggleMode}>
              Sign in
            </button>
          </div>
          <img src={registerImg} className="image" alt="Sign In" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
