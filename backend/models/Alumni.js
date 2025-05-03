const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  graduationYear: {
    type: Number,
    required: [true, 'Graduation year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true
  },
  currentJob: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  profileComplete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);