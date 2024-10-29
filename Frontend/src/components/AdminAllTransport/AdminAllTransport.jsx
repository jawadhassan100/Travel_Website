import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AdminAllTransport = () => {
  const [trasnport, setTrasnport] = useState([]);
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    const fetchTours = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await axios.get('http://localhost:6600/trasnport', {
          headers: {
            Authorization: token,
          },
        });
        setTrasnport(response.data);
      } catch (error) {
        console.error('Error fetching transport', error);
      }
    };

    fetchTours();
  }, []);

 
  const handleDelete = async (transportId) => {
    try {
   const response =  await axios.delete(`http://localhost:6600/trasnport/${transportId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setTrasnport(trasnport.filter(trasnport => trasnport._id !== transportId)); // Update state
      enqueueSnackbar( response.data.message || "Transport Deleted Successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.error('Error deleting tour', error);
    }
  };


  return (
    <>
   
    <div className="bg-gray-900 p-5 h-full  ">
      <h1 className="text-4xl font-extrabold text-white mb-5 text-center">All Transport</h1>
     
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
              {trasnport.map((transport) => (
                <tr key={transport._id} className="border-t border-gray-600">
                  <td className="py-3 px-4 text-gray-200">{transport.vehicleName}</td>
                  <td className="py-3 px-4 text-gray-200">{transport.fullVehicleName}</td>
                  <td className="py-3 px-4 text-gray-200">{transport.price} pkr</td>
                  <td className="py-3 px-4 flex space-x-2">
                  <Link to={`/edit-transport/${transport._id}`}>
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Edit
                    </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(transport._id)}
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
        {trasnport.length === 0 ? (
          <div className="text-center py-4">No tours found</div>
        ) : (
          trasnport.map((transport) => (
            <div key={transport._id} className="bg-gray-800  shadow-md rounded-lg mb-4 p-4 border border-gray-600">
              <h3 className="text-xl font-semibold mb-2  text-white">{transport.vehicleName}</h3>
              <p className="mb-2 text-white"><strong>Full Name:</strong> {transport.fullVehicleName}</p>
              <p className="mb-2 text-white"><strong>Price:</strong> {transport.price} pkr</p>
              <div className="flex justify-between mt-4">
                <Link to={`/edit-product/${transport._id}`} className="text-blue-600 hover:underline">Edit</Link>
                <button 
                  onClick={() => handleDelete(transport._id)}
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

export default AdminAllTransport;
