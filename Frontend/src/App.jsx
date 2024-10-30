import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./Homepage";
import { Route, Routes } from "react-router-dom";
import TourDetail from "./components/TourDetail/TourDetail";
import Tours from "./components/Tours/Tours";
import Transport from "./components/Transport/Transport";
import TransportDetail from "./components/TransportDetail/TransportDetail";
import Blog from "./components/Blog/Blog";
import Contact from "./components/ContactUs/ContactUs";
import BookingForm from "./components/BookingForm/BookingForm";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import AdminRoutes from "./components/AdminRoutes/AdminRoutes";
import Dashboard from "./components/Dashboard/Dashboard";
import AllContacts from "./components/AllContacts/AllContacts";
import AllBookings from "./components/AllBookings/AllBookings";
import CreateTransport from "./components/CreateTransport/CreateTransport";
import CreateTour from "./components/CreateTour/CreateTour";
import EditTour from "./components/EditTour/EditTour";
import EditTransport from "./components/EditTransport/EditTransport";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Notification from "./components/Notification/Notification";

const App = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return; // No token, no need to check
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
        window.location.reload()
        console.log("Logged out: Token has expired.");
      } else {
        setIsAuthenticated(true);
        // const timeRemaining = decodedToken.exp - currentTime;
        // console.log(`You will be logged out in ${timeRemaining} seconds.`);
      }
    };

    // Check token immediately on mount
    checkToken();

    // Set an interval to check token every minute (or any preferred interval)
    const interval = setInterval(checkToken, 60000); // Check every minute

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <AuthProvider isAuthenticated={isAuthenticated}>
        <Navbar setIsNavbarOpen={setIsNavbarOpen} />
        <div className={`${isNavbarOpen ? 'blur-md' : ''} transition-all duration-200`}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/tour/:id" element={<TourDetail />} />
            <Route path="/tour" element={<Tours />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/transport/:id" element={<TransportDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/book/:type/:id" element={<BookingForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/dashboard" element={<AdminRoutes element={<Dashboard />} />} />
            <Route path="/all-contacts" element={<AdminRoutes element={<AllContacts />} />} />
            <Route path="/all-bookings" element={<AdminRoutes element={<AllBookings />} />} />
            <Route path="/create-transport" element={<AdminRoutes element={<CreateTransport />} />} />
            <Route path="/create-tour" element={<AdminRoutes element={<CreateTour />} />} />
            <Route path="/edit-tour/:id" element={<AdminRoutes element={<EditTour />} />} />
            <Route path="/edit-transport/:id" element={<AdminRoutes element={<EditTransport />} />} />
            <Route path="/notification" element={<AdminRoutes element={<Notification />} />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
};

export default App;
