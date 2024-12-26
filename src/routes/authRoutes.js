const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

// Register new user
router.post('/register', registerUser);

// Login user and return JWT token
router.post('/login', loginUser);

// Get user profile (authenticated)
router.get('/profile', authenticate, getUserProfile);

// Protect the /admin route (only accessible by admins)
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: 'Welcome Admin' });
});

module.exports = router;
