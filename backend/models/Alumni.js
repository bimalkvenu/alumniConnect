const mongoose = require('mongoose');

// Define what an alumni looks like
const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  graduationYear: {
    type: Number,
    required: [true, 'Please add graduation year']
  },
  degree: String,
  currentJob: String
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create the model
module.exports = mongoose.model('Alumni', alumniSchema);