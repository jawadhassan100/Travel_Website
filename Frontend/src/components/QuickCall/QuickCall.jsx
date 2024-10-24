import curve from "../../assets/curve.svg"
import { FaArrowRightLong } from "react-icons/fa6";

const QuickCall = () => {
  return (
    <>
     <div className="bg-[black] pb-[50px]">
        <div className="flex justify-center align-center">
          <img src={curve} className="w-[574px]" alt="" />
        </div>
        <div className="flex justify-center align-center">
          <div className="w-[422px]">
            <h1
              className="flex justify-center align-center text-white font-[600]  text-[30px]  lg:text-[48px] lg:mt-[-80px]"
            >
              Ready to go?
            </h1>
            <h1 className="text-white font-[600] text-[30px] lg:text-[40px] flex justify-center align-center">
              Give us a quick call
            </h1>
          </div>
        </div>
        <div className="flex align-center justify-center mt-[40px]">
          <a
            href="#"
            className="px-[30px] flex items-center text-white  hover:bg-white hover:text-lime-500 transition duration- bg-lime-500 gap-2  rounded-full font-[500] w-[180px] py-[10px]"
            >Contact Us <FaArrowRightLong/>
          </a>
        </div>
      </div></>
  )
}

export default QuickCall