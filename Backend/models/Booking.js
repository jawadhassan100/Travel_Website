// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  transportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
