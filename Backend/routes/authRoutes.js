const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route for registering the specific user
router.post('/register', register);

// User login route
router.post('/login', login);

// User logout route
router.post('/logout', auth, logout);

// Admin protected route (for example purposes)
router.get('/admin', auth, adminAuth, (req, res) => {
    res.status(200).json({ msg: "Welcome Admin!" });
});

module.exports = router;
