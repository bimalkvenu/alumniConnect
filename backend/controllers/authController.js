const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const multer = require('multer');
const path = require('path');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register new user
const registerUser = async (req, res) => {
  try {
    const { name, registrationNumber, email, password, year, section, program, role } = req.body;

    // Trim all string inputs
    const trimmedData = {
      name: name?.trim(),
      registrationNumber: registrationNumber?.trim(),
      email: email?.trim(),
      password: password, // Don't trim password
      year: year?.trim(),
      section: section?.trim(),
      program: program?.trim(),
      role: role?.trim()
    };

    // Validation - check for empty strings after trim
    if (!trimmedData.name || !trimmedData.registrationNumber || !trimmedData.email || 
        !trimmedData.password || !trimmedData.year || !trimmedData.section || !trimmedData.program) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields are required and cannot be empty' 
      });
    }

    // Check for existing user (this is redundant with unique indexes but provides better error messages)
    const userExists = await User.findOne({ 
      $or: [
        { email: trimmedData.email },
        { registrationNumber: trimmedData.registrationNumber }
      ]
    });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User with this email or registration number already exists'
      });
    }

    // Create user with trimmed data
    const user = await User.create({
      name: trimmedData.name,
      registrationNumber: trimmedData.registrationNumber,
      email: trimmedData.email,
      password: trimmedData.password,
      year: trimmedData.year,
      section: trimmedData.section,
      program: trimmedData.program,
      role: trimmedData.role || 'student'
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        registrationNumber: user.registrationNumber,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    let errorMessage = 'Registration failed';
    let statusCode = 500;
    
    // Handle duplicate key errors from MongoDB unique indexes
    if (error.code === 11000) {
      statusCode = 400;
      if (error.keyPattern.email) {
        errorMessage = 'Email already exists';
      } else if (error.keyPattern.registrationNumber) {
        errorMessage = 'Registration number already exists';
      }
    } 
    // Handle validation errors
    else if (error.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
    }
    // Handle empty field errors from our manual validation
    else if (error.message.includes('required')) {
      statusCode = 400;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
};

// @desc    Authenticate user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return complete user data (excluding sensitive fields)
    const userData = await User.findById(user._id).select('-password -resetPasswordToken -resetPasswordExpire');

    res.status(200).json({
      success: true,
      token,
      data: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
};

// @desc    Get current user data
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -resetPasswordToken -resetPasswordExpire');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error fetching user data'
    });
  }
};

// @desc    Update user profile
const updateProfile = async (req, res) => {
  try {
    // Filter allowed fields
    const allowedFields = [
      'name', 'email', 'phone', 'address', 'program', 'year', 
      'section', 'bio', 'interests', 'gpa', 'achievements', 
      'courses', 'activities', 'socialLinks', 'profileComplete'
    ];
    
    const fieldsToUpdate = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        fieldsToUpdate[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id, 
      fieldsToUpdate, 
      {
        new: true,
        runValidators: true
      }
    ).select('-password -resetPasswordToken -resetPasswordExpire');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update error:', error);
    
    let errorMessage = 'Update failed';
    let statusCode = 500;
    
    if (error.code === 11000) {
      statusCode = 400;
      errorMessage = 'Email already in use';
    } else if (error.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
};

// @desc    Delete user account
const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(400).json({
      success: false,
      error: 'Delete failed'
    });
  }
};

// @desc    Forgot password
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No user with that email'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Set reset token and expiry (1 hour)
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    
    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

    // Send email using the sendEmail function
    const message = `You are receiving this email because you requested a password reset. Please make a PUT request to: \n\n ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Token',
      message
    });

    res.status(200).json({
      success: true,
      data: 'Email sent'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: 'Email could not be sent'
    });
  }
};

// @desc    Reset password
const resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during password reset'
    });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile-photos/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Add this new controller function
const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    const photoUrl = `/uploads/profile-photos/${req.file.filename}`;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilePhoto: photoUrl },
      { new: true }
    ).select('-password -resetPasswordToken -resetPasswordExpire');

    res.json({ 
      success: true, 
      data: updatedUser,
      message: 'Profile photo updated successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to upload profile photo' 
    });
  }
};

module.exports = {
  uploadProfilePhoto,
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  deleteAccount,
  forgotPassword,
  resetPassword,
  upload
};