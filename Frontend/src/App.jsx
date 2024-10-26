import { useState } from "react";
import "./App.css"
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./Homepage";
import { Route, Routes } from "react-router-dom";
import TourDetail from "./components/TourDetail/TourDetail"
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
import AdminRoutes from "./components/AdminRoutes/AdminRoutes"
import Dashboard from "./components/Dashboard/Dashboard";
import AllContacts from "./components/AllContacts/AllContacts"
import AllBookings from "./components/AllBookings/AllBookings";

const App = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  return (
    <>
    <AuthProvider>
    <Navbar setIsNavbarOpen={setIsNavbarOpen}/>
    <div className={`${isNavbarOpen ? 'blur-md' : ''} transition-all duration-200`}>
   <Routes>
   <Route path="/" element={<Homepage/>} />
   <Route path="/tour/:id" element={<TourDetail />} />
   <Route path="/tour" element={<Tours />} />
   <Route path="/transport" element={<Transport />} />
   <Route path="/transport/:id" element={<TransportDetail />} />
   <Route path="/blog" element={<Blog />} />
   <Route path="/contact-us" element={<Contact />} />
   <Route path="/book/:type/:id" element={<BookingForm />} />
   <Route path="/register" element={<Register />} />
   <Route path="/login" element={<Login />} />
   <Route path="/unauthorized" element={<Unauthorized/>} />
   <Route path="/dashboard" element={<Dashboard/>} />
   <Route path="/all-contacts" element={<AllContacts/>} />
   <Route path="/all-bookings" element={<AllBookings/>} />
   </Routes>
   </div>
   </AuthProvider>
    </>
  )
}

export default App