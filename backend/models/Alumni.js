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
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  graduationYear: {
    type: Number,
    required: true,
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  degree: String,
  currentJob: String
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create the model
module.exports = mongoose.model('Alumni', alumniSchema);