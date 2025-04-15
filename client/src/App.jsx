import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import ModifyAvatar from './pages/ModifyAvatar';

function App() {
  return (
    <Router>
      <Routes>
        {/* 默认访问根路径 / 时跳转到 /home */}
        <Route path="/" element={<Navigate to="/Login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/modify-avatar" element={<ModifyAvatar />} />
      </Routes>
    </Router>
  );
}

export default App;