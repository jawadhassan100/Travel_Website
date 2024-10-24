
import Hero from "./components/Hero/Hero";
import HeroFooter from "./components/HeroFooter/HeroFooter";
import Features from "./components/Features/Features";
import QuickCall from "./components/QuickCall/QuickCall";

import ToursPage from "./components/ToursPage/ToursPage";
import Footer from "./components/Footer/Footer";
import TransportPage from "./components/TransportPage/TransportPage";
import Memories from "./components/Memories/Memories";


const Homepage = () => {
    
    return (
      <>
      <Hero/>
      <HeroFooter/>
      <Features/>
      <ToursPage/>
      <TransportPage/>
      <Memories/>
      <QuickCall/>
      <Footer/>
      </>
    )
}

export default Homepage