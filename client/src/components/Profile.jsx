import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfileModal = ({setClose}) => {
const { user } = useAuth();

if(!user){
    return <h1>No user exist!</h1>
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
    {/* Modal Content */}
    <div className="relative w-full max-w-sm p-6 bg-white rounded-2xl shadow-2xl transform transition-all scale-95 hover:scale-100">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        onClick={setClose}
      >
        ✕
      </button>
  
      {/* User Information */}
      <div className="text-center">
        {/* User Avatar */}
        <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-blue-500 shadow-lg">
          <img
            src={'/image/Leomar .jpg'}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Username and Email */}
        <h2 className="text-2xl font-bold text-gray-800">{user?.data.username}</h2>
        <p className="text-sm text-gray-500">{user?.data.email}</p>
      </div>
  
      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition"
          onClick={setClose}
        >
          Close
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ProfileModal;
