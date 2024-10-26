    import { useNavigate, useParams } from 'react-router-dom';
    import { useState } from 'react';
    import axios from 'axios';
    import { useSnackbar } from "notistack";

    const BookingForm = () => {
    const { type, id } = useParams(); // type will be 'tour' or 'transport' based on the URL
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
     

    const handleBooking = async (e) => {
        e.preventDefault();

        try {
        const bookingData = {
            userName,
            userEmail,
            whatsAppNumber,
            [type === 'tour' ? 'tourId' : 'transportId']: id // Dynamically set the ID based on type
        };

        const response = await axios.post('http://localhost:6600/booking', bookingData);
        if (response.status === 201) {
          enqueueSnackbar( response.data.message || "Booked Successfully", {
            variant: "success",
            autoHideDuration: 1000,
          });
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (error) {
        if (error.response) {
          enqueueSnackbar(error.response.data.message || "Booking Failed", {
            variant: "error",
            autoHideDuration: 1000,
          });
        }
      }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 pt-20">
      <form className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full" onSubmit={handleBooking}>
        <h2 className="text-2xl text-white font-semibold mb-6 text-center">
          {type === 'tour' ? 'Book Your Tour' : 'Book Your Transport'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">WhatsApp Number</label>
          <input
            type="text"
            value={whatsAppNumber}
            onChange={(e) => setWhatsAppNumber(e.target.value)}
            className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Book Now
        </button>
      </form>
    </div>
    );
    };

    export default BookingForm;
