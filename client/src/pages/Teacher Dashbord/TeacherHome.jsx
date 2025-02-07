import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Header from "../../components/Header";
import ProfileModal from "../../components/Profile";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TeacherDashboard() {
  const [notifications, setNotifications] = useState([]); 
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const socket = io(VITE_API_BASE_URL); // Backend URL
    socket.on("newFileUploaded", (data) => {
      setNotifications((prev) => [...prev, { id: Date.now(), message: data.message }]);
    });

    return () => socket.off("newFileUploaded");
  }, []);

  // Function to dismiss a notification
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
   <>
    <div className="fixed top-4 right-40 w-80 bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-4 border border-gray-200">
    <div className="flex justify-between items-center border-b pb-2 mb-2">
      <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
      <button
        onClick={() => setNotifications([])}
        className="text-xs text-gray-500 hover:text-red-500 transition duration-200"
      >
        Clear All
      </button>
    </div>
  
    {notifications.length === 0 ? (
      <p className="text-gray-500 text-sm text-center py-4">No new notifications</p>
    ) : (
      <div className="mt-2 max-h-60 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex justify-between items-center bg-white shadow-md p-3 rounded-lg transition hover:bg-gray-100"
          >
            <span className="text-sm text-gray-700">{notif.message}</span>
            <button
              onClick={() => dismissNotification(notif.id)}
              className="text-xs font-bold text-red-500 hover:text-red-600 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    )}
    </div>
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-6 py-4">
          <div>
              <h1 className="text-2xl font-bold text-gray-700">Principal Dashboard</h1>
          </div>

          <div className='flex justify-end'>
               <Header setOpen={()=> setOpen(true)}/>
            </div>
          </div>

        {isOpen && <ProfileModal setClose={() => setOpen(!true)} />}
          </main>
          </div>
   </>
  );
}




 