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
//department菜单
import InternalMedicine from './pages/departments/InternalMedicine';
import Surgery from './pages/departments/Surgery';
import Pediatrics from './pages/departments/Pediatrics';
import Ophthalmology from './pages/departments/Ophthalmology';
import Stomatology from './pages/departments/Stomatology';
import Dermatology from './pages/departments/Dermatology';
import Neurosurgery from './pages/departments/Neurosurgery';


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

        <Route path="/departments/internal-medicine" element={<InternalMedicine />} />
        <Route path="/departments/surgery" element={<Surgery />} />
        <Route path="/departments/pediatrics" element={<Pediatrics />} />
        <Route path="/departments/ophthalmology" element={<Ophthalmology />} />
        <Route path="/departments/stomatology" element={<Stomatology />} />
        <Route path="/departments/dermatology" element={<Dermatology />} />
        <Route path="/departments/neurosurgery" element={<Neurosurgery />} />

      </Routes>
    </Router>
  );
}

export default App;