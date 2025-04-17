import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Consultation() {
  const [departments, setDepartments] = useState({
    'Cardiology': [
      { id: '101', name: 'Dr. Lee', description: 'Specialist in heart disease treatments.' },
      { id: '102', name: 'Dr. Smith', description: 'Cardiovascular expert' }
    ],
    'Neurology': [
      { id: '201', name: 'Dr. Wang', description: 'Expert in brain surgery.' },
      { id: '202', name: 'Dr. Chen', description: 'Neurological disorders specialist' }
    ],
    'Orthopedics': [
      { id: '301', name: 'Dr. Johnson', description: 'Specialist in orthopedic surgery and sports medicine.' },
      { id: '302', name: 'Dr. Martinez', description: 'Joint and bone health expert' }
    ],
    'Pediatrics': [
      { id: '401', name: 'Dr. Wilson', description: 'Child healthcare specialist' },
      { id: '402', name: 'Dr. Garcia', description: 'Children\'s medical care expert' }
    ],
    'Dermatology': [
      { id: '501', name: 'Dr. Taylor', description: 'Skin health and cosmetic procedures' },
      { id: '502', name: 'Dr. Brown', description: 'Advanced dermatological treatments' }
    ]
  });

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  // 当科室选择变化时，更新可选医生列表
  useEffect(() => {
    if (selectedDepartment) {
      setAvailableDoctors(departments[selectedDepartment]);
      setSelectedDoctor(null);
    } else {
      setAvailableDoctors([]);
      setSelectedDoctor(null);
    }
  }, [selectedDepartment, departments]);

  const handleGoBack = () => {
    navigate('/home');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      alert('Please select a doctor first');
      return;
    }
    
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }
    
    alert(`Consultation message sent to ${selectedDoctor.name}`);
    setMessage('');
  };

  return (
    <>
      <div className="login-background"></div>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-white">Online Doctor Consultation</h2>
          <button className="btn btn-outline-light" onClick={handleGoBack}>
            Back to Home
          </button>
        </div>
        
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h4>Select Department</h4>
              </div>
              <div className="card-body">
                <select 
                  className="form-select mb-3"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">-- Select Department --</option>
                  {Object.keys(departments).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedDepartment && (
              <div className="card mt-3">
                <div className="card-header bg-primary text-white">
                  <h4>Select Doctor</h4>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    {availableDoctors.map(doctor => (
                      <button
                        key={doctor.id}
                        className={`list-group-item list-group-item-action ${selectedDoctor?.id === doctor.id ? 'active' : ''}`}
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        {doctor.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="col-md-8">
            <div className="card" style={{minHeight: '500px'}}>
              <div className="card-header bg-primary text-white">
                <h4>Send Message</h4>
              </div>
              <div className="card-body">
                {selectedDoctor ? (
                  <div>
                    <div className="mb-3">
                      <h5>{selectedDoctor.name}</h5>
                      <p className="text-muted">{selectedDepartment} Department</p>
                    </div>
                    
                    <div className="mb-3">
                      <p>{selectedDoctor.description}</p>
                    </div>
                    
                    <form onSubmit={handleSendMessage}>
                      <div className="mb-3">
                        <label className="form-label">Consultation Message</label>
                        <textarea
                          className="form-control"
                          rows="8"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Please describe your symptoms, concerns, or questions in detail..."
                          required
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                  </div>
                ) : (
                  <div className="text-center mt-5">
                    <p className="text-muted">Please select a department and doctor to start consultation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consultation;