import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TransportPage = () => {
    const [trasnport, setTrasnport] = useState([]);

    useEffect(() => {
      // Fetch all tours from the backend
      const fetchTours = async () => {
        try {
          const response = await axios.get("http://localhost:6600/trasnport"); // Assuming the backend API is at this route
          setTrasnport(response.data);
        } catch (error) {
          console.error("Error fetching tours:", error);
        }
      };
  
      fetchTours();
    }, []);
  
    return (
      <>
        <div className="bg-[#F3F3F3]">
          <div className="text-center py-3">
            <h1 className="text-[50px] lg:text-[60px]">Transport</h1>
          </div>
          
          {/* Show only 8 tours */}
          <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 gap-[20px] px-[50px] pb-[30px]">
            {trasnport.slice(0, 4).map((transport) => (
              <div className="relative inline-block overflow-hidden" key={transport._id}>
               
                  <div className="transition-transform duration-300 ease-in-out transform hover:scale-110">
                    <img
                      src={transport.vehicleImage}
                      alt={transport.vehicleName}
                      className="w-full"
                    />
                    <p className="absolute inset-0 flex items-end justify-center text-white font-[400] text-[32px] md:text-[25px] mb-[30px]">
                      {transport.vehicleName}
                    </p>
                  </div>
               
              </div>
            ))}
          </div>
  
          {/* Button to see all tours */}
          <div className="text-center pb-10">
            <Link to="/transport">
              <button className="bg-[#CCF32F] text-black font-semibold px-[40px] py-[15px] rounded-[8px]">
                See All Transports
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  };
export default TransportPage