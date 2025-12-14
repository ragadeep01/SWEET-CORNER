
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import '../styles.css';
// import buyerhomePage from '../pages/buyer-homePage';
// import Farmerhome from '../pages/farmerPages/Home'; 
// import SellerDashboard from '../pages/SellerDashboard';

const Login = ({ setShowLogin, setShowSignUp }) => {
  const [email, setEmail] = useState('');
  const navigate=useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault(); 
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length <8 ) {
      setError('Password must be at least 8 characters long');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Login failed');
      }
      localStorage.setItem('user', JSON.stringify(data));
      // alert('Login successful!');
      setShowLogin(false);
      setShowSignUp(false);
      if (data.role === 'Buyer') {
        navigate('/dashboard');
      } else if (data.role === 'Seller') {
        navigate('/Admin');
      }
    } catch (err) {
      setError("login failed");
    }
  };

  return (
    <div className="modall-overlay" onClick={() => setShowLogin(false)}>
      <div className="modall-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={() => setShowLogin(false)}>&times;</span>
        <h1>SWEET CORNER</h1>
        <h2>Welcome back! 😍</h2>
        <p>Login to your account</p>

        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {/* <button className="login-btn" onClick={handleLogin}>Log In</button> */}
        <button className="login-btn" type="submit">Log In</button>

        <p className="switch-auth">Don't have an account? <span onClick={() => { setShowLogin(false); setShowSignUp(true); }}>Sign up</span></p>
        </form>
         </div>
    </div>
  );
};

const SignUp = ({ setShowSignUp, setShowLogin }) => {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Buyer');
  const [error, setError] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault(); 
    if (name.trim() === '') {
      setError('Name is required');
      return;}
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;}
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;}
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;}
    try {
      const response = await fetch('http://localhost:3000/api/authh/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password,role: userType }),
        credentials: 'include'
      });
      const data = await response.json();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');}
      setShowLogin(false);
      setShowSignUp(false);
      if (data.role === 'Buyer') {
        navigate('/dashboard');
      } else if (data.role === 'Seller') {
        navigate('/Admin');
      }
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      setError("signup failed");
    }
  };
  return (
    <div className="modall-overlay" onClick={() => setShowSignUp(false)}>
      <div className="modall-content modall-contentt" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={() => setShowSignUp(false)}>&times;</span>
        <h1>Sweet Corner</h1>
        <h2>Create an account</h2>
        <p>Sign up to get started</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="Buyer">Buyer</option>
          {/* <option value="Seller">Seller</option> */}
        </select>
        {/* <button className="signup-btn" onClick={handleSignUp}>Sign Up</button> */}
        <button className="signup-btn" type="submit">Sign Up</button>

        <p className="switch-auth">Already have an account? <span onClick={() => { setShowSignUp(false); setShowLogin(true); }}>Log in</span></p>
        </form>
      </div>
    </div>
  );
};

export { Login, SignUp };
