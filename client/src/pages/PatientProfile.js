import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PatientProfile() {
  const [profile, setProfile] = useState({
    fullName: '',
    birthDate: '',
    gender: '',
    bloodType: '',
    allergies: [],
    medicalHistory: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Get user information
  const userEmail = localStorage.getItem('userEmail');
  const userRole = localStorage.getItem('userRole');
  
  useEffect(() => {
    // Check user permissions
    if (!userEmail || userRole !== 'client') {
      navigate('/login');
      return;
    }
    
    // Load patient profile data
    fetchProfile();
  }, [userEmail, userRole, navigate]);
  
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/patients/profile?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setProfile({
          fullName: data.fullName || '', // 处理姓名
          birthDate: data.birthDate ? data.birthDate.substr(0, 10) : '',
          gender: data.gender || '',
          bloodType: data.bloodType || '',
          allergies: data.allergies || [],
          medicalHistory: data.medicalHistory || '',
          emergencyContact: data.emergencyContact || {
            name: '',
            relationship: '',
            phone: ''
          }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile({
        ...profile,
        [parent]: {
          ...profile[parent],
          [child]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/patients/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          ...profile
        }),
      });
      
      if (response.ok) {
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  };
  
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // 添加返回首页功能
  const handleGoBack = () => {
    navigate('/home');
  };
  
  return (
    <>
      <div className="login-background"></div>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-white">My Medical Profile</h2>
          <button className="btn btn-outline-light" onClick={handleGoBack}>
            Back to Home
          </button>
        </div>
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3>My Medical Profile</h3>
          </div>
          <div className="card-body">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={profile.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Select Gender --</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Birth Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="birthDate"
                      value={profile.birthDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Blood Type</label>
                    <select
                      className="form-select"
                      name="bloodType"
                      value={profile.bloodType}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Select Blood Type --</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="O">O</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Allergies</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Separate multiple items with commas"
                    value={profile.allergies.join(', ')}
                    onChange={(e) => setProfile({...profile, allergies: e.target.value.split(',').map(item => item.trim())})}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Medical History</label>
                  <textarea
                    className="form-control"
                    name="medicalHistory"
                    rows="3"
                    value={profile.medicalHistory}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <h5 className="mt-4">Emergency Contact</h5>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="emergencyContact.name"
                      value={profile.emergencyContact.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Relationship</label>
                    <input
                      type="text"
                      className="form-control"
                      name="emergencyContact.relationship"
                      value={profile.emergencyContact.relationship}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="emergencyContact.phone"
                      value={profile.emergencyContact.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary me-2">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <div>
                {profile.fullName || profile.birthDate || profile.gender || profile.bloodType || profile.allergies.length > 0 || profile.medicalHistory || profile.emergencyContact.name ? (
                  <div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <h5>Name</h5>
                        <p>{profile.fullName || 'Not provided'}</p>
                      </div>
                      <div className="col-md-6">
                        <h5>Gender</h5>
                        <p>{profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <h5>Birth Date</h5>
                        <p>{profile.birthDate ? new Date(profile.birthDate).toLocaleDateString() : 'Not provided'}</p>
                      </div>
                      <div className="col-md-6">
                        <h5>Blood Type</h5>
                        <p>{profile.bloodType || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h5>Allergies</h5>
                      {profile.allergies.length > 0 ? (
                        <ul>
                          {profile.allergies.map((allergy, index) => (
                            <li key={index}>{allergy}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No allergies recorded</p>
                      )}
                    </div>
                    
                    <div className="mb-3">
                      <h5>Medical History</h5>
                      <p>{profile.medicalHistory || 'No medical history recorded'}</p>
                    </div>
                    
                    <div className="mb-3">
                      <h5>Emergency Contact</h5>
                      {profile.emergencyContact.name ? (
                        <div>
                          <p><strong>Name:</strong> {profile.emergencyContact.name}</p>
                          <p><strong>Relationship:</strong> {profile.emergencyContact.relationship}</p>
                          <p><strong>Phone:</strong> {profile.emergencyContact.phone}</p>
                        </div>
                      ) : (
                        <p>No emergency contact provided</p>
                      )}
                    </div>
                    
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                  </div>
                ) : (
                  <div>
                    <p className="text-center">No personal medical record information has been entered yet.</p>
                    <div className="text-center">
                      <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientProfile;