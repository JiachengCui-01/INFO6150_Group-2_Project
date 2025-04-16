import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/img_avatar.png';

function Home() {
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName') || 'User';
  const userImage = localStorage.getItem('userImage');
  const userRole = localStorage.getItem('userRole') || 'guest';
  const isGuest = userRole === 'guest';
  const avatarUrl =
  userImage && userImage !== 'null' && userImage !== 'undefined' && userImage.trim() !== ''
    ? `http://localhost:5000/uploads/${userImage}`
    : defaultAvatar;

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {/* Background Layer */}
      <div className="home-background"></div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">G2 Medical Center</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Doctors</a></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Departments</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Department of Internal Medicine</a></li>
                  <li><a className="dropdown-item" href="#">Department of Surgery</a></li>
                  <li><a className="dropdown-item" href="#">Department of Pediatrics</a></li>
                  <li><a className="dropdown-item" href="#">Department of Ophthalmology</a></li>
                  <li><a className="dropdown-item" href="#">Department of Stomatology</a></li>
                  <li><a className="dropdown-item" href="#">Department of Dermatology</a></li>
                  <li><a className="dropdown-item" href="#">Department of Neurosurgery</a></li>
                </ul>
              </li>
                {/* 👇 后续添加的，仅 admin 可见 */}
                {userRole === "admin" && (
                  <li className="nav-item">
                    <a className="nav-link" href="/admin">Admin Panel</a>
                  </li>
                )}

                {/* 👇 后续添加的，仅 employee 可见 */}
                {userRole === "employee" && (
                  <li className="nav-item">
                    <a className="nav-link" href="/employee">Manage Applys</a>
                  </li>
                )}
                {/* 👇 后续添加的，仅 client 可见 */}
                {userRole === "client" && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Services</a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="appointment.html">Booking an Appointment</a></li>
                      <li><a className="dropdown-item" href="medical-records.html">Accessing Medical Records</a></li>
                      <li><a className="dropdown-item" href="consult-doctor.html">Consulting with Doctors</a></li>
                      <li><a className="dropdown-item" href="manage-patient.html">Managing Patient Information</a></li>
                    </ul>
                  </li>
                )}
            </ul>
             {/* 👤 用户信息显示区 */}
             <div className="d-flex align-items-center ms-auto">
             <span className="me-2 text-white fw-bold">{isGuest ? 'Guest' : userName}</span>
              <img
                src={isGuest ? defaultAvatar : avatarUrl}
                alt="User Avatar"
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid white',
                  cursor: 'pointer'
                }}
                onClick={toggleDropdown}
              />
            </div>
            {showDropdown &&  (
              <div className="position-absolute text-white bg-dark rounded p-2 shadow" style={{ top: '60px', right: '20px', zIndex: 1050 }}>
                {isGuest ? (
                  <a href="/login" className="btn btn-outline-light w-100">Back to Login</a>
                ) : (
                  <>
                    <a href="/modify-avatar" className="btn btn-outline-light mb-2 w-100">Modify Avatar</a>
                    <button className="btn btn-outline-light w-100" onClick={handleLogout}>Logout</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Carousel */}
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-white">📢 Latest Announcements</h2>

        <div className="carousel-wrapper">
          <div
            id="newsCarousel"
            className="carousel slide rounded shadow overflow-hidden"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2970"
                  className="d-block w-100"
                  alt="News 1"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>📢 New Healthcare Policies</h5>
                  <p>Government announces new healthcare subsidies. Check for details!</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=2970"
                  className="d-block w-100"
                  alt="News 2"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>🏆 Doctor of the Month</h5>
                  <p>Congratulations to Dr. Lee for being awarded "Doctor of the Month"!</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1618015358954-344302f421a4?q=80&w=2976"
                  className="d-block w-100"
                  alt="News 3"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>🚑 New Clinic Opening</h5>
                  <p>We are opening a new healthcare center next month. Stay tuned!</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>


      {/* Alert */}
      <div className="alert alert-warning alert-dismissible fade show mt-3 mb-3" role="alert">
        <strong>You have a red alert</strong> You should check in on some of those fields below.
        <a href="#lab_results" className="alert-link"> Click here to view.</a>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>

      {/* Doctors Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-white">Meet Our Doctors</h2>
        <div className="row">
          {[
            {
              name: "Dr. Lee",
              desc: "Cardiologist specializing in heart disease treatments.",
              img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2970&auto=format&fit=crop"
            },
            {
              name: "Dr. Wang",
              desc: "Neurosurgeon with expertise in brain surgery.",
              img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2970&auto=format&fit=crop"
            },
            {
              name: "Dr. Johnson",
              desc: "Expert in orthopedic surgery and sports medicine.",
              img: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2970&auto=format&fit=crop"
            }
          ].map((doc, i) => (
            <div className="col-md-4" key={i}>
              <div className="card">
                <img src={doc.img} className="card-img-top" alt="Doctor" />
                <div className="card-body text-center">
                  <h5 className="card-title">{doc.name}</h5>
                  <p className="card-text">{doc.desc}</p>
                  <a href="#" className="btn btn-primary">View Profile</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Message Modal Trigger */}
      <div className="text-center mt-3 mb-3">
        <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#doctorMessageModal">
          View Doctor's Message
        </button>
      </div>

      {/* Modal */}
      <div className="modal fade" id="doctorMessageModal" tabIndex="-1" aria-labelledby="modalScrollableTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalScrollableTitle">Message from Your Doctor</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Dear [Patient Name],</p>
              <p>After reviewing your recent test results, I recommend the following changes to your treatment plan...</p>
              <p>Best regards, Dr. Wang</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container mt-5">
        <h2 className="text-center text-white">🏥 Hospital Departments</h2>
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Department</th>
              <th>Head Doctor</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Cardiology</td><td>Dr. Smith</td><td>400-123-1111</td></tr>
            <tr><td>Neurology</td><td>Dr. Johnson</td><td>400-123-2222</td></tr>
          </tbody>
        </table>
      </div>

      {/* Progress */}
      <div className="container mt-5">
        <h2 className="text-center text-white">📊 Hospital Service Progress</h2>
        <p className="text-center text-white">Current appointment completion rate</p>
        <div className="progress mt-3">
          <div className="progress-bar progress-bar-striped bg-success" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">80% Completed</div>
        </div>
      </div>

      {/* Lab Results */}
      <div className="card mt-3a mb-5" id="lab_results">
        <div className="card-body">
          <h5 className="card-title">Lipid Profile</h5>
          <p className="card-text"><strong>Total Cholesterol:</strong> 200 mg/dL <span className="text-muted">(Desirable:  &lt; 200 mg/dL)</span></p>
          <p className="card-text"><strong>HDL (High-Density Lipoprotein):</strong> 50 mg/dL <span className="text-muted">(Good: 40 - 60 mg/dL)</span></p>
          <p className="card-text"><strong>LDL (Low-Density Lipoprotein):</strong> 120 mg/dL <span className="text-muted">(Optimal:  &lt; 100 mg/dL)</span></p>
          <p className="card-text"><strong>Triglycerides:</strong> 150 mg/dL <span className="text-muted">(Normal:  &lt; 150 mg/dL)</span></p>
          <p className="card-text"><strong>VLDL (Very Low-Density Lipoprotein):</strong> 30 mg/dL <span className="text-muted">(Normal: 5-40 mg/dL)</span></p>
          <p className="card-text"><strong>Non-HDL Cholesterol:</strong> 150 mg/dL <span className="text-muted">(Optimal:  &lt; 130 mg/dL)</span></p>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mt-5">
        <h2 className="text-center text-white">❓ Frequently Asked Questions</h2>
        <div className="accordion mt-3" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                How do I book an appointment?
              </button>
            </h2>
            <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                You can book an appointment online through our <a href="appointment.html">Appointment Page</a>.
              </div>
            </div>
          </div>
          <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#faq2">
                        What are the hospital's visiting hours?
                    </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        Visiting hours are from 9 AM to 7 PM, Monday to Saturday.
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Contact Us */}
      <div className="container text-center my-5 text-white">
        <h2>📞 Contact Us</h2>
        <p>Email: contact@g2medical.com | Phone: 400-123-4567</p>
      </div>
    </>
  );
}

export default Home;
