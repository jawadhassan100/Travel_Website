
const express = require('express');
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to create a new booking
router.post('/', createBooking);

// Route to get all bookings
router.get('/', auth, adminAuth , getAllBookings);

// Route to get a booking by ID
router.get('/:id',auth, adminAuth , getBookingById);

// Route to update a booking by ID
router.put('/:id', auth, adminAuth , updateBooking);

// Route to delete a booking by ID
router.delete('/:id', auth, adminAuth , deleteBooking);

module.exports = router;
