import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.svg";
import config from '../../config/config';

const BASE_URL = config.BASE_URL;
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Fetch unread notifications count
    const fetchUnreadCount = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${BASE_URL}/notification`,{
          headers: {Authorization: `${token}`}
        });
        console.log(response.data); 
        setUnreadCount(response.data.unreadCount); // Set unread count
      } catch (error) {
        console.error("Error fetching notifications count", error);
      }
    };

    fetchUnreadCount();
  }, []);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button onClick={toggleMenu} className="p-2 fixed top-20 left-5 z-50 lg:hidden">
        <GiHamburgerMenu size={30} className="text-white" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-50 lg:z-40 top-0 left-0 h-full bg-gray-800 text-white transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{ width: "250px" }}
      >
        <div className="flex flex-col items-start p-4 space-y-4">
          <div className="pt-2 lg:hidden ">
            <h1 className="text-white text-[25px] font-bold">PrydeTravel.</h1>
            <img src={logo} className="w-[65px]" alt="Logo Image" />
          </div>
          <ul className="flex flex-col space-y-2 w-full lg:pt-20">
            <li>
              <Link to="/dashboard" className="block p-2 hover:bg-lime-700 rounded transition duration-200">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/create-tour" className="block p-2 hover:bg-lime-700 rounded transition duration-200">
                Create Tour
              </Link>
            </li>
            <li>
              <Link to="/create-transport" className="block p-2 hover:bg-lime-700 rounded transition duration-200">
                Create Transport
              </Link>
            </li>
            <li>
              <Link to="/all-bookings" className="block p-2 hover:bg-lime-700 rounded transition duration-200">
                All Bookings
              </Link>
            </li>
            <li>
              <Link to="/all-contacts" className="block p-2 hover:bg-lime-700 rounded transition duration-200">
                All Contacts
              </Link>
            </li>
            <li className="relative">
              <Link to="/notification" className="block p-2 hover:bg-lime-700 rounded transition duration-200">
                Notifications
              </Link>
              {unreadCount > 0 && (
                <span className="absolute top-1  right-0 mt-2 mr-2 h-4 w-4 bg-red-500 text-xs text-white rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden" onClick={toggleMenu} />
      )}
    </>
  );
};

export default Sidebar;
