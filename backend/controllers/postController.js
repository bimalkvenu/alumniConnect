const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');

// @desc    Create post
// @route   POST /api/posts
// @access  Private (Admin)
exports.createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.create({
    author: req.user.id,
    title,
    content
  });

  res.status(201).json({
    success: true,
    data: post
  });
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort('-createdAt')
    .populate('author', 'email');

  res.json({
    success: true,
    count: posts.length,
    data: posts
  });
});