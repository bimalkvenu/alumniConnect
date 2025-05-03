const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'alumni', 'admin'],
    required: true
  },
  profilePhoto: {
    type: String,
    trim: true,
    default: ''
  },
  // Common fields
  phone: String,
  address: String,
  bio: String,
  socialLinks: {
    linkedin: String,
    website: String
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;