// server/routes/patients.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const User = require('../models/User');

// 获取患者个人资料
router.get('/profile', async (req, res) => {
  try {
    const { email } = req.query;
    
    // 先查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // 查找患者档案，如果不存在则创建一个空档案
    let patient = await Patient.findOne({ userId: user._id });
    
    if (!patient) {
      patient = new Patient({ 
        userId: user._id,
        birthDate: null,
        gender: '',
        bloodType: '',
        allergies: [],
        medicalHistory: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        }
      });
      await patient.save();
    }
    
    res.status(200).json(patient);
  } catch (err) {
    console.error('Error fetching patient profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 更新患者个人资料
router.post('/profile', async (req, res) => {
  try {
    const { email, birthDate, gender, bloodType, allergies, medicalHistory, emergencyContact } = req.body;
    
    // 先查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // 查找或创建患者档案
    let patient = await Patient.findOne({ userId: user._id });
    
    if (patient) {
      // 更新现有档案
      patient.birthDate = birthDate || patient.birthDate;
      patient.gender = gender || patient.gender;
      patient.bloodType = bloodType || patient.bloodType;
      patient.allergies = allergies || patient.allergies;
      patient.medicalHistory = medicalHistory || patient.medicalHistory;
      
      if (emergencyContact) {
        patient.emergencyContact = {
          ...patient.emergencyContact,
          name: emergencyContact.name || patient.emergencyContact.name,
          relationship: emergencyContact.relationship || patient.emergencyContact.relationship,
          phone: emergencyContact.phone || patient.emergencyContact.phone
        };
      }
      
      await patient.save();
    } else {
      // 创建新档案
      patient = new Patient({
        userId: user._id,
        birthDate,
        gender,
        bloodType,
        allergies,
        medicalHistory,
        emergencyContact
      });
      
      await patient.save();
    }
    
    res.status(200).json({ message: 'Patient profile updated successfully', patient });
  } catch (err) {
    console.error('Error updating patient profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;