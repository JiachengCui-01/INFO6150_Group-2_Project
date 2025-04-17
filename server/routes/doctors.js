const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctors'); // make sure your file is named Doctors.js
const User = require('../models/User');

// 获取医生个人资料
router.get('/profile', async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let doctor = await Doctor.findOne({ userId: user._id });
    if (!doctor) {
      doctor = new Doctor({
        userId: user._id,
        department: '',
        specialty: '',
        title: '',
        bio: '',
        phone: '',
        availableDays: [],
        avatar: ''
      });
      await doctor.save();
    }

    res.status(200).json(doctor);
  } catch (err) {
    console.error('Error fetching doctor profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// 获取所有预约（不区分医生）
router.get('/doctor', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('clientId', 'fullName')
      .populate('doctorId', 'fullName');

    const result = appointments.map(appt => ({
      _id: appt._id,
      date: appt.date,
      reason: appt.reason,
      status: appt.status,
      patientName: appt.clientId?.fullName || 'N/A',
      doctorName: appt.doctorId?.fullName || 'N/A'
    }));

    res.json(result);
  } catch (err) {
    console.error('Fetch all appointments failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// 更新医生个人资料
router.post('/profile', async (req, res) => {
  try {
    const {
      email,
      department,
      specialty,
      title,
      bio,
      phone,
      availableDays,
      avatar
    } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let doctor = await Doctor.findOne({ userId: user._id });

    if (doctor) {
      doctor.department = department || doctor.department;
      doctor.specialty = specialty || doctor.specialty;
      doctor.title = title || doctor.title;
      doctor.bio = bio || doctor.bio;
      doctor.phone = phone || doctor.phone;
      doctor.availableDays = availableDays || doctor.availableDays;
      doctor.avatar = avatar || doctor.avatar;

      await doctor.save();
    } else {
      doctor = new Doctor({
        userId: user._id,
        department,
        specialty,
        title,
        bio,
        phone,
        availableDays,
        avatar
      });
      await doctor.save();
    }

    res.status(200).json({ message: 'Doctor profile updated successfully', doctor });
  } catch (err) {
    console.error('Error updating doctor profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
