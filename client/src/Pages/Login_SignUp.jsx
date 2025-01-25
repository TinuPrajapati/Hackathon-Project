import React, { useState } from 'react';
import axios from 'axios';
import logImg from '../assets/log.svg';
import registerImg from '../assets/register.svg';
import Input from '../components/Input';
import { CircleUser, KeyRound, Locate, Mail, Phone } from 'lucide-react';

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
    <div className={`container ${isSignup ? 'sign-up-mode' : ''}`} style={{fontFamily:`cursive`}}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <Input placeholder={"Enter your Email"} type="email" id="email" text="Email" icon={<Mail className='w-5 h-5' />} />
            <Input placeholder={"Enter your Password"} type="password" id="password" text="Password" icon={<KeyRound className='w-5 h-5' />} />
            <button type="submit" className="w-[20vw] h-12 rounded-md text-white bg-purple-400 text-lg font-semibold mt-4 active:scale-90">Login</button>
          </form>

          <form className="sign-up-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign up</h2>
            <Input placeholder={"Enter your Name"} type="text" id="text" text="Name" icon={<CircleUser className='w-5 h-5' />} />
            <Input placeholder={"Enter your Email"} type="email" id="email" text="Email" icon={<Mail className='w-5 h-5' />} />
            <Input placeholder={"Enter your Number"} type="number" id="number" text="Number" icon={<Phone className='w-5 h-5' />} />
            <Input placeholder={"Enter your Password"} type="password" id="password" text="Password" icon={<KeyRound className='w-5 h-5' />} />
            <Input placeholder={"Enter your Loaction [city,State]"} type="text" id="loaction" text="Loaction" icon={<Locate className='w-5 h-5' />} />
            <div className='flex w-full h-10 items-center px-4 gap-4 bg-gray-200 rounded-md mb-2 mt-2'>
              <label>Gender:</label>
              <div className='flex w-[60%] items-center gap-4'>
                <div>
                  <input type="radio" id="male" name="gender" value="male" />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input type="radio" id="female" name="gender" value="female" />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <button type="submit" className="w-[20vw] h-12 rounded-md text-white bg-purple-400 text-lg font-semibold active:scale-90">Sign Up</button>
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
