const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
// const getNotifications = asyncHandler(async (req, res) => {
//  const notifications = await Notification.find({ user: req.user.id })
//    .sort({ createdAt: -1 });

//  res.status(200).json({
//    success: true,
//    count: notifications.length,
//    data: notifications
//  });
//});

//router.route('/')
//  .get(protect, getNotifications);

router.get('/', protect, asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: notifications // Ensure this is an array
  });
}));
module.exports = router;