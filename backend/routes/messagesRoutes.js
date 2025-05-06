const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Message = require('../models/Message');

// @desc    Get user messages
// @route   GET /api/messages
// @access  Private
//const getMessages = asyncHandler(async (req, res) => {
//  const messages = await Message.find({
//    $or: [
//      { sender: req.user.id },
//      { recipient: req.user.id }
//    ]
//  })
//  .sort({ createdAt: -1 })
//  .populate('sender', 'name email');

//  res.status(200).json({
//    success: true,
//    count: messages.length,
//    data: messages
//  });
//});

//router.route('/')
//  .get(protect, getMessages);

router.get('/', protect, asyncHandler(async (req, res) => {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    })
    .sort({ createdAt: -1 });
  
    res.status(200).json({
      success: true,
      data: messages // Ensure this is an array
    });
  }));

module.exports = router;