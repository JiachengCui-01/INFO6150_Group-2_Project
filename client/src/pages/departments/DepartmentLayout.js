import React from 'react';
import '../Home.css';
import defaultAvatar from '../../assets/img_avatar.png';
import { useNavigate, Link } from 'react-router-dom';

function DepartmentLayout({ children }) {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'User';
    const userImage = localStorage.getItem('userImage');
    const userRole = localStorage.getItem('userRole') || 'guest';
    const avatarUrl =
        userImage && userImage !== 'null' && userImage !== 'undefined' && userImage.trim() !== ''
            ? `http://localhost:5000/uploads/${userImage}`
            : defaultAvatar;

    return (
        <>
            <div className="home-background"></div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">G2 Medical Center</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Departments</a>
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
                        </ul>
                        <div className="d-flex align-items-center ms-auto">
                            <span className="me-2 text-white fw-bold">{userName}</span>
                            <img
                                src={avatarUrl}
                                alt="avatar"
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    border: '2px solid white'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mt-5">{children}</div>
        </>
    );
}

export default DepartmentLayout;
