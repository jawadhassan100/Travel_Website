import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Navbar = ({ setIsNavbarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsNavbarOpen(!isOpen); // Update parent state to control blur
  };

  return (
    <div>
      <div className="flex z-50 justify-between items-center px-3 py-3 sm:px-8 lg:py-5 lg:px-16 bg-transparent fixed w-full">
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
        <div className="list-none hidden md:flex lg:flex xl:flex md:text-[18px] text-white items-center md:gap-5 space-x-8 ">
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
          <Link to="/contact-us">
            <li className="outline-white outline w-fit px-3 py-0.5 outline-2 rounded-[30px]">
              Contact Us
            </li>
          </Link>
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
              setIsNavbarOpen(false); // Ensure blur is removed when closed
            }}
            className="absolute top-4 right-4"
          >
            <TfiClose className="text-xl sm:text-[20px] mt-3 text-white" />
          </button>
        </div>

        <div className="list-none flex flex-col gap-8 mt-20 text-lg text-white">
          <Link to="/home">
            <li className="menu-item ">
              Home
            </li>
          </Link>
          <Link to="/home">
            <li className="menu-item ">
              Tour Sites
            </li>
          </Link>
          <Link to="/home">
            <li className="menu-item ">
              Transport
            </li>
          </Link>
          <Link to="/home">
            <li className="menu-item ">
              Blog
            </li>
          </Link>
          <div className="flex justify-center">
            <Link to="/about-us">
              <li className="outline-white outline w-fit px-3 py-1 rounded-[30px]">
                Contact Us
              </li>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
