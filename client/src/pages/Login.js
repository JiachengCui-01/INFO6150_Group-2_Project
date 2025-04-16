import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userRole', data.user.type);
        localStorage.setItem('userImage', data.user.image);
        localStorage.setItem('userName', data.user.fullName);
        if (data.user.image) {
          localStorage.setItem('userImage', data.user.image);
        } else {
          localStorage.removeItem('userImage');
        }
        navigate('/home');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Login error');
    }
  };

  return (
    <>
      <div className="login-background"></div>
      <div className="login-card text-center">
        <h4 className="mt-3">Welcome to G2 Medical Center!</h4>
        <p className="text-muted">Hope you have a great day ^_^</p>
        <p className="fw-bold">Sign in to continue</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-outline-dark w-100">Sign In</button>
        </form>
        <div className="mt-3">
          <a href="/reset-password" className="text-decoration-none">Forgot password?</a>
        </div>
        <div className="mt-2">
          <a
            href="#"
            className="text-decoration-none"
            onClick={() => {
              localStorage.setItem('userEmail', 'guest@example.com');
              localStorage.setItem('userRole', 'guest');
              localStorage.setItem('userName', 'Guest');
              localStorage.setItem('userImage', 'img_avatar.png'); 
              window.location.href = '/home';
            }}
          >
            Browse as Guest
          </a>
        </div>
        <hr />
        <p>Don't have an account?</p>
        <button className="btn btn-outline-dark w-100" onClick={() => navigate('/register')}>Sign Up</button>
      </div>
    </>
  );
}

export default Login;
