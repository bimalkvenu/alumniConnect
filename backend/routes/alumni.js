const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../controllers/authController');
const {
  getAlumniProfile,
  updateAlumniProfile,
  uploadProfilePhoto
} = require('../controllers/alumniController');

// Alumni profile routes
router.route('/me')
  .get(protect, getAlumniProfile)
  .put(protect, updateAlumniProfile);

router.route('/upload-profile-photo')
  .put(protect, upload.single('profilePhoto'), uploadProfilePhoto);

module.exports = router;