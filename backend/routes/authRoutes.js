const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// Route for user registration
router.post('/register', registerUser);
// Route for user login
router.post('/login', loginUser);
// Route for getting user profile
router.get('/profile', protect, getUserProfile);

router.post('/upload-image', upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const ImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ ImageUrl });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;