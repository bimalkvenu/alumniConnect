const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  // Required Fields
  name: { 
    type: String, 
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  registrationNumber: { 
    type: String, 
    required: [true, 'Please provide your registration number'],
    unique: true,
    trim: true,
    uppercase: true,
    validate: {
      validator: function(v) {
        return /^[A-Z0-9]{8,20}$/.test(v);
      },
      message: 'Registration number must be 8-20 alphanumeric characters'
    }
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
  year: {
    type: String,
    required: [true, 'Please specify your academic year'],
    enum: {
      values: ['1', '2', '3', '4', '5+'],
      message: 'Year must be 1, 2, 3, 4, or 5+'
    }
  },
  section: {
    type: String,
    required: [true, 'Please specify your section'],
    trim: true,
    uppercase: true,
    maxlength: [2, 'Section cannot exceed 2 characters']
  },
  program: {
    type: String,
    required: [true, 'Please specify your program'],
    enum: {
      values: ['Computer Science', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering'],
      message: 'Please select a valid program'
    }
  },
  role: {
    type: String,
    enum: ['student', 'mentor', 'admin'],
    default: 'student'
  },

  // Profile Fields
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || validator.isMobilePhone(v, 'any', { strictMode: false });
      },
      message: 'Please provide a valid phone number'
    }
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  interests: {
    type: [String],
    enum: ['AI', 'Web Dev', 'Data Science', 'Cybersecurity', 'UX/UI Design', 'Mobile Development', 'Cloud Computing', 'Game Development'],
    default: []
  },
  gpa: {
    type: Number,
    min: [0, 'GPA cannot be negative'],
    max: [4, 'GPA cannot exceed 4.0']
  },
  profileComplete: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },

  // Social Links
  socialLinks: {
    linkedin: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || validator.isURL(v, { protocols: ['http','https'], require_protocol: true });
        },
        message: 'Please provide a valid LinkedIn URL'
      }
    },
    website: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || validator.isURL(v, { protocols: ['http','https'], require_protocol: true });
        },
        message: 'Please provide a valid website URL'
      }
    }
  },

  profilePhoto: {
    type: String,
    trim: true,
    default: ''
  },

  // Academic Data
  achievements: [{
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Achievement title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    date: {
      type: String,
      trim: true
    },
    icon: {
      type: String,
      default: 'Award'
    }
  }],

  // Password Reset
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Password encryption middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Virtual for profile completion percentage
userSchema.virtual('completionPercentage').get(function() {
  const requiredFields = ['name', 'email', 'year', 'section', 'program'];
  const completedFields = requiredFields.filter(field => this[field]);
  return (completedFields.length / requiredFields.length) * 100;
});

const User = mongoose.model('User', userSchema);

module.exports = User;