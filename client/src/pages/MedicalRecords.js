import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const userRole = localStorage.getItem('userRole');
  
  useEffect(() => {
    // Check user permissions
    if (!userEmail || userRole !== 'client') {
      navigate('/login');
      return;
    }
    
    // Simulate some medical records data
    const dummyRecords = [
      {
        id: '1',
        date: '2024-04-15',
        doctor: 'Dr. Lee',
        department: 'Cardiology',
        diagnosis: 'Hypertension',
        prescription: 'Anti-hypertensive medication',
        notes: 'Regular blood pressure monitoring required'
      },
      {
        id: '2',
        date: '2022-03-10',
        doctor: 'Dr. Wang',
        department: 'General Medicine',
        diagnosis: 'Common Cold',
        prescription: 'Cold medicine',
        notes: 'Rest and hydration recommended'
      }
    ];
    
    setRecords(dummyRecords);
    setLoading(false);
  }, [userEmail, userRole, navigate]);
  
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
        <h2 className="text-center text-white mb-4">Medical Records</h2>
        <button className="btn btn-outline-light" onClick={handleGoBack}>
          Back to Home
        </button>
      </div>


        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4>My Medical Records</h4>
          </div>
          <div className="card-body">
            {records.length > 0 ? (
              <div className="accordion" id="recordsAccordion">
                {records.map((record, index) => (
                  <div className="accordion-item" key={record.id}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#record-${record.id}`}
                      >
                        {record.date} - {record.department} - {record.diagnosis}
                      </button>
                    </h2>
                    <div
                      id={`record-${record.id}`}
                      className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                      data-bs-parent="#recordsAccordion"
                    >
                      <div className="accordion-body">
                        <div className="row mb-2">
                          <div className="col-md-4"><strong>Date:</strong> {record.date}</div>
                          <div className="col-md-4"><strong>Doctor:</strong> {record.doctor}</div>
                          <div className="col-md-4"><strong>Department:</strong> {record.department}</div>
                        </div>
                        <div className="mb-2"><strong>Diagnosis:</strong> {record.diagnosis}</div>
                        <div className="mb-2"><strong>Prescription:</strong> {record.prescription}</div>
                        <div className="mb-2"><strong>Notes:</strong> {record.notes}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No medical records available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicalRecords;