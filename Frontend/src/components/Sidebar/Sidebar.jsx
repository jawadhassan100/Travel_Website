import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      <div className="flex flex-col items-start p-4  space-y-4">
        <div className="pt-2 lg:hidden ">
          <h1 className="text-white text-[25px] font-bold">PrydeTravel.</h1>
          <img src={logo} className="w-[65px]" alt="Logo Image" />
        </div>
        <ul className="flex flex-col space-y-2 w-full lg:pt-20">
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
