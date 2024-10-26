import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch all contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:6600/contact/all-contact", {
          headers: {
            Authorization: token,
          },
        });
        setContacts(response.data);
      } catch (err) {
        setError("There was a problem fetching the contacts" ,err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:6600/contact/delete-contact/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  // Open modal with message
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  // Close modal
  const closeModal = () => {
    setSelectedMessage(null);
  };

  if (loading) return <p className="text-white text-center">Loading contacts...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="w-full p-6 lg:ml-64 pt-24">
        <h1 className="text-4xl font-bold mb-6 text-center">All Contacts</h1>

        {/* Table for medium to large screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-4">{contact.name}</td>
                  <td className="p-4">{contact.email}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleViewMessage(contact.message)}
                      className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for small screens */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between">
              <h2 className="text-xl font-bold mb-2">{contact.name}</h2>
              <p className="text-gray-300 mb-2">{contact.email}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewMessage(contact.message)}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing message */ }
        {selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 mx-3 p-6 rounded-lg max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
            
              <p className="text-gray-300 mb-6">{selectedMessage}</p>
              <button
                onClick={closeModal}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContact;
