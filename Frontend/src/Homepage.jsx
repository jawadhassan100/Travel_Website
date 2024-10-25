import { useEffect, useState } from 'react';
import Hero from "./components/Hero/Hero";
import HeroFooter from "./components/HeroFooter/HeroFooter";
import Features from "./components/Features/Features";
import QuickCall from "./components/QuickCall/QuickCall";
import ToursPage from "./components/ToursPage/ToursPage";
import Footer from "./components/Footer/Footer";
import TransportPage from "./components/TransportPage/TransportPage";
import Memories from "./components/Memories/Memories";
import Reviews from "./components/Reviews/Reviews";
import { FaArrowUp } from "react-icons/fa6";

const Homepage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Show or hide the scroll button based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Hero />
      <HeroFooter />
      <Features />
      <ToursPage />
      <TransportPage />
      <Memories />
      <QuickCall />
      <Reviews />
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-lime-500 text-white p-3 rounded-full shadow-md hover:bg-lime-600 transition-all duration-300"
        >
          <FaArrowUp className='text-xl'/>
        </button>
      )}
    </>
  );
}

export default Homepage;
