import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from "notistack";
import config from '../../config/config';

const BASE_URL = config.BASE_URL;
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/register`, {
        email,
        password,
      });
      
      if (response.status === 201) {
        enqueueSnackbar(response.data.msg, {
          variant: "success",
          autoHideDuration: 3000,
        });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.msg || "Register Failed", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }
    }
  };


  return (
    <div className="flex items-center  justify-center h-screen bg-gray-900">
      <div
        className="bg-gray-800 -mt-8 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-200">
          Already have an account?{' '}
          <Link to="/login" className="text-lime-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
