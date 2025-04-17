const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const mongoose = require('mongoose');

// 测试路由
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Appointments API is working' });
});

// 获取患者的所有预约
router.get('/patient', async (req, res) => {
  try {
    const { email } = req.query;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const appointments = await Appointment.find({ patientId: user._id })
      .sort({ date: 1, time: 1 });
    
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 创建新预约（不绑定医生）
router.post('/', async (req, res) => {
  try {
    const { email, date, time, reason } = req.body;
    
    const patient = await User.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    const appointment = new Appointment({
      patientId: patient._id,
      date: new Date(date),
      time,
      reason,
      status: 'pending'
    });
    
    const savedAppointment = await appointment.save();
    
    res.status(201).json({ 
      message: 'Appointment created successfully', 
      appointment: savedAppointment 
    });
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ 
      message: 'Server error', 
      error: err.message 
    });
  }
});

// 取消预约
router.put('/cancel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    if (appointment.patientId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
    }
    
    appointment.status = 'cancelled';
    await appointment.save();
    
    res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (err) {
    console.error('Error cancelling appointment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 医生查看所有预约
router.get('/doctor', async (req, res) => {
  try {
    const { email } = req.query;
    
    const doctor = await User.findOne({ email, type: 'doctor' });
    if (!doctor) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const appointments = await Appointment.find()
      .populate('patientId', 'fullName email')
      .sort({ date: 1, time: 1 });
    
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching doctor appointments:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 医生更新预约状态
router.put('/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, email } = req.body;
    
    const doctor = await User.findOne({ email, type: 'doctor' });
    if (!doctor) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();
    
    res.status(200).json({ message: 'Appointment updated', appointment });
  } catch (err) {
    console.error('Error updating appointment status:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }

  // Get appointments for a doctor
router.get('/doctor', async (req, res) => {
  try {
    const { email } = req.query;

    const doctor = await User.findOne({ email, type: 'doctor' }); // 你们叫 doctor 是 'doctor' 还是 'employee' 要统一！
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const appointments = await Appointment.find({ doctorId: doctor._id }).populate('clientId', 'fullName');

    const result = appointments.map(appt => ({
      _id: appt._id,
      date: appt.date,
      reason: appt.reason,
      status: appt.status,
      patientName: appt.clientId?.fullName || 'N/A'
    }));

    res.json(result);
  } catch (err) {
    console.error('Doctor appointment fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
});

module.exports = router;