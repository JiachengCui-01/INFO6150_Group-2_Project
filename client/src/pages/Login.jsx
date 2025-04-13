// [Owner: Jiacheng] - Fully restored Login page
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
    <div className="login-container">
      <img src={avatar} alt="Avatar" className="avatar" />
      <h2>Welcome to G2 Medical Center!</h2>
      <p>Hope you have a great day^_^<br />Sign in to continue</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-dark w-100">Sign In</button>
      </form>
      <a href="#">Forgot password?</a>
      <hr />
      <p className="text-center">Don't have an account?</p>
      <button className="btn btn-dark w-100">Sign Up</button>
    </div>
  );
}

export default Login;
