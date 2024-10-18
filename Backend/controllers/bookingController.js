const Booking = require('../models/Booking');
const sendMail = require("../utils/sendMail");
const bookingEmail = require("../utils/Templates/bookingEmail");
const Tour = require('../models/Tour'); // Import Tour model
const Transport = require('../models/Trasnport'); // Import Transport model
// Create a new booking
exports.createBooking = async (req, res) => {
    try {
      const { tourId, transportId, userEmail, userName } = req.body;
  
       // Check if required fields are provided
    if (!tourId || !transportId || !userEmail || !userName ) {
        return res.status(400).json({ message: 'All fields are required' });
      }
       // Fetch tour and transport details
    const tour = await Tour.findById(tourId);
    const transport = await Transport.findById(transportId);

    // Ensure both tour and transport are found
    if (!tour || !transport) {
      return res.status(404).json({ message: 'Tour or transport not found' });
    }

    // Calculate total price (sum of tour price and transport price)
    const totalPrice = tour.price + transport.price; // Assuming `price` exists on both models
    const tourName = tour.cityName;
    const transportType = transport.vehicleName
    console.log('Tour Name:', tourName); // Log tour name
    console.log('Transport Type:', transportType); // Log transport type
    console.log('Total Price:', totalPrice); // Log total price 

      const newBooking = new Booking({
        tourId,
        transportId,
        totalPrice,
        userEmail,
        userName,
        tourName, 
        transportType 
      });
  
      await newBooking.save();
  
      // Prepare email details
    const subject = "Booking Confirmation";
    const htmlContent = bookingEmail(userName,  tourName , transportType , totalPrice);

    // Send order confirmation email
    sendMail(userEmail, subject, htmlContent);
  
      res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
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