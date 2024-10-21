import { useState } from "react";
import "./App.css"
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import HeroFooter from "./components/HeroFooter/HeroFooter";
import Features from "./components/Features/Features";

const App = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  return (
    <>
    <Navbar setIsNavbarOpen={setIsNavbarOpen}/>
    <div className={`${isNavbarOpen ? 'blur-md' : ''} transition-all duration-200`}>
    <Hero/>
    <HeroFooter/>
    <Features/>
    </div>
    </>
  )
}

export default App