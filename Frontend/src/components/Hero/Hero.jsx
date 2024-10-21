import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import HeroImg1 from "../../assets/himg1.png"
import HeroImg2 from "../../assets/himg2.png"
import HeroImg3 from "../../assets/himg3.png"

const Hero = () => {
  return (
    <div className="  bg-image ">
      <div className="bg-black opacity-75 h-[100vh] ">
      <div className="flex ">
              <div className="lg:w-[896px] lg:px-[46px] md:px-[26px] z-0 w-[350px] sm:w-full sm:text-center pl-3 md:w-[900px] ">
                <h1 className="text-white sm:text-[35px]  md:text-[55px] text-left   text-[30px] pt-[90px]  sm:pt-[120px] lg:pt-[198px] md:pt-[198px]">
                  Explore The Natural <span className="text-lime-500">Beauty of Pakistan</span>  with exciting people
                </h1>
                <p
                  className="text-white text-[18px] sm:text-left font-light pt-[22px] lg:w-[590px]"
                >
                  We help people find co travellers and also structure their
                  travel plan
                </p>
                <div
                  className="sm:text-center flex bg-lime-500 text-white hover:bg-white hover:text-lime-500 transition duration- rounded-full w-[180px] px-[30px] py-[10px] mt-[10px] mb-[20px]"
                >
                  <a href="#" className="px-[5xpx]  font-semibold flex items-center gap-3 ">Take a Trip  <FaArrowRightLong/></a>
                 
                </div>
              </div>
              <div className="-mt-16 mr-6 hidden lg:block">
                <div className="mt-[270px] ml-[400px] flex gap-[15px]">
                  <div className="bg-white px-[10px]  py-[10px] rounded-[50%] text-[25px] opacity-75">
                    <IoIosArrowBack />
                  </div>
                  <div className="bg-white px-[10px]  py-[10px] rounded-[50%] text-[25px] opacity-75">
                    <IoIosArrowForward />
                  </div>
                </div>

                <div className=" lg:flex  md:gap-[8px]">
                  <div className="mt-[60px]">
                    <img
                      src={HeroImg1}
                      className="w-[280px] rounded-[15px]"
                      alt=""
                    />
                 
                  </div>
                  <div className="mt-[30px]">
                    <img
                      src={HeroImg2}
                      className="w-[280] rounded-[15px]"
                      alt=""
                    />
                  </div>
                  <div className="mt-[50px]">
                    <img
                      src={HeroImg3}
                      className="rounded-[15px]"
                      alt=""
                    />
                  </div>
                </div>

              </div>
            </div>
      </div>
    </div>
  );
};

export default Hero;
