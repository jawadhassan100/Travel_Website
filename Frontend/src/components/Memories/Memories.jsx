import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your images (ensure they are optimized for web)
import karakuram from "../../assets/karakuram.jpg";
import sakardu from "../../assets/sakardu.jpg";
import muzaffarabad from "../../assets/muzaffarabad.jpg";
import chinaBorder from "../../assets/chinaBorder.jpg";
import murree from "../../assets/murree.jpg";

// Function to lazy load images
const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`h-screen w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      onLoad={() => setLoaded(true)}
    />
  );
};

const Memories = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Slightly slower autoplay for smoother transitions
    arrows: true,
    lazyLoad: 'ondemand', // Lazy load the slides for better performance
  };

  return (
    <div className="mt-5">
      <div className="text-center flex justify-center">
        <h1 className="text-[30px] lg:text-[42px] font-bold text-[#525252]">OLD MEMORIES</h1>
      </div>

      <div className="h-screen w-full overflow-hidden">
        <Slider {...settings}>
          <div>
            <LazyImage src={muzaffarabad} alt="Muzaffarabad" />
          </div>
          <div>
            <LazyImage src={chinaBorder} alt="China Border" />
          </div>
          <div>
            <LazyImage src={karakuram} alt="Karakuram" />
          </div>
          <div>
            <LazyImage src={sakardu} alt="Sakardu" />
          </div>
          <div>
            <LazyImage src={murree} alt="Murree" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Memories;
