// models/Notification.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Booking', 'Contact'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isNewNotifcation: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
