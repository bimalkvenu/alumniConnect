// studentProfile.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: String,
  address: String,
  year: {
    type: String,
    enum: ['1', '2', '3', '4', '5+'],
    required: true
  },
  section: String,
  program: {
    type: String,
    required: true,
    enum: ['Computer Science', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering']
  },
  bio: String,
  interests: [String],
  gpa: String,
  achievements: [{
    title: String,
    description: String,
    date: String
  }],
  socialLinks: {
    linkedin: String,
    website: String
  },
  profilePhoto: {
    type: String,
    default: ''
  },
  profileComplete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentSchema);