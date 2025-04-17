const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// 简单的测试路由
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Appointments API is working' });
});

// 获取所有医生 (用于预约表单)
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ type: 'employee' }).select('_id fullName department');
    console.log('Fetched doctors:', doctors); // 增加日志
    res.status(200).json(doctors);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 获取患者的所有预约
router.get('/patient', async (req, res) => {
  try {
    const { email } = req.query;
    
    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // 查找该用户的所有预约
    const appointments = await Appointment.find({ patientId: user._id })
      .populate('doctorId', 'fullName')
      .sort({ date: 1, time: 1 });
    
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 创建新预约
router.post('/', async (req, res) => {
  try {
    console.log('Received appointment data:', req.body); // 增加详细日志

    const { email, doctorId, department, date, time, reason } = req.body;
    
    // 验证doctorId是否为有效的ObjectId
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ message: 'Invalid doctor ID format' });
      }

    // 查找患者
    const patient = await User.findOne({ email });
    if (!patient) {
      console.error('Patient not found for email:', email);
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    // 查找医生
    const doctor = await User.findById(doctorId);
    if (!doctor) {
      console.error('Doctor not found with ID:', doctorId);
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // 创建新预约 - 确保日期正确转换
    const appointment = new Appointment({
      patientId: patient._id,
      doctorId: doctor._id,
      department,
      date: date, // 确保日期正确解析
      time,
      reason,
      status: 'pending'
    });
    
    // 保存预约并详细记录
    const savedAppointment = await appointment.save();
    console.log('Appointment created successfully:', savedAppointment);
    
    res.status(201).json({ 
      message: 'Appointment created successfully', 
      appointment: savedAppointment 
    });
  } catch (err) {
    console.error('Detailed error creating appointment:', err);
    res.status(500).json({ 
      message: 'Server error', 
      error: err.message // 返回更详细的错误信息
    });
  }
});

// 取消预约
router.put('/cancel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    
    // 验证用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // 查找预约
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // 验证该预约属于请求用户
    if (appointment.patientId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
    }
    
    // 更新预约状态
    appointment.status = 'cancelled';
    await appointment.save();
    
    res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (err) {
    console.error('Error cancelling appointment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;