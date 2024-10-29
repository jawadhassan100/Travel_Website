const Booking = require('../models/Booking');
const sendMail = require("../utils/sendMail");
const bookingEmail = require("../utils/Templates/bookingEmail");
const Tour = require('../models/Tour'); // Import Tour model
const Transport = require('../models/Trasnport'); // Import Transport model
const Notification = require('../models/Notification');


// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { tourId, transportId, userEmail, userName , whatsAppNumber} = req.body;

    // Check if required fields are provided
    if (!userEmail || !userName || (!tourId && !transportId)) {
      return res.status(400).json({ message: 'User email, user name, and at least one of tourId or transportId are required' });
    }

    let totalPrice = 0;
    let tourName = '';
    let transportType = '';
    let bookingMessage = '';

    // Fetch tour and transport details if they exist
    if (tourId) {
      const tour = await Tour.findById(tourId);
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      totalPrice += tour.price; // Add tour price
      tourName = tour.cityName;  // Get tour name
      bookingMessage += `Tour booked: ${tourName}. `;
    }

    if (transportId) {
      const transport = await Transport.findById(transportId);
      if (!transport) {
        return res.status(404).json({ message: 'Transport not found' });
      }
      totalPrice += transport.price; // Add transport price
      transportType = transport.vehicleName; // Get transport type
      bookingMessage += `Transport booked: ${transportType}.`;
    }

    const newBooking = new Booking({
      tourId: tourId || null, // Set to null if not booked
      transportId: transportId || null, // Set to null if not booked
      totalPrice,
      whatsAppNumber,
      userEmail,
      userName,
      tourName,
      transportType
    });

    await newBooking.save();

     // Create a notification for the new booking
     const notification = new Notification({
      type: 'Booking',
      message:  `New booking created by ${userName}. ${bookingMessage}`,
      isNewisNewNotifcation: true,
    });
    await notification.save();
    // Prepare email details
    const subject = "Booking Confirmation";
    const htmlContent = bookingEmail(userName, tourName, transportType, totalPrice);

    // Send order confirmation email
    sendMail(userEmail, subject, htmlContent);

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking ,totalPrice: newBooking.totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

  
  // Get all bookings
  exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find().populate('tourId transportId');
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  };
  
  // Get a booking by ID
  exports.getBookingById = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id).populate('tourId transportId');
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.status(200).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching booking', error });
    }
  };
  
  // Update a booking by ID
  exports.updateBooking = async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating booking', error });
    }
  };
  
  // Delete a booking by ID
  exports.deleteBooking = async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting booking', error });
    }
  };