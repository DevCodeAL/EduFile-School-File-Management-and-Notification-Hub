import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ProfileModal from "../../components/Profile";

const TeacherDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [files, setFiles] = useState([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setNotifications([
      { id: 1, message: "New file uploaded: Lesson Plan 1", date: "2025-01-20" },
      { id: 2, message: "New video uploaded: Math Tutorial", date: "2025-01-19" },
    ]);

    setFiles([
      { id: 1, name: "Lesson Plan 1", type: "PDF", uploadedBy: "Principal", date: "2025-01-20" },
      { id: 2, name: "Math Tutorial", type: "Video", uploadedBy: "Principal", date: "2025-01-19" },
    ]);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    {/* Main Content */}
    <main className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold text-gray-700">Welcome, Teacher!</h1>
        <Header setOpen={()=> setOpen(true)}/>

        {isOpen && <ProfileModal setClose={()=> setOpen(!true)}/>}
          
        {/* Notifications Section */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-700">Recent Notifications</h2>
          <div className="mt-4 bg-white shadow-lg rounded-lg p-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className="border-b last:border-none pb-2 mb-2">
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.date}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No notifications available.</p>
            )}
          </div>
        </section>

        {/* File Library */}
    <section id="library" className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-4">File Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.length > 0 ? (
          files.map((file) => (
            <div key={file.id} className="bg-gray-50 shadow-sm rounded-lg p-4 border border-gray-300">
              <h3 className="text-lg font-semibold text-gray-800">{file.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Type:</span> {file.type}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Uploaded By:</span> {file.uploadedBy}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Date:</span> {file.date}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                {file.type === "Video"
                  ? "This is a tutorial video. Click below to watch or download."
                  : "This is a PDF document. Click below to view or download."}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600">
                  View
                </button>
                <button className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600">
                  Download
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 col-span-full text-center">
            No files available.
          </p>
        )}
      </div>
    </section>
   </main>
</div>
  );
};

export default TeacherDashboard;
