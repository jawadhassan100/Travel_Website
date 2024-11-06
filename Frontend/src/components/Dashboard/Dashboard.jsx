import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminAllTours from "../AdminAllTours/AdminAllTours";
import AdminAllTransport from "../AdminAllTransport/AdminAllTransport";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation"
import config from '../../config/config';

const BASE_URL = config.BASE_URL;
const Dashboard = () => {
  const [data, setData] = useState({
    totalTours: 0,
    totalVehicle: 0,
    totalBooking: 0,
    totalContact: 0
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BASE_URL}/dashboard`, {
          withCredentials: true,
          headers: {
            Authorization: `${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center bg-gray-800 items-center h-screen">
        <LoadingAnimation /> {/* Show loading animation */}
      </div>
    );
  }

  return (
    <>
    <div className="flex">
      <Sidebar />
      <div className="flex-1  bg-gray-900 h-full pb-10 pt-24 lg:pl-[250px]">
        <div className="flex flex-col items-center justify-center p-5 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-500">Overview of your platform&#39;s data</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-5 gap-6 w-full max-w-4xl mx-auto mb-8">
          <div className="bg-blue-500 shadow-lg rounded-lg p-6 text-center flex flex-col justify-center items-center h-40">
            <div className="text-3xl font-semibold text-white mb-2">{data.totalTours}</div>
            <div className="text-gray-200 font-semibold">Total Tours</div>
          </div>
          <div className="bg-green-500 shadow-lg rounded-lg p-6 text-center flex flex-col justify-center items-center h-40">
            <div className="text-3xl font-semibold text-white mb-2">{data.totalVehicle}</div>
            <div className="text-gray-200 font-semibold">Total Transport</div>
          </div>
          <div className="bg-red-500 shadow-lg rounded-lg p-6 text-center flex flex-col justify-center items-center h-40">
            <div className="text-3xl font-semibold text-white mb-2">{data.totalBooking}</div>
            <div className="text-gray-200 font-semibold">Total Bookings</div>
          </div>
          <div className="bg-purple-500 shadow-lg rounded-lg p-6 text-center flex flex-col justify-center items-center h-40">
            <div className="text-3xl font-semibold text-white mb-2">{data.totalContact}</div>
            <div className="text-gray-200 font-semibold">Total Contacts</div>
          </div>
        </div>
        <AdminAllTours />
        <AdminAllTransport />
      </div>
    </div>
    </>
  );
}

export default Dashboard;
