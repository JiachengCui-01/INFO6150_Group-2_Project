// [Owner: Bob] - Entry point for Node.js backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; 

// 更新CORS配置
app.use(cors({
  origin: 'http://localhost:3000', // 前端域名
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
console.log('Loading auth routes...');
const authRoutes = require('./routes/auth');
console.log('Loading patient routes...');
const patientRoutes = require('./routes/patients');
console.log('Loading appointment routes...');
const appointmentRoutes = require('./routes/appointments');
console.log('All routes loaded');

app.use('/api/auth', authRoutes);
console.log('Auth routes registered');
app.use('/api/patients', patientRoutes);
console.log('Patient routes registered');
app.use('/api/appointments', appointmentRoutes);
console.log('Appointment routes registered');

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));