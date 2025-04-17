import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import ModifyAvatar from './pages/ModifyAvatar';
// 导入患者相关页面
import PatientProfile from './pages/PatientProfile';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';
import Consultation from './pages/Consultation';
//医生页面
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientLookup from './pages/doctor/PatientLookup';
import ConsultationNotes from './pages/doctor/ConsultationNotes';
import DoctorAppointments from './pages/doctor/DoctorAppointments';



function App() {
  return (
    <Router>
      <Routes>
        {/* 默认访问根路径 / 时跳转到 /Login */}
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/modify-avatar" element={<ModifyAvatar />} />
        {/* 患者相关路由 */}
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/appointments" element={<Appointments />} />
        <Route path="/patient/medical-records" element={<MedicalRecords />} />
        <Route path="/patient/consultation" element={<Consultation />} />
        {/* 医生相关 */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/patients" element={<PatientLookup />} />
        <Route path="/doctor/notes" element={<ConsultationNotes />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />

      </Routes>
    </Router>
  );
}

export default App;