const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');

router.get('/', auth, adminAuth, dashboardController.getDashboardData);

module.exports = router;
