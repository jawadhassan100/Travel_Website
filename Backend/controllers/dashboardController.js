const Tour = require('../models/Tour')
const Contact = require('../models/Contact');
const Booking = require('../models/Booking');
const Vehicle = require('../models/Trasnport');

exports.getDashboardData = async (req, res) => {
    try {

     
        const totalTours = await Tour.countDocuments({});

        
        const totalVehicle = await Vehicle.countDocuments({});

       
        const totalBooking = await Booking.countDocuments({});

      
        const totalContact = await Contact.countDocuments({});

       
        
        // Send the response
        res.json({
            totalTours,
            totalVehicle,
            totalBooking,
            totalContact 
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};