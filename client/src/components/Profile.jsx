import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfileModal = ({setClose}) => {
const { user } = useAuth();

if(!user){
    return <h1>No user exist!</h1>
}

  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal Content */}
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={setClose}
        >
          ✕
        </button>

        {/* User Information */}
        <div className="text-center">
          {/* User Avatar */}
          <div className="w-24 h-24 mx-auto mb-4 overflow-hidden bg-gray-200 rounded-full shadow-md">
            <img
              src={'/image/Leomar .jpg'}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Username and Email */}
          <h2 className="text-xl font-semibold text-gray-800">{user?.data.username}</h2>
          <p className="text-sm text-gray-600">{user?.data.email}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={setClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
