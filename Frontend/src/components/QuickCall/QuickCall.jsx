import curve from "../../assets/curve.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const QuickCall = () => {
  return (
    <div className="bg-[black] pb-[50px]">

      {/* Animated Curve */}
      <motion.div
        className="flex justify-center align-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.5 }} // 0.5 triggers halfway into viewport
      >
        <img src={curve} className="w-[574px]" alt="curve" />
      </motion.div>

      {/* Animated Text Section */}
      <motion.div
        className="flex justify-center align-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <div className="w-[422px] text-center">
          <h1 className="text-white font-[600] text-[30px] lg:text-[48px] lg:mt-[-80px]">
            Ready to go?
          </h1>
          <h1 className="text-white font-[600] text-[30px] lg:text-[40px]">
            Give us a quick call
          </h1>
        </div>
      </motion.div>

      {/* Animated Button */}
      <motion.div
        className="flex align-center justify-center mt-[40px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <motion.a
          href="#"
          className="px-[30px] flex items-center text-white hover:bg-white hover:text-lime-500 transition duration-200 bg-lime-500 gap-2 rounded-full font-[500] w-[180px] py-[10px]"
          whileHover={{ scale: 1.05 }}
        >
          Contact Us <FaArrowRightLong />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default QuickCall;
