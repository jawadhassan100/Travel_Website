import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { useSnackbar } from "notistack";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { enqueueSnackbar } = useSnackbar(); 

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:6600/booking", {
          headers: {
            Authorization: token,
          },
        });
        setBookings(response.data);
      } catch (err) {
        console.error("There was a problem fetching the bookings" , err);
      }
    };
    fetchBookings();
  }, []);

  // Delete booking
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:6600/booking/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setBookings(bookings.filter((booking) => booking._id !== id));
      enqueueSnackbar( response.data.message || "Contact Deleted 👍", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.error("Error deleting booking", error);
    }
  };

  // Open modal with booking details
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  // Close modal
  const closeModal = () => {
    setSelectedBooking(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with 0 if needed
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0 if needed
    const year = date.getFullYear(); // Get full year
    return `${month}/${day}/${year}`; // Return formatted date
  };

  if (!bookings) {
    return (
      <div className="flex justify-center bg-gray-800 items-center h-screen">
        <LoadingAnimation /> {/* Show loading animation */}
      </div>
    );
  }

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="w-full p-6 lg:ml-64 pt-24">
        <h1 className="text-4xl font-bold mb-6 text-center">All Bookings</h1>

        {/* Table for medium to large screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">User Email</th>
                <th className="p-4">Tour</th>
                <th className="p-4">Transport</th>
            
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-4">{booking.userName}</td>
                  <td className="p-4">{booking.userEmail}</td>
                  <td className="p-4">{booking?.tourId?.cityName || "N/A"}</td>
                  <td className="p-4">{booking?.transportId?.vehicleName || "N/A"}</td>
                 
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleViewBooking(booking)}
                      className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for small screens */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between">
              <h2 className="text-xl font-bold mb-2">{booking.userName}</h2>
              <p className="text-gray-300 mb-1">Email: {booking.userEmail}</p>
              <p className="text-gray-300 mb-1">Tour: {booking?.tourId?.cityName|| "N/A"}</p>
              <p className="text-gray-300 mb-1">Transport: {booking?.transportId?.vehicleName || "N/A"}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleViewBooking(booking)}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing booking details */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 mx-2 p-6 rounded-lg max-w-md w-full transform transition-all duration-300 scale-100 opacity-100 relative">
              
              <h2 className="text-xl font-bold mb-4">{selectedBooking.userName}</h2>
              <p className="text-gray-300 mb-2">Date: {formatDate(selectedBooking.bookingDate)}</p>
              <p className="text-gray-300 mb-2">WhatsApp: {selectedBooking.whatsAppNumber}</p>
              <p className="text-gray-300 mb-2">Tour: {selectedBooking.tourId?.cityName|| "N/A"}</p>
              <p className="text-gray-300 mb-2">Transport: {selectedBooking?.transportId?.vehicleName || "N/A"}</p>
              <p className="text-gray-300 mb-4">Total Price: {selectedBooking.totalPrice} pkr</p>
              <button
                onClick={closeModal}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;
