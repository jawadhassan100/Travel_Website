import instagram from "../../assets/instagram.svg"
import facebook from "../../assets/facebook.svg"
import linkedin from "../../assets/linkedin.svg"
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <>
        <footer>
      <div className="lg:flex lg:justify-between lg:px-[100px] py-[50px]">
        <div className="flex justify-center items-center ">
          <div className="relative flex flex-col justify-center items-center">
            <h1 className="text-[25px] font-[700] text-[#112F38] relative">
              <span className="font-bold relative inline-block">
                Pryde
                <img
                  src={logo}
                  className="absolute w-[70px] left-1/2 transform -translate-x-1/2 mt-1"
                  alt="Logo Image"
                />
              </span>
              Travel.
            </h1>
          </div>
        </div>
        
        <div className="lg:flex lg:gap-[80px] sm:gap-[20px] pt-[29px]">
          <div className="flex justify-center ">
            <ul className="flex w-full sm:gap-[20px] px-[20px] lg:gap-[40px] text-black text-[18px] font-[600] justify-between">
              <li><a href="#">Places</a></li>
              <li><a href="#">About</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          
          
        </div>
      </div>
      <div className="flex align-center justify-center">
        <hr className="lg:w-[1170px]" />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:px-[100px] lg:pt-[40px] lg:py-[70px] items-center">
        <div className="order-2 lg:order-1 text-center pb-[20px]"> 
          <p className="font-[500] text-[16px]">Copyright@2023</p>
        </div>
        <div className="flex gap-5 order-1 lg:order-2 justify-center"> 
          <img src={instagram} alt="" />
          <img src={linkedin} alt="" />
          <img
            src={facebook}
            className="h-[22px] w-[22px]"
            alt=""
          />
        </div>
      </div>
      
      
      
    </footer>
    </>
  )
}

export default Footer