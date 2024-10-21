import sheildCheck from "../../assets/shieldCheck.svg"
import airplane from "../../assets/Airplane.svg"
import faders from "../../assets/Faders.svg"

const Features = () => {
  return (
    <>
          <div className="bg-black lg:mt-[-20px] md:mt-[-25px] mt-[-100px] w-[100vw] ">
        <div className="lg:flex md:flex md:mx-[30px] ml-3 sm:block md:mx-[150px] lg:mx-[132.32px] lg:gap-[38px]">
          <div className="mt-[100px] mb-[50px] pt-[20px] md:pt-[0px]">
            <img
              src={sheildCheck}
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h3
              className="text-white text-[28px] w-[380px] font-medium text-[#D9D9D9;] py-[12px]"
            >
              Enjoy Some Flexibility
            </h3>
            <p className="text-white text-[18px] font-extralight w-[315px]">
              Stay with flexible cancellation make it easy to re-book if your
              plan change
            </p>
          </div>
          <div className="mt-[100px] mb-[50px]">
            <img
              src={airplane}
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h3
              className="text-white text-[26px] w-[380px] font-medium text-[#D9D9D9;] py-[12px]"
            >
              Over 2 million active trips
            </h3>
            <p className="text-white text-[18px] font-extralight w-[315px]">
              Stay with flexible cancellation make it easy to re-book if your
              plan change
            </p>
          </div>
          <div className="mt-[100px]  pb-[30px] md:hidden lg:block">
            <img
              src={faders}
              className="w-[40px] h-[40px]"
              alt=""
            />
            <h3
              className="text-white text-[26px] w-[380px] font-medium text-[#D9D9D9;] py-[12px]"
            >
              Over 2 million active trips
            </h3>
            <p className="text-white text-[18px] font-extralight w-[315px]">
              Stay with flexible cancellation make it easy to re-book if your
              plan change
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Features