import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios';
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation"
import "./TourDetail.css"

const TourDetail = () => {
  const { id } = useParams(); // Get tour ID from URL parameters
  const [tour, setTour] = useState(null); // State to hold tour data

  useEffect(() => {
    // Fetch tour details from backend by ID
    const fetchTour = async () => {
      try {
        const response = await axios.get(`http://localhost:6600/tour/${id}`); // Adjust the API route if needed
        const transportData = response.data;

        // Log the fetched data
        console.log('Fetched tour data:', transportData);
        
        // Parse 'about' field if it's a stringified JSON array
        if (typeof transportData.about === 'string') {
          transportData.about = JSON.parse(transportData.about);
        }
        
        // Parse description if it's a stringified array
        if (typeof transportData.description === 'string') {
          // Remove unnecessary quotes and parse the string into an array
          transportData.description = JSON.parse(transportData.description);
        }
        
        setTour(transportData);
      } catch (error) {
        console.error('Error fetching tour:', error);
      }
    };
    
    fetchTour();
  }, [id]);

  if (!tour) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation /> {/* Show loading animation */}
      </div>
    );
  }

  return (
    <>
      <div className='overflow-hidden'>
        <div
          className="h-[90vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${tour.tourImage})` }} 
        >
          <div className="flex ">
            <div className="lg:w-[896px] lg:px-[46px] md:px-[26px] sm:ml-4 z-0 w-[350px] md:w-[600px]">
              <h1 className="text-white lg:text-[60px] text-[30px] md:text-[60px] sm:text-[60px] lg:pt-[298px] md:pt-[298px] sm:pt-[200px] pt-[200px] opacity-75">
                {tour.duration} Days {tour.cityName} Tour
              </h1>
              <p className="text-white text-[22px] font-light lg:pl-[150px] w-[590px] opacity-75">
                {tour.cityName}, Pakistan
              </p>
            </div>
          </div>
        </div>

        <div className="grid place-items-center">
          <div
            className="flex items-center gap-5 bg-slate-100 px-5 -mt-16 rounded-md shadow-md shadow-black"
          >
            <div
              className="bg-[#EAECE3] -ml-5 rounded-[25px] px-6 py-14 shadow-sm shadow-gray-300 text-[20px] font-bold"
            >
              RS: {tour.price}/Day
            </div>
            <a href={`/book/tour/${tour._id}`}>
              <div className="text-black rounded-[8px] px-[40px] py-[7px] bg-[#CCF32F]">
                Book Now
              </div>
            </a>
          </div>
        </div>

        <div className="bg-[#F4F4F4] lg:pl-[53px] mt-[20px]">
          <h2 className="text-[27px] pt-[20px] font-semibold">About This Trip</h2>
          <div className="lg:w-[55%] leading-[24.2px] pb-[20px]">
            {Array.isArray(tour.description) ? (
              <ul className="list-disc pl-5">
                {tour.description.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p>{tour.description}</p>
            )}
          </div>
        </div>

        <div className="bg-[#F4F4F4] mt-[20px] py-[20px]">
        <div className="image-grid px-[44px] my-[20px]">
  {tour.famousPlaces.map((place, index) => (
    <div key={index} className="relative">
      <img
        src={place.image}
        alt={place.name}
        className="tour-image"
      />
      <p className="absolute inset-0 flex items-end justify-center text-white font-[400] text-[32px] mb-[20px]">
        {place.name}
      </p>
    </div>
  ))}
</div>

        </div>
      </div>
    </>
  );
};

export default TourDetail;
