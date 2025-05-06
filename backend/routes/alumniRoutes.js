const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Alumni = require('../models/Alumni');

// @desc    Get alumni profile
// @route   GET /api/alumni/me
// @access  Private
const getAlumniProfile = asyncHandler(async (req, res) => {
  const alumni = await Alumni.findById(req.user.id)
    .select('-password -resetPasswordToken -resetPasswordExpire')
    .populate('experience'); // If you want to populate any references

  if (!alumni) {
    res.status(404);
    throw new Error('Alumni profile not found');
  }

  res.status(200).json({
    success: true,
    data: alumni
  });
});

router.get('/me', protect, getAlumniProfile);

module.exports = router;