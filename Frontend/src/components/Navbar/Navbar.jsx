import { useState, useContext } from "react";
import { CiMenuFries } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import { useSnackbar } from "notistack";


const Navbar = ({ setIsNavbarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, setIsAdmin } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsNavbarOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:6600/api/logout', {}, {
        withCredentials: true,
        headers: { Authorization: `${token}` },
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
        enqueueSnackbar(response.data.msg, { variant: "success", autoHideDuration: 1000 });
        setTimeout(()=>{
          navigate("/")
        }, 2000)
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.msg || error.msg, { variant: "error", autoHideDuration: 1000 });
    }
  };

  return (
    <div>
      <div className="flex z-50 justify-between items-center px-3 py-3 sm:px-8 lg:py-5 lg:px-10 bg-transparent fixed w-full">
        {/* Logo */}
        <div className="pt-[10px]">
          <h1 className="text-white text-[25px]">
            <span className="font-bold">Pryde</span>Travel.
          </h1>
          <img src={logo} className="w-[65px]" alt="Logo Image" />
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden lg:hidden xl:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? "" : <CiMenuFries className="text-xl sm:text-[30px] text-white" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex lg:flex xl:flex md:text-[18px] list-none text-white items-center space-x-8">
          <Link to="/">
            <li className="menu-item relative pb-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-white after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300">
              Home
            </li>
          </Link>
          <Link to="/tour">
            <li className="menu-item relative pb-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-white after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300">
              Tour Sites
            </li>
          </Link>
          <Link to="/transport">
            <li className="menu-item relative pb-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-white after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300">
              Transport
            </li>
          </Link>
          <Link to="/blog">
            <li className="menu-item relative pb-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-white after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300">
              Blog
            </li>
          </Link>
          {isAdmin && (
              <Link to="/dashboard"> <li className="menu-item relative pb-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-white after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300">
              Dashboard
            </li></Link>
            )}
          <Link to="/contact-us">
            <li className="outline-white outline w-fit px-3 py-0.5 outline-2 rounded-[30px]">
              Contact Us
            </li>
          </Link>
        
          {isAdmin && (
            <button onClick={handleLogout} className="bg-lime-500 text-white font-semibold px-5 py-1 rounded-sm hover:bg-lime-900 ml-4">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden lg:hidden xl:hidden fixed top-0 right-0 h-full w-full z-50 text-center transition-all duration-500 ease-in-out ${
          isOpen ? "scale-100" : "scale-0"
        } origin-center`}
        style={{ transformOrigin: "50% 50%" }}
      >
        <div>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsNavbarOpen(false);
            }}
            className="absolute top-4 right-4"
          >
            <TfiClose className="text-xl sm:text-[20px] mt-3 text-white" />
          </button>
        </div>

        <div className="list-none flex flex-col gap-8 mt-20 text-lg text-white">
          <Link to="/"   onClick={() => {
              setIsOpen(false);
              setIsNavbarOpen(false); // Ensure blur is removed when closed
            }}>
            <li className="menu-item">Home</li>
          </Link>
          <Link to="/tour"  onClick={() => {
              setIsOpen(false);
              setIsNavbarOpen(false); // Ensure blur is removed when closed
            }}>
            <li className="menu-item">Tour Sites</li>
          </Link>
          <Link to="/transport"  onClick={() => {
              setIsOpen(false);
              setIsNavbarOpen(false); // Ensure blur is removed when closed
            }}>
            <li className="menu-item">Transport</li>
          </Link>
          <Link to="/blog"  onClick={() => {
              setIsOpen(false);
              setIsNavbarOpen(false); // Ensure blur is removed when closed
            }}>
            <li className="menu-item">Blog</li>
          </Link>
          {isAdmin && (
                <Link to="/dashboard"  onClick={() => {
                  setIsOpen(false);
                  setIsNavbarOpen(false); // Ensure blur is removed when closed
                }}><li className="menu-item">Dashboard</li></Link>
              )}
          <div className="flex justify-center">
            <Link to="/contact-us"  onClick={() => {
              setIsOpen(false);
              setIsNavbarOpen(false); // Ensure blur is removed when closed
            }}>
              <li className="outline-white outline w-fit px-3 py-1 rounded-[30px]">
                Contact Us
              </li>
            </Link>
          </div>
          
          <div>
          {isAdmin && (
            <button onClick={handleLogout} className="bg-lime-500 text-white font-semibold px-5 py-1 rounded-sm hover:bg-lime-900 mt-4">
              Logout
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
