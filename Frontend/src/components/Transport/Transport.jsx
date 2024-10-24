import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Transport = () => {
  const [transport, setTransport] = useState([]);

  useEffect(() => {
    // Fetch all tours from the backend
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:6600/trasnport"); // Assuming the backend API is at this route
        setTransport(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  return (
    <>
      <div className="bg-slate-400 h-[100vh] pt-20">
        <div className="text-center py-3">
          <h1 className="text-[50px] font-semibold lg:text-[50px] ">Transport</h1>
        </div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 gap-[20px] px-[50px] pb-[30px]">
          {transport.map((transport) => (
            <div className="relative inline-block overflow-hidden" key={transport._id}>
              <Link to={`/transport/${transport._id}`}>
              <div className="transition-transform duration-300 ease-in-out transform hover:scale-110">
              <img
                  src={transport.vehicleImage}
                  alt={transport.vehicleName}
                  className="w-full "
                />
                <p className="absolute inset-0 flex items-end justify-center text-white font-[400] text-[32px] md:text-[25px] mb-[30px]">
                  {transport.vehicleName}
                </p>
              </div>
                
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Transport