import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { enqueueSnackbar } = useSnackbar(); // Use snackbar for notifications


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await axios.post("http://localhost:6600/contact/create-contact", formData);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      enqueueSnackbar("Your message has been sent successfully!", { 
        variant: "success", 
        autoHideDuration: 3000 
      });
    } catch (err) {
      enqueueSnackbar("There was a problem submitting your message. Please try again." ,err, { 
        variant: "error", 
        autoHideDuration: 3000 
      });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <input
            type="text"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
            placeholder="Full Name"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%]"
            placeholder="Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            className="w-100 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[100%]"
            placeholder="Subject"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-auto md:mb-auto w-full md:w-full md:h-auto md:min-h-[100px] md:max-h-[100px] md:flex-grow md:flex-shrink md:flex-auto focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Message"
            id="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
