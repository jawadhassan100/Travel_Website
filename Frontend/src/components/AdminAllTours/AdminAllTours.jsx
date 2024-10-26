import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminAllTours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const token = localStorage.getItem('token'); // Assuming you have stored the token
      try {
        const response = await axios.get('http://localhost:6600/tour', {
          headers: {
            Authorization: token,
          },
        });
        setTours(response.data);
      } catch (error) {
        console.error('Error fetching tours', error);
      }
    };

    fetchTours();
  }, []);


  const handleDelete = async (tourId) => {
    try {
      await axios.delete(`http://localhost:6600/tour/${tourId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setTours(tours.filter(tour => tour._id !== tourId)); // Update state
    } catch (error) {
      console.error('Error deleting tour', error);
    }
  };


  return (
    <>
   
    <div className="bg-gray-900 p-5 h-full  ">
      <h1 className="text-4xl font-extrabold text-white mb-5 text-center">All Tours</h1>
     
        <div className="hidden md:block overflow-x-auto px-10">
          <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left py-3 px-4 text-white">Tour Name</th>
                <th className="text-left py-3 px-4 text-white">Duration</th>
                <th className="text-left py-3 px-4 text-white">Price</th>
                <th className="text-left py-3 px-4 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour._id} className="border-t border-gray-600">
                  <td className="py-3 px-4 text-gray-200">{tour.cityName}</td>
                  <td className="py-3 px-4 text-gray-200">{tour.duration} Days</td>
                  <td className="py-3 px-4 text-gray-200">{tour.price} pkr</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <Link to={`/edit-tour/${tour._id}`}>
                    <button
                      
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Edit
                    </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(tour._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
    <div className="md:hidden">
        {tours.length === 0 ? (
          <div className="text-center py-4">No tours found</div>
        ) : (
          tours.map((tour) => (
            <div key={tour._id} className="bg-gray-800  shadow-md rounded-lg mb-4 p-4 border border-gray-600">
              <h3 className="text-xl font-semibold mb-2  text-white">{tour.cityName}</h3>
              <p className="mb-2 text-white"><strong>Duration:</strong> {tour.duration} Days</p>
              <p className="mb-2 text-white"><strong>price:</strong> {tour.price} pkr</p>
              <div className="flex justify-between mt-4">
                <Link to={`/edit-tour/${tour._id}`} className="text-blue-600 hover:underline">Edit</Link>
                <button 
                  onClick={() => handleDelete(tour._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </>
  );
};

export default AdminAllTours;
