import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/img_avatar.png';

const ModifyAvatar = () => {
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('userEmail');
    if (!email || !image) return alert("Missing info");

    const formData = new FormData();
    formData.append('email', email);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/auth/update-avatar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Avatar updated successfully!');
        localStorage.setItem('userImage', data.image);
        navigate('/home');
      } else {
        alert('Failed to update avatar');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <>
      <div className="login-background"></div>
      <div className="login-card text-center">
        <img src={previewUrl} alt="Preview" className="avatar" />
        <h5 className="mt-3">Update Your Avatar</h5>
        <form onSubmit={handleUpdate}>
          <div className="mb-3 text-start">
            <label className="form-label">Select New Avatar</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-dark w-100">Update</button>
        </form>
        <button className="btn btn-outline-dark w-100 mt-3" onClick={() => navigate('/home')}>Back to Home</button>
      </div>
    </>
  );
};

export default ModifyAvatar;
