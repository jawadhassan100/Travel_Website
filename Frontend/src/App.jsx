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

const App = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  return (
    <>
    <Navbar setIsNavbarOpen={setIsNavbarOpen}/>
    <div className={`${isNavbarOpen ? 'blur-md' : ''} transition-all duration-200`}>
   <Routes>
   <Route path="/" element={<Homepage/>} />
   <Route path="/tour/:id" element={<TourDetail />} />
   <Route path="/tour" element={<Tours />} />
   <Route path="/transport" element={<Transport />} />
   <Route path="/transport/:id" element={<TransportDetail />} />
   <Route path="/blog" element={<Blog />} />
   </Routes>
   </div>
    </>
  )
}

export default App