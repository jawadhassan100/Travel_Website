import shieldCheck from "../../assets/shieldCheck.svg";
import airplane from "../../assets/Airplane.svg";
import faders from "../../assets/Faders.svg";

const Features = () => {
  return (
    <div className="bg-black lg:mt-[-20px] md:mt-[-25px] mt-[-100px] w-full ">
      <div className="flex flex-col md:flex-row justify-around md:mx-[30px] mx-3 md:gap-8">
        <div className="mt-[80px] mb-[80px] text-center">
          <img src={shieldCheck} className="w-10 h-10 mx-auto" alt="Flexibility" />
          <h3 className="text-white text-lg md:text-xl font-medium py-2">
            Enjoy Some Flexibility
          </h3>
          <p className="text-white text-sm md:text-base font-extralight">
            Stay with flexible cancellation make it easy to re-book if your plan changes.
          </p>
        </div>

        <div className="mt-[80px] mb-[80px] text-center">
          <img src={airplane} className="w-10 h-10 mx-auto" alt="Active Trips" />
          <h3 className="text-white text-lg md:text-xl font-medium  py-2">
            Over 2 million active trips
          </h3>
          <p className="text-white text-sm md:text-base font-extralight">
            Stay with flexible cancellation make it easy to re-book if your plan changes.
          </p>
        </div>

        <div className="mt-[80px] mb-[80px] text-center">
          <img src={faders} className="w-10 h-10 mx-auto" alt="Active Trips" />
          <h3 className="text-white text-lg md:text-xl font-medium py-2">
            Over 2 million active trips
          </h3>
          <p className="text-white text-sm md:text-base font-extralight">
            Stay with flexible cancellation make it easy to re-book if your plan changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
