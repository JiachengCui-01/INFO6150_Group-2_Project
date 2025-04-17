// server/models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  birthDate: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  bloodType: {
    type: String
  },
  allergies: {
    type: [String],
    default: []
  },
  medicalHistory: {
    type: String,
    default: ''
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);