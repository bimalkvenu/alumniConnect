const Alumni = require('../models/Alumni');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get alumni profile
// @route   GET /api/alumni/me
// @access  Private
exports.getAlumniProfile = asyncHandler(async (req, res, next) => {
  const alumni = await Alumni.findOne({ user: req.user.id })
    .populate('user', 'name email profilePhoto');
  
  if (!alumni) {
    return next(new ErrorResponse('Alumni profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: alumni
  });
});

// @desc    Create or update alumni profile
// @route   PUT /api/alumni/me
// @access  Private
exports.updateAlumniProfile = asyncHandler(async (req, res, next) => {
  // Calculate profile completion
  const requiredFields = ['graduationYear', 'degree', 'currentRole'];
  const completedFields = requiredFields.filter(field => req.body[field]);
  const completionPercentage = (completedFields.length / requiredFields.length) * 100;
  
  const profileData = {
    ...req.body,
    profileComplete: completionPercentage === 100
  };

  let alumni = await Alumni.findOne({ user: req.user.id });

  if (!alumni) {
    // Create new alumni profile
    profileData.user = req.user.id;
    alumni = await Alumni.create(profileData);
  } else {
    // Update existing profile
    alumni = await Alumni.findOneAndUpdate(
      { user: req.user.id },
      profileData,
      { new: true, runValidators: true }
    );
  }

  // Populate user data
  alumni = await Alumni.findById(alumni._id).populate('user', 'name email profilePhoto');

  res.status(200).json({
    success: true,
    data: alumni
  });
});

// @desc    Upload profile photo
// @route   PUT /api/alumni/upload-profile-photo
// @access  Private
exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  // Update user's profile photo
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profilePhoto: `/uploads/profile-photos/${req.file.filename}` },
    { new: true }
  ).select('-password');

  res.status(200).json({
    success: true,
    data: user
  });
});