import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Header from "../../components/Header";
import ProfileModal from "../../components/Profile";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TeacherDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const socket = io(VITE_API_BASE_URL);
    socket.on("newFileUploaded", (data) => {
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message: data.message },
      ]);
    });

    return () => socket.off("newFileUploaded");
  }, []);

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <>
      {/* Main Content */}
      <div className="ml-64 min-h-screen bg-gray-100">
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-700">Teacher Dashboard</h1>
          <Header setOpen={() => setOpen(true)} />
        </header>

      {/* Notifications Panel */}
        { false &&
        <div className="fixed top-4 z-10 right-20 w-80 bg-white shadow-lg rounded-lg p-4 border">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
            <button
              onClick={() => setNotifications([])}
              className="text-xs text-gray-500 hover:text-red-500 transition"
            >
              Clear All
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No new notifications
            </p>
          ) : (
            <div className="mt-2 max-h-60 overflow-y-auto space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex justify-between items-center bg-gray-50 shadow p-3 rounded-md hover:bg-gray-100"
                >
                  <span className="text-sm text-gray-700">{notif.message}</span>
                  <button
                    onClick={() => dismissNotification(notif.id)}
                    className="text-xs font-bold text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>}

        {/* Dashboard Sections */}
        <main className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Recent Uploads */}
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">
                📁 Recent Uploads
              </h2>
              <p className="text-sm text-gray-600 mt-2">No new files uploaded.</p>
            </div>

            {/* Schedule */}
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">📅 Schedule</h2>
              <p className="text-sm text-gray-600 mt-2">Upcoming classes appear here.</p>
            </div>

            {/* Announcements */}
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">
                📢 Announcements
              </h2>
              <p className="text-sm text-gray-600 mt-2">No new announcements.</p>
            </div>
          </div>
        </main>

        {isOpen && <ProfileModal setClose={() => setOpen(false)} />}
      </div>
    </>
  );
}
