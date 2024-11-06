import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { useSnackbar } from 'notistack';
import config from '../../config/config';

const BASE_URL = config.BASE_URL;
const EditTransport = () => {
  const { id } = useParams(); // Get vehicle ID from URL parameters
  const navigate = useNavigate(); // To navigate after editing
  const [vehicle, setVehicle] = useState({
    vehicleName: '',
    fullVehicleName: '',
    price: '',
    about: '',
    vehicleImage: null,
    vehicleDetailImage: null ,
    vehicleImages: []
  });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageDetailPreview, setImageDetailPreview] = useState(null);
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState([]);
  const { enqueueSnackbar } = useSnackbar(); 


  useEffect(() => {
    const fetchVehicle = async () => {
      const token = localStorage.getItem('token'); // Assuming you have stored the token
      try {
        const response = await axios.get(`${BASE_URL}/trasnport/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setVehicle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicle', error);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'vehicleImage') {
      setVehicle({ ...vehicle, vehicleImage: files[0] });
      setImagePreview(URL.createObjectURL(files[0])); // Preview the main image
    } 
    else if (name === 'vehicleDetailImage'){
      setVehicle({ ...vehicle, vehicleDetailImage: files[0] });
      setImageDetailPreview(URL.createObjectURL(files[0])); // Preview the main image
    }
    
    else if (name === 'vehicleImages') {
      const selectedImages = Array.from(files);
      setVehicle({ ...vehicle, vehicleImages: selectedImages });
      setAdditionalImagesPreview(selectedImages.map(file => URL.createObjectURL(file))); // Preview additional images
    } else {
      setVehicle((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSpecificImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      // Update the specific image in vehicleImages array
      setVehicle((prev) => {
        const updatedImages = [...prev.vehicleImages];
        updatedImages[index] = file; // Replace the image at the specified index
        return { ...prev, vehicleImages: updatedImages };
      });
  
      // Update preview for the specific image
      setAdditionalImagesPreview((prev) => {
        const updatedPreviews = [...prev];
        updatedPreviews[index] = URL.createObjectURL(file); // Set preview for the selected image
        return updatedPreviews;
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming you have stored the token
    const formData = new FormData();

    // Append all fields to FormData
    formData.append('vehicleName', vehicle.vehicleName);
    formData.append('fullVehicleName', vehicle.fullVehicleName);
    formData.append('price', vehicle.price);
    formData.append('about', vehicle.about);
    
    // Append image files if they exist
    if (vehicle.vehicleImage) {
      formData.append('vehicleImage', vehicle.vehicleImage);
    }

    if (vehicle.vehicleDetailImage) {
      formData.append('vehicleDetailImage', vehicle.vehicleDetailImage);
    }
    // Append only changed additional images
  vehicle.vehicleImages.forEach((image, index) => {
    if (image) {
      formData.append(`vehicleImages[${index}]`, image); // Append each image individually
    }
  });
    try {
    const response = await axios.put(`${BASE_URL}/trasnport/${id}`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data', // Ensure FormData content type
        },
      });
      enqueueSnackbar( response.data.message || "Transport Edited Successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error('Error updating vehicle', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />
      <div className="w-full p-6 lg:ml-64 pt-32">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg text-white space-y-6">
          <h1 className="text-4xl font-extrabold text-white mb-5 text-center">Edit Vehicle</h1>
          
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="vehicleName">Vehicle Name</label>
            <input
              type="text"
              id="vehicleName"
              name="vehicleName"
              value={vehicle.vehicleName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="fullVehicleName">Full Vehicle Name</label>
            <input
              type="text"
              id="fullVehicleName"
              name="fullVehicleName"
              value={vehicle.fullVehicleName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="price">Price (PKR)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={vehicle.price}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="about">About</label>
            <textarea
              id="about"
              name="about"
              value={vehicle.about}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="vehicleImage">Main Vehicle Image</label>
            <input
              type="file"
              id="vehicleImage"
              name="vehicleImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && <img src={imagePreview} alt="Main Preview" className="mt-2 w-full h-40 object-cover" />}
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="vehicleDetailImage">Main Detail Image</label>
            <input
              type="file"
              id="vehicleDetailImage"
              name="vehicleDetailImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imageDetailPreview && <img src={imageDetailPreview} alt="Main Preview" className="mt-2 w-full h-40 object-cover" />}
          </div>

          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="vehicleImages">Additional Vehicle Images</label>
            {vehicle.vehicleImages.map((image, index) => (
  <div key={index} className="relative">
    <img
      src={additionalImagesPreview[index] || image} // Show existing or newly updated image preview
      alt={`Vehicle Image ${index + 1}`}
      className="w-full h-40 object-cover"
    />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleSpecificImageChange(e, index)} // Update specific image
      className="mt-2"
    />
  </div>
))}
          </div>

          <button type="submit" className="bg-lime-500 text-white py-2 px-4 rounded hover:bg-lime-600 transition duration-200">
            Update Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTransport;
