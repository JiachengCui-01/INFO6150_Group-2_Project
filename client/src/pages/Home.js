import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import defaultAvatar from '../assets/img_avatar.png';
import { useRef } from 'react';

function Home() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();
  const doctorSectionRef = useRef(null);

  const scrollToDoctors = () => {
    doctorSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white text-decoration-none" onClick={scrollToDoctors}>
                  Doctors
                </button>
              </li>              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Departments</a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/departments/internal-medicine">Department of Internal Medicine</Link></li>
                  <li><Link className="dropdown-item" to="/departments/surgery">Department of Surgery</Link></li>
                  <li><Link className="dropdown-item" to="/departments/pediatrics">Department of Pediatrics</Link></li>
                  <li><Link className="dropdown-item" to="/departments/ophthalmology">Department of Ophthalmology</Link></li>
                  <li><Link className="dropdown-item" to="/departments/stomatology">Department of Stomatology</Link></li>
                  <li><Link className="dropdown-item" to="/departments/dermatology">Department of Dermatology</Link></li>
                  <li><Link className="dropdown-item" to="/departments/neurosurgery">Department of Neurosurgery</Link></li>
                </ul>
              </li>
              {/* 后续添加的，仅 admin 可见 */}
              {userRole === "admin" && (
                <li className="nav-item">
                  <a className="nav-link" href="/admin">Admin Panel</a>
                </li>
              )}

              {/* 后续添加的，仅 employee 可见 */}
              {userRole === "employee" && (
                <li className="nav-item">
                  <a className="nav-link" href="/employee">Manage Applys</a>
                </li>
              )}
              {/* 后续添加的，仅 client 可见 */}
              {userRole === "client" && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Services</a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/patient/appointments">Book an Appointment</a></li>
                    <li><a className="dropdown-item" href="/patient/profile">My Medical Profile</a></li>
                    <li><a className="dropdown-item" href="/patient/medical-records">Medical Records</a></li>
                    <li><a className="dropdown-item" href="/patient/consultation">Consult Doctor</a></li>
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
            {showDropdown && (
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


      {/* Doctors Section */}
      <div ref={doctorSectionRef} className="container mt-5">
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
                  <a href="#" className="btn btn-primary" onClick={() => setSelectedDoctor(doc)}>View Profile</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Table */}
      {/* Hospital Departments Table */}
      <div className="container mt-5">
        <h2 className="text-center text-white">🏥 Hospital Departments</h2>
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Department</th>
              <th>Head Doctor</th>
              <th>Contact</th>
              <th>Specialty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cardiology</td>
              <td>Dr. Smith</td>
              <td>400-123-1111</td>
              <td>Heart Disease & Hypertension</td>
            </tr>
            <tr>
              <td>Neurology</td>
              <td>Dr. Johnson</td>
              <td>400-123-2222</td>
              <td>Stroke & Brain Disorders</td>
            </tr>
            <tr>
              <td>Pediatrics</td>
              <td>Dr. Chen</td>
              <td>400-123-3333</td>
              <td>Childhood Illness & Vaccination</td>
            </tr>
            <tr>
              <td>Surgery</td>
              <td>Dr. Wang</td>
              <td>400-123-4444</td>
              <td>General & Minimally Invasive Surgery</td>
            </tr>
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
                You can book an appointment online through our <a href="/patient/appointments">Appointment Page</a>.
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
      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedDoctor.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedDoctor(null)}></button>
              </div>
              <div className="modal-body">
                <p>{selectedDoctor.desc}</p>
                <img src={selectedDoctor.img} alt="Doctor" className="img-fluid rounded" />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedDoctor(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us */}
      <div className="container text-center my-5 text-white">
        <h2>📞 Contact Us</h2>
        <p>Email: contact@g2medical.com | Phone: 400-123-4567</p>
      </div>
    </>
  );
}

export default Home;