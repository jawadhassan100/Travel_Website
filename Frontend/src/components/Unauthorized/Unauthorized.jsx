import {motion} from "framer-motion"
const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-800">
            <motion.h1
                initial={{ y: 0 }}               // Start at original position
                animate={{ y: [0, -10, 0] }}     // Bounce up 20px and return
                transition={{
                    duration: .2,                // Duration of one bounce
                    ease: "easeInOut",            // Easing function
                    repeat: Infinity,              // Repeat indefinitely
                }}
                className="text-red-600 font-bold text-2xl md:text-[50px] sm:text-2xl"
            >
                Unauthorized Access
            </motion.h1>
            <p className="text-sm text-white md:text-lg sm:text-base mt-4">
                You do not have permission to view this page.😠
            </p>
        </div>
    );
};

export default Unauthorized;
