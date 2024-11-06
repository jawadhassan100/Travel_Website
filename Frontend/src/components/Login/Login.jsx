import { useState , useContext  } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { AuthContext } from "../AuthContext/AuthContext"; // Import AuthContext
import config from '../../config/config';

const BASE_URL = config.BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setIsAdmin }  = useContext(AuthContext); // Use the context
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
       `${BASE_URL}/api/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      console.log(response);

      const { token } = response.data;
      localStorage.setItem("token", token);

      const { isAdmin } = response.data.user;
      localStorage.setItem("isAdmin", isAdmin);
      

      // Update the isAdmin state in the context
      setIsAdmin(isAdmin);
      console.log(response.data.user);
      
      if (response.status === 200) {
        enqueueSnackbar("Login Successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
        setTimeout(() => {
            console.log("Navigating to home...");
            navigate("/");
          }, 2000);
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.msg || "Login Failed", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 pt-5">
      <div
        className="bg-gray-800  p-8 -mt-10 rounded-lg shadow-lg w-96"
       
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full  "
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full "
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-200">
          Don&#39;t have an account?{" "}
          <Link to="/register" className="text-lime-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
