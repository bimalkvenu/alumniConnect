const mongoose = require('mongoose');
const User = require('./User');

const alumniSchema = new mongoose.Schema({
  graduationYear: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear()
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  currentPosition: String,
  company: String,
  skills: [String],
  experience: [{
    position: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String,
    currentlyWorking: Boolean
  }],
  availableForMentorship: {
    type: Boolean,
    default: false
  }
});

const Alumni = User.discriminator('Alumni', alumniSchema);
module.exports = Alumni;