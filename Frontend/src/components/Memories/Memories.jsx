import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import karakuram from "../../assets/karakuram.jpg";
import sakardu from "../../assets/sakardu.jpg";
import muzaffarabad from "../../assets/muzaffarabad.jpg";
import chinaBorder from "../../assets/chinaBorder.jpg";
import murree from "../../assets/murree.jpg";

// Lazy load with a blur placeholder
const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        className={`h-screen w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

const Memories = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,         // Slightly slower transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Slow down autoplay for better loading time
    arrows: true,
    lazyLoad: 'ondemand',
    fade: true,          // Enable fade transition for smoother slide changes
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
