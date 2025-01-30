import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import UploadedFiles from './UploadeFiles';

const socket = io("http://localhost:5000"); // Backend URL

const TeacherDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("newFileUploaded", (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    return () => socket.off("newFileUploaded");
  }, []);

  return ( 
     <>
       <div>
      {/* Notifications Panel */}
      <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-bold">Notifications</h2>
        {notifications.map((msg, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mt-2">
            {msg}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <h1 className="text-2xl font-bold">Files</h1>
    </div>
     <UploadedFiles/>
     </>
  );
};

export default TeacherDashboard;



 