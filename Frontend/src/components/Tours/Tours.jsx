import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Tours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // Fetch all tours from the backend
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:6600/tour"); // Assuming the backend API is at this route
        setTours(response.data);
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
          <h1 className="text-[50px] font-semibold lg:text-[50px] ">Tour Sights</h1>
        </div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 gap-[20px] px-[50px] pb-[30px]">
          {tours.map((tour) => (
            <div className="relative inline-block overflow-hidden" key={tour._id}>
              <Link to={`/tour/${tour._id}`}>
              <div className="transition-transform duration-300 ease-in-out transform hover:scale-110">
              <img
                  src={tour.tourImage}
                  alt={tour.cityName}
                  className="w-full "
                />
                <p className="absolute inset-0 flex items-end justify-center text-white font-[400] text-[32px] md:text-[25px] mb-[30px]">
                  {tour.cityName}
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

export default Tours;
