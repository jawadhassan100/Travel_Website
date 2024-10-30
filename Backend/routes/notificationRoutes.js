const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');

router.get('/', auth, adminAuth, notificationController.getNotifications);
router.patch('/:id', auth, adminAuth, notificationController.markAsRead);
router.delete('/:id', auth, adminAuth, notificationController.deleteNotification);

module.exports = router;
