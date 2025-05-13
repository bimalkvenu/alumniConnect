const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAlumniProfile,
  updateAlumniProfile,
  uploadProfilePhoto
} = require('../controllers/alumniController');
const upload = require('../utils/fileUpload'); // Make sure you have this

// Alumni profile routes
router.route('/me')
  .get(protect, getAlumniProfile)
  .put(protect, updateAlumniProfile);

router.put('/me/photo', protect, upload.single('profilePhoto'), uploadProfilePhoto);

module.exports = router;