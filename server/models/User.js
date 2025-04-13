// [Owner: David] - Mongoose model for User
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['admin', 'employee', 'user'], default: 'user' },
  image: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);
