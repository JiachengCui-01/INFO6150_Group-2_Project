import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 复用已有样式

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setEmail('');
        setNewPassword('');
      } else {
        alert(data.message || 'Password reset failed');
      }
    } catch (err) {
      alert('Server error during reset');
    }
  };

  return (
    <>
      <div className="login-background"></div>
      <div className="login-card text-center">
        <h4 className="mb-3">Reset Your Password</h4>
        <form onSubmit={handleReset}>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-outline-dark w-100">
            Update Password
          </button>
        </form>

        {success && (
          <div className="mt-3 text-success">
            Password updated successfully!
          </div>
        )}

        <hr />
        <button
          className="btn btn-outline-dark w-100 mt-2"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </div>
    </>
  );
}

export default ResetPassword;
