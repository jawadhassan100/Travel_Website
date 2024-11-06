import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { useSnackbar } from 'notistack';

const CreateTour = () => {
  const [tourData, setTourData] = useState({
    cityName: '',
    duration: '',
    price: '',
    description: [''],
    famousPlaces: [
      { name: '', image: null },
      { name: '', image: null },
      { name: '', image: null },
      { name: '', image: null },
      { name: '', image: null }
    ]
  });
  const { enqueueSnackbar } = useSnackbar(); 
  
  const [tourImage, setTourImage] = useState(null);
  const [tourDetailImage, setTourDetailImage] = useState(null);
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);
  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };
  const handleAboutChange = (e, index) => {
    const updatedDesc = [...tourData.description];
    updatedDesc[index] = e.target.value;
    setTourData({ ...tourData, description: updatedDesc });
  };
  const addAboutPoint  = () => {
    setTourData({ ...tourData, description: [...tourData.description, ''] });
  };
  const handleFamousPlaceChange = (e, index) => {
    const updatedPlaces = [...tourData.famousPlaces];
    updatedPlaces[index][e.target.name] = e.target.value;
    setTourData({ ...tourData, famousPlaces: updatedPlaces });
  };

  const handleFileChange = (e) => {
    setTourImage(e.target.files[0]);
  };

  const handleFileDetailChange = (e) => {
    setTourDetailImage(e.target.files[0]);
  };
  

  const handleFamousPlaceImageChange = (e, index) => {
    const updatedPlaces = [...tourData.famousPlaces];
    updatedPlaces[index].image = e.target.files[0];
    setTourData({ ...tourData, famousPlaces: updatedPlaces });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('cityName', tourData.cityName);
    formData.append('duration', tourData.duration);
    formData.append('price', tourData.price);
    formData.append('description', JSON.stringify(tourData.description));

    if (tourImage) {
      formData.append('tourImage', tourImage);
    }
    if (tourDetailImage) {
      formData.append('tourDetailImage', tourDetailImage);
    }

    tourData.famousPlaces.forEach((place, index) => {
      if (place.name) {
        formData.append(`famousPlaces[${index}][name]`, place.name);
      }
      if (place.image) {
        formData.append(`famousPlaces[${index}][image]`, place.image);
      }
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:6600/tour', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        }
      });
      enqueueSnackbar( response.data.message || "Tour Created Successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
      console.log('Tour added successfully:', response.data);
    } catch (error) {
      console.error('Error adding tour:', error);
    }
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
        <Sidebar/>
    <div className="w-full p-6 lg:ml-64 pt-32">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg text-white space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Add Tour</h1>
        <div className="flex flex-col">
          <label className="font-semibold">City Name:</label>
          <input
            type="text"
            name="cityName"
            value={tourData.cityName}
            onChange={handleChange}
           className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Duration (days):</label>
          <input
            type="number"
            name="duration"
            value={tourData.duration}
            onChange={handleChange}
            className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Price:</label>
          <input
            type="number"
            name="price"
            value={tourData.price}
            onChange={handleChange}
            className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
            required
          />
        </div>

         {/* About Section with bullet points */}
         <div className="flex flex-col">
            <label className="font-semibold">About:</label>
            {tourData.description.map((point, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handleAboutChange(e, index)}
                  className="bg-gray-700 text-gray-300 rounded p-2 flex-1 focus:outline-none"
                  placeholder={`Point ${index + 1}`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAboutPoint}
              className="mt-2 bg-green-500  text-white font-semibold px-3 py-2 rounded hover:bg-green-600"
            >
              Add Another Point
            </button>
          </div>


        <div className="flex flex-col">
          <label className="font-semibold">Tour Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
             className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Tour Detail Image:</label>
          <input
            type="file"
            onChange={handleFileDetailChange}
             className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
            required
          />
        </div>

        <h3 className="text-xl font-semibold mt-8">Famous Places (Max 5):</h3>
        {tourData.famousPlaces.map((place, index) => (
          <div key={index} className="space-y-3 bg-gray-70 dark:bg-gray-800 p-4  rounded-lg shadow-md">
            <div className="flex flex-col">
              <label className="font-semibold">Place Name:</label>
              <input
                type="text"
                name="name"
                value={place.name}
                onChange={(e) => handleFamousPlaceChange(e, index)}
                 className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Place Image:</label>
              <input
                type="file"
                onChange={(e) => handleFamousPlaceImageChange(e, index)}
                 className="bg-gray-700 text-gray-300 rounded p-2 focus:outline-none"
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold p-3 rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateTour;
