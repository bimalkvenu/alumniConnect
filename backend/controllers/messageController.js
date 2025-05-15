const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// @desc    Send message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = asyncHandler(async (req, res) => {
  const { receiver, content } = req.body;

  const message = await Message.create({
    sender: req.user.id,
    receiver,
    content
  });

  res.status(201).json({
    success: true,
    data: message
  });
});

// @desc    Get my conversations
// @route   GET /api/messages
// @access  Private
exports.getMyMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user.id },
      { receiver: req.user.id }
    ]
  })
  .sort('-createdAt')
  .populate('sender receiver', 'email');

  res.json({
    success: true,
    data: messages
  });
});