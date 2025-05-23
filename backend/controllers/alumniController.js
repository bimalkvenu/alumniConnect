const Alumni = require('../models/AlumniProfile');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get alumni profile
// @route   GET /api/alumni/me
// @access  Private
exports.getAlumniProfile = asyncHandler(async (req, res, next) => {
  try {
    const alumni = await Alumni.findOne({ user: req.user.id })
      .populate('user', 'email role profilePhoto');
    
    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni profile not found'
      });
    }

    // Combine user and alumni data
    const responseData = {
      ...alumni.toObject(),
      id: alumni.user._id,
      email: alumni.user.email,
      role: alumni.user.role,
      profilePhoto: alumni.user.profilePhoto
    };

    res.status(200).json({
      success: true,
      data: responseData
    });
  } catch (error) {
    next(new ErrorResponse('Server error', 500));
  }
});

// @desc    Update alumni profile
// @route   PUT /api/alumni/me
// @access  Private
exports.updateAlumniProfile = asyncHandler(async (req, res, next) => {
  const {
    graduationYear,
    degree,
    currentRole,
    currentCompany,
    location,
    phone,
    bio,
    skills,
    education,
    experience,
    socialLinks
  } = req.body;

  // Calculate profile completion
  const requiredFields = ['graduationYear', 'degree', 'currentRole'];
  const completedFields = requiredFields.filter(field => req.body[field]);
  const completionPercentage = (completedFields.length / requiredFields.length) * 100;

  const profileData = {
    graduationYear,
    degree,
    currentRole,
    currentCompany,
    location,
    phone,
    bio,
    skills: Array.isArray(skills) ? skills : [],
    education: Array.isArray(education) ? education : [],
    experience: Array.isArray(experience) ? experience : [],
    socialLinks: socialLinks || {},
    profileComplete: completionPercentage === 100
  };

  let alumni = await Alumni.findOneAndUpdate(
    { user: req.user.id },
    profileData,
    { 
      new: true,
      upsert: true, // Create if doesn't exist
      runValidators: true 
    }
  ).populate('user', 'name email profilePhoto role');

  res.status(200).json({
    success: true,
    data: alumni
  });
});

// @desc    Upload profile photo
// @route   PUT /api/alumni/me/photo
// @access  Private
exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  const photoUrl = `/uploads/profile-photos/${req.file.filename}`;
  
  // Update both User and Alumni records
  const [user, alumni] = await Promise.all([
    User.findByIdAndUpdate(
      req.user.id,
      { profilePhoto: photoUrl },
      { new: true }
    ).select('-password'),
    
    Alumni.findOneAndUpdate(
      { user: req.user.id },
      { $set: { 'user.profilePhoto': photoUrl } },
      { new: true }
    ).populate('user', 'name email profilePhoto role')
  ]);

  res.status(200).json({
    success: true,
    data: {
      user,
      alumni
    }
  });
});