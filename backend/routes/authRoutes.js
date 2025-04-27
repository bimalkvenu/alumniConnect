const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  upload,
  uploadProfilePhoto,
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  deleteAccount,
  forgotPassword,
  resetPassword
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

// Photo upload route (modified)
router.put(
  '/upload-profile-photo',
  protect,
  upload.single('profilePhoto'),
  uploadProfilePhoto
);


module.exports = router;