const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);


// GET all alumni
router.get('/', asyncHandler(async (req, res) => {
  const alumni = await Alumni.find();
  res.json(alumni);
}));

// GET single alumni
router.get('/:id', asyncHandler(async (req, res) => {
  const alumni = await Alumni.findById(req.params.id);
  if (!alumni) {
    res.status(404);
    throw new Error('Alumni not found');
  }
  res.json(alumni);
}));

// UPDATE alumni
router.put('/:id', asyncHandler(async (req, res) => {
  const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!alumni) {
    res.status(404);
    throw new Error('Alumni not found');
  }
  res.json(alumni);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const alumni = await Alumni.findByIdAndDelete(req.params.id);
  if (!alumni) {
    res.status(404);
    throw new Error('Alumni not found');
  }
  res.json({ message: 'Alumni removed' });
}));

// POST new alumni
router.post('/', asyncHandler(async (req, res) => {
  const alumni = new Alumni(req.body);
  const newAlumni = await alumni.save();
  res.status(201).json(newAlumni);
}));

module.exports = router;