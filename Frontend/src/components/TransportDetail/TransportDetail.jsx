import  { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios';
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import "./TransportDetail.css";
import config from '../../config/config';

const BASE_URL = config.BASE_URL;
const TransportDetail = () => {
    const { id } = useParams(); // Get tour ID from URL parameters
    const [transport, setTransport] = useState(null); // State to hold tour data
    const [loading, setLoading] = useState(true); // New loading state
  
    useEffect(() => {
      // Fetch tour details from backend by ID
      const fetchTour = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/trasnport/${id}`); // Adjust the API route if needed
          
          const transportData = response.data;
            // Parse 'about' field if it's a stringified JSON array
            if (typeof transportData.about === 'string') {
              transportData.about = JSON.parse(transportData.about);
            }
            setTransport(transportData)
          setLoading(false); 
        } catch (error) {
          console.error('Error fetching trasnport:', error);
          setLoading(false); 
        }
      };
      fetchTour();
    }, [id]);
  
   // Conditionally render the loader if data is still being fetched
   if (loading) {
    return (
      <div className="flex justify-center bg-gray-800 items-center h-screen">
        <LoadingAnimation /> {/* Show loading animation */}
      </div>
    );
  }
  
    return (
      <>
      <div className='overflow-hidden'>
  
      
        <div
          className="h-[90vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${transport.vehicleDetailImage})` }} 
        >
          <div className="flex ">
            <div className="lg:w-[896px] lg:px-[46px] md:px-[26px] sm:ml-4 z-0 w-[350px] md:w-[600px]">
              <h1 className="text-white lg:text-[60px]
               text-[30px] md:text-[60px]  sm:text-[60px]  lg:pt-[198px]
               md:pt-[198px] sm:pt-[200px] pt-[200px]  opacity-75">
              {transport.fullVehicleName}
              </h1>
              <p className="text-white text-[30px] font-light  w-[590px] opacity-75">
                Book Now
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
             RS: {transport.price}/Day
            </div>
            <Link to={`/book/transport/${transport._id}`}>
              <div className="text-black rounded-[8px] px-[40px] py-[7px] bg-[#CCF32F]">
                Book Now
              </div>
            </Link>
          </div>
        </div>
  
        <div className="bg-[#F4F4F4] lg:pl-[53px] mt-[20px]">
          <h2 className="text-[27px] pt-[20px] font-semibold">About This Trip</h2>
          <div className="lg:w-[55%] leading-[24.2px] pb-[20px]">
            {Array.isArray(transport.about) ? (
              <ul className="list-disc pl-5">
                {transport.about.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p>{transport.about}</p>
            )}
          </div>
        </div>
  
        <div className="bg-[#F4F4F4] mt-[20px] py-[20px]">
          <div className="transport-image-grid px-[44px] my-[20px]">
          {transport.vehicleImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image} // Use image directly here
                    alt={`Vehicle image ${index + 1}`} // Add alt text for accessibility
                    className="transport-image"
                  />
              </div>
            ))}
          </div>
        </div>
        </div>
      </>
    );
  };
export default TransportDetail