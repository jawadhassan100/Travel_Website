import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios';

const TransportDetail = () => {
    const { id } = useParams(); // Get tour ID from URL parameters
    const [transport, setTransport] = useState(null); // State to hold tour data
  
    useEffect(() => {
      // Fetch tour details from backend by ID
      const fetchTour = async () => {
        try {
          const response = await axios.get(`http://localhost:6600/trasnport/${id}`); // Adjust the API route if needed
          setTransport(response.data); // Store fetched tour data
        } catch (error) {
          console.error('Error fetching trasnport:', error);
        }
      };
      fetchTour();
    }, [id]);
  
    if (!transport) {
      return <div>Loading...</div>; 
    }
  
    return (
      <>
      <div>
  
      
        <div
          className="h-[90vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${transport.vehicleImage})` }} 
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
            <a href={`/book/${transport._id}`}>
              <div className="text-black rounded-[8px] px-[40px] py-[7px] bg-[#CCF32F]">
                Book Now
              </div>
            </a>
          </div>
        </div>
  
        <div className="bg-[#F4F4F4] lg:pl-[53px] mt-[20px]">
          <h2 className="text-[27px] pt-[20px] font-semibold">About This Trip</h2>
          <div className="lg:w-[55%] leading-[24.2px] pb-[20px]">
            {transport.about}
          </div>
        </div>
  
        <div className="bg-[#F4F4F4] mt-[20px] py-[20px]">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3 px-[44px] my-[20px]">
          {transport.vehicleImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image} // Use image directly here
                    alt={`Vehicle image ${index + 1}`} // Add alt text for accessibility
                    className="w-[438px] h-[250px]"
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