import  { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNotifications();
  }, []);


  const fetchNotifications = async () => {
    try {
        const token = localStorage.getItem('token')
      const response = await axios.get("http://localhost:6600/notification" ,{
        headers: { Authorization: `${token}` }
      });
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount); // Set unread count
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const markAsRead = async (id) => {
    try {
        const token = localStorage.getItem('token')
      await axios.patch(`http://localhost:6600/notification/${id}`,{
        headers: { Authorization: `${token}` }
      });
      setNotifications(
        notifications.map((notif) =>
          notif._id === id ? { ...notif, isNewNotification: false } : notif
        )
      );
      setUnreadCount((count) => count - 1); // Reduce unread count
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const handleDelete = async (id) => {
   try {
    const token = localStorage.getItem("token")
    await axios.delete(`http://localhost:6600/notification/${id}`,{
        headers: {Authorization: `${token}`}
    })
    setNotifications(
        notifications.filter(notification => notification._id !== id)
    )
    
   } catch (error) {
    console.error("Error deleting notification" , error)
   }
  }

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
        <Sidebar/>
        <div className="w-full p-6 lg:ml-64 pt-32">

    <div className="bg-gray-900 text-white p-4 h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Notifications</h2>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className="relative  p-4 border border-gray-700 rounded-lg bg-gray-800"
          >
             <button
              className="absolute top-2 right-3 text-red-500 hover:text-red-600"
              onClick={() => handleDelete(notification._id)}
            >
              ✕
            </button>
            <p className="font-semibold">{notification.message}</p>
            <p className="text-gray-400 text-sm">Type: {notification.type}</p>
            <p className="text-gray-400 text-sm">
              Status: {notification.isNewNotification ? "Unread" : "Read"}
            </p>
            {notification.isNewNotification && (
              <button
                onClick={() => markAsRead(notification._id)}
                className="mt-2 px-4 py-1 bg-lime-500 rounded-sm hover:bg-lime-600 text-sm font-medium"
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
        </div>
    </div>
  );
};

export default Notifications;
