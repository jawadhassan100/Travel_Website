import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { useSnackbar } from 'notistack';
import config from '../../config/config';

const BASE_URL = config.BASE_URL
const CreateTransport = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicleImage: null,
    vehicleDetailImage: null ,
    vehicleName: '',
    fullVehicleName: '',
    price: '',
    about: [],
    vehicleImages: Array(5).fill(null),
  });
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);
  const [aboutPoint, setAboutPoint] = useState('');

  const handleInputChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    setVehicleData({ ...vehicleData, vehicleImage: e.target.files[0] });
  };
  const handleDetailImageChange = (e) => {
    setVehicleData({ ...vehicleData, vehicleDetailImage: e.target.files[0] });
  };

  const handleAdditionalImageChange = (e, index) => {
    const updatedImages = [...vehicleData.vehicleImages];
    updatedImages[index] = e.target.files[0];
    setVehicleData({ ...vehicleData, vehicleImages: updatedImages });
  };

  const handleAddPoint = () => {
    if (aboutPoint.trim()) {
      setVehicleData({ ...vehicleData, about: [...vehicleData.about, aboutPoint] });
      setAboutPoint('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('vehicleName', vehicleData.vehicleName);
    formData.append('fullVehicleName', vehicleData.fullVehicleName);
    formData.append('price', vehicleData.price);
    formData.append('about', JSON.stringify(vehicleData.about));
    
    
    if (vehicleData.vehicleImage) {
      formData.append('vehicleImage', vehicleData.vehicleImage);
    }
    if (vehicleData.vehicleDetailImage) {
      formData.append('vehicleDetailImage', vehicleData.vehicleDetailImage);
    }
    vehicleData.vehicleImages.forEach((image) => {
      if (image) {
        formData.append('vehicleImages', image);
      }
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}/trasnport`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      enqueueSnackbar( response.data.message || "Tour Created Successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
      console.log('Vehicle added successfully:', response.data);

      setVehicleData({
        vehicleImage: null,
        vehicleDetailImage: null,
        vehicleName: '',
        fullVehicleName: '',
        price: '',
        about: [],
        vehicleImages: Array(5).fill(null),
      }); 
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />
      <div className="w-full p-6 lg:ml-64 pt-32">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg text-white space-y-6">
          <h2 className="text-4xl font-bold mb-6 text-center">Add Vehicle</h2>

          {/* Vehicle Image */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Vehicle Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Vehicle Detail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleDetailImageChange}
              className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
              required
            />
          </div>

          {/* Vehicle Name */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              value={vehicleData.vehicleName}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
              required
            />
          </div>

          {/* Full Vehicle Name */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Full Vehicle Name</label>
            <input
              type="text"
              name="fullVehicleName"
              value={vehicleData.fullVehicleName}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Price (PKR)</label>
            <input
              type="number"
              name="price"
              value={vehicleData.price}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
              required
            />
          </div>

          {/* About Points */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Description</label>
            <div className="flex">
              <input
                type="text"
                value={aboutPoint}
                onChange={(e) => setAboutPoint(e.target.value)}
                className="bg-gray-700 text-gray-300 rounded p-2 flex-grow focus:outline-none"
                placeholder="Enter a point"
              />
              <button
                type="button"
                onClick={handleAddPoint}
                className="bg-lime-600 text-white rounded px-4 ml-2 hover:bg-lime-700 transition"
              >
                Add
              </button>
            </div>
            <ul className="list-disc list-inside">
              {vehicleData.about.map((point, index) => (
                <li key={index} className="text-gray-300">{point}</li>
              ))}
            </ul>
          </div>

          {/* Additional Images */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Additional Images ({vehicleData.vehicleImages.filter(img => img !== null).length}/5)</label>
            {vehicleData.vehicleImages.map((_, index) => (
              <input
                key={index}
                type="file"
                accept="image/*"
                onChange={(e) => handleAdditionalImageChange(e, index)}
                className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-lime-600 py-2 rounded-lg font-semibold hover:bg-lime-700 transition"
          >
            Submit Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTransport;
