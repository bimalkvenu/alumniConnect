const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middleware/authMiddleware'); // Added adminProtect
const {
  upload,
  uploadProfilePhoto,
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  deleteAccount,
  forgotPassword,
  resetPassword,
  registerAdmin // Added new admin registration controller
} = require('../controllers/authController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

// Protected routes (require valid JWT)
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.delete('/delete', protect, deleteAccount);

// Admin-only routes
router.post('/admin/register', protect, adminProtect, registerAdmin); // New admin registration route

// Photo upload route
router.put(
  '/upload-profile-photo',
  protect,
  upload.single('profilePhoto'),
  uploadProfilePhoto
);

module.exports = router;