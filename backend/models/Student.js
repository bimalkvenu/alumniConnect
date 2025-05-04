const mongoose = require('mongoose');
const User = require('./User');

const studentSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
    trim: true,
    uppercase: true,
    validate: {
      validator: function(v) {
        return /^[A-Z0-9]{8,20}$/.test(v);
      },
      message: 'Registration number must be 8-20 alphanumeric characters'
    }
  },
  year: {
    type: String,
    required: true,
    enum: ['1', '2', '3', '4', '5+']
  },
  section: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    maxlength: 2
  },
  program: {
    type: String,
    required: true,
    enum: ['Computer Science', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering']
  },
  gpa: {
    type: Number,
    min: 0,
    max: 4
  },
  courses: [String],
  achievements: [{
    title: String,
    description: String,
    date: Date
  }]
});

const Student = User.discriminator('Student', studentSchema);
module.exports = Student;