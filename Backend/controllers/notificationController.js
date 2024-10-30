// controllers/notificationController.js

const Notification = require('../models/Notification');

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    const unreadCount = await Notification.countDocuments({ isNewNotification: true });
    res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { isNewNotification: false }, { new: true });

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error });
  }
};

// delete the notifcations
exports.deleteNotification = async (req , res) => {
  try {
    const { id } = req.params;
    const deleteNotification = await Notification.findByIdAndDelete(id)
    res.status(200).json({message: 'Notification deleted successfully' , deleteNotification})
  } catch (error) {
    res.status(500).json({message: 'Error deleting notifiaction' , error})
  }
}
