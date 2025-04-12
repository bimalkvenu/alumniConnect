const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');

// GET all alumni
router.get('/', async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new alumni
router.post('/', async (req, res) => {
  const alumni = new Alumni({
    name: req.body.name,
    email: req.body.email,
    graduationYear: req.body.graduationYear,
    degree: req.body.degree,
    currentJob: req.body.currentJob
  });

  try {
    const newAlumni = await alumni.save();
    res.status(201).json(newAlumni);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;