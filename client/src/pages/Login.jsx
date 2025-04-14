// Login.jsx - Enhanced with background + styling
import React, { useState } from 'react';
import './Login.css';
import avatar from '../assets/img_avatar.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", email, password);
  };

  return (
    <>
      {/* Background Overlay */}
      <div className="login-background"></div>

      {/* Navbar */}
      

      {/* Login Card */}
      <div className="login-card text-center">
        <img src={avatar} alt="Avatar" className="avatar" />
        <h4 className="mt-3">Welcome to G2 Medical Center!</h4>
        <p className="text-muted">Hope you have a great day ^_^</p>
        <p className="fw-bold">Sign in to continue</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-custom w-100">Sign In</button>
        </form>
        <div className="mt-3">
          <a href="#" className="text-decoration-none">Forgot password?</a>
        </div>
        <hr />
        <p className="text-center">Don't have an account?</p>
        <button className="btn btn-outline-dark w-100">Sign Up</button>
      </div>
    </>
  );
}

export default Login;
