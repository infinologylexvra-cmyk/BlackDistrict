const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  password: {
    type: String
  },
  phone: {
    type: String,
    unique: true,
    sparse: true, // Sparse allows multiple users to not have a phone number (i.e. if they register with email/pass only)
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
