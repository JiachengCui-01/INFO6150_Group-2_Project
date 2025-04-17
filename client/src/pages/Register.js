import React, { useState, useEffect } from 'react';
import './Login.css';
import defaultAvatar from '../assets/img_avatar.png';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(defaultAvatar);
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(defaultAvatar);
    }
  }, [image]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('type', type);
      if (image) formData.append('image', image);

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert('Signup failed.');
      }
    } catch (err) {
      alert('Error during signup');
    }
  };

  return (
    <>
      <div className="login-background"></div>
      <div className="login-card text-center">
        <img src={previewUrl} alt="Preview" className="avatar" />
        <h4 className="mt-3">Create your account</h4>
        <form onSubmit={handleSignup}>
          <div className="mb-3 text-start">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" required onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" required minLength={6} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Role</label>
            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="" disabled>-- Please select --</option>
              <option value="admin">Admin</option>
              <option value="doctor">Employee</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Upload Avatar</label>
            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <button type="submit" className="btn btn-outline-dark w-100">Sign Up</button>
        </form>
        <hr />
        <p className="mt-3">Already have an account?</p>
        <button className="btn btn-outline-dark w-100" onClick={() => navigate('/login')}>Back to Login</button>
      </div>
    </>
  );
}

export default Register;
