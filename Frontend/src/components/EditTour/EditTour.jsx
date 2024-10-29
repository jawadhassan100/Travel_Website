import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { useSnackbar } from 'notistack';

const EditTour = () => {
  const { id } = useParams(); // Get tour ID from URL parameters
  const navigate = useNavigate(); // To navigate after editing
  const [tour, setTour] = useState({
    cityName: '',
    duration: '',
    price: '',
    description: '',
    famousPlaces: []
  });
  const [loading, setLoading] = useState(true);
  const [tourImage, setTourImage] = useState(null); // State for main tour image
  const [famousPlacesImages, setFamousPlacesImages] = useState([]); // State for famous places images
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    const fetchTour = async () => {
      const token = localStorage.getItem('token'); // Assuming you have stored the token
      try {
        const response = await axios.get(`http://localhost:6600/tour/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setTour(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tour', error);
      }
    };

    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour((prev) => ({ ...prev, [name]: value }));
  };

  const handleFamousPlaceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPlaces = [...tour.famousPlaces];
    updatedPlaces[index][name] = value;
    setTour((prev) => ({ ...prev, famousPlaces: updatedPlaces }));
  };

  const handleTourImageChange = (e) => {
    setTourImage(e.target.files[0]);
  };

  const handleFamousPlacesImagesChange = (index, e) => {
    const updatedImages = [...famousPlacesImages];
    updatedImages[index] = e.target.files[0];
    setFamousPlacesImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming you have stored the token

    const formData = new FormData();
    formData.append('cityName', tour.cityName);
    formData.append('duration', tour.duration);
    formData.append('price', tour.price);
    formData.append('description', tour.description);

    // Append the new tour image if it exists
    if (tourImage) {
      formData.append('tourImage', tourImage);
    }

    // Append famous places and their images
    tour.famousPlaces.forEach((place, index) => {
      formData.append(`famousPlaces[${index}][name]`, place.name);
      if (famousPlacesImages[index]) {
        formData.append(`famousPlaces[${index}][image]`, famousPlacesImages[index]);
      } else {
        // If the user did not upload a new image, retain the existing one (if applicable)
        formData.append(`famousPlaces[${index}][image]`, place.image);
      }
    });

    try {
     const response =  await axios.put(`http://localhost:6600/tour/${id}`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      enqueueSnackbar( response.data.message || "Tour Edited Successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error('Error updating tour', error);
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
          <h1 className="text-4xl font-extrabold text-white mb-5 text-center">Edit Tour</h1>
          
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="cityName">Tour Name</label>
            <input
              type="text"
              id="cityName"
              name="cityName"
              value={tour.cityName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="duration">Duration (Days)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={tour.duration}
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
              value={tour.price}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={tour.description}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="tourImage">Tour Image</label>
            <input
              type="file"
              id="tourImage"
              onChange={handleTourImageChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {tour.famousPlaces.map((place, index) => (
            <div key={index} className="mb-4">
              <label className="block text-white mb-1" htmlFor={`famousPlaces[${index}].name`}>Famous Place Name</label>
              <input
                type="text"
                name="name"
                value={place.name}
                onChange={(e) => handleFamousPlaceChange(index, e)}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-white mb-1" htmlFor={`famousPlaces[${index}].image`}>Famous Place Image</label>
              <input
                type="file"
                onChange={(e) => handleFamousPlacesImagesChange(index, e)}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button type="submit" className="bg-lime-500 text-white py-2 px-4 rounded hover:bg-lime-600 transition duration-200">
            Update Tour
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTour;
