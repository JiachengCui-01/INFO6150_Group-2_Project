const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

AppointmentSchema.virtual('formattedDate').get(function() {
  return this.date ? this.date.toLocaleDateString() : '';
});

AppointmentSchema.pre('save', function(next) {
  if (this.date < new Date()) {
    return next(new Error('Appointment date cannot be in the past'));
  }
  next();
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;