// server/models/Doctors.js

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  title: {
    type: String, // e.g., "MD", "DO", "Nurse Practitioner"
    default: 'Doctor'
  },
  bio: {
    type: String,
    default: ''
  },
  phone: {
    type: String
  },
  availableDays: {
    type: [String], // e.g., ['Monday', 'Wednesday', 'Friday']
    default: []
  },
  avatar: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
