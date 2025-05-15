const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
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
  graduationYear: {
    type: Number,
    required: true,
    min: 2000,
    max: new Date().getFullYear()
  },
  degree: {
    type: String,
    required: true
  },
  currentPosition: String,
  company: String,
  skills: [String],
  availableForMentorship: {
    type: Boolean,
    default: false
  },
  profilePhoto: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('AlumniProfile', alumniSchema);