import Slider from "react-slick";
import karakuram from "../../assets/karakuram.jpg";
import sakardu from "../../assets/sakardu.jpg";
import muzaffarabad from "../../assets/muzaffarabad.jpg";
import chinaBorder from "../../assets/chinaBorder.jpg";
import murree from "../../assets/murree.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Memories = () => {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // Add fade effect
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="mb-[20px] mt-10">
        <div className="item-center justify-center flex ">
          <h1 className="text-[30px] px-[10px] lg:[48px] font-[700] text-[#525252;]">
            OLD MEMORIES
          </h1>
        </div> 
        <div className="h-screen w-full overflow-hidden">
      <Slider {...settings}>
        <div>
          <img src={muzaffarabad} className="h-screen w-full object-cover" alt="Muzaffarabad" />
        </div>
        <div>
          <img src={chinaBorder} className="h-screen w-full object-cover" alt="China Border" />
        </div>
        <div>
          <img src={karakuram} className="h-screen w-full object-cover" alt="Karakuram" />
        </div>
        <div>
          <img src={sakardu} className="h-screen w-full object-cover" alt="Sakardu" />
        </div>
        <div>
          <img src={murree} className="h-screen w-full object-cover" alt="Murree" />
        </div>
      </Slider>
    </div>
        </div>
        


        <div className="flex gap-[20px] px-[50px] py-[20px] lg:grid-cols-4 md:grid-cols-2 grid">
        <div>
          <iframe width="300" height="240" 
          className="rounded-[10px]"
            src="https://www.youtube.com/embed/Mf_nGEPIsQ8" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
        <div>
          <iframe width="300" height="240" 
          className="rounded-[10px] hidden md:block"
            src="https://www.youtube.com/embed/Mf_nGEPIsQ8" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
        <div>
          <iframe width="300" height="240" 
          className="rounded-[10px] hidden md:block"
            src="https://www.youtube.com/embed/Mf_nGEPIsQ8" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
        <div>
          <iframe width="300" height="240" 
          className="rounded-[10px] hidden md:block"
            src="https://www.youtube.com/embed/Mf_nGEPIsQ8" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
        
    
     
   
    </>
  )
}

export default Memories