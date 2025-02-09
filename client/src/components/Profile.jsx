import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaPhoneAlt, FaUserEdit, FaUserTie, FaSchool } from "react-icons/fa";
import UpdateProfile from './UpdateProfile'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProfileModal = ({ setClose }) => {
  const [isUpdateProfile, setUpdateProfile] = useState(false);
  const { user } = useAuth();

  if (!user) return <h1>No user exists!</h1>;

  const fileUrl = user?.data?.metadata?.path
    ? `${VITE_API_BASE_URL}/${encodeURI(user.data.metadata.path.replace(/\\/g, "/"))}`
    : "/png/avatar.png"; // Fallback to default avatar if path is missing


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      {/* Modal Content */}
      <div className="relative w-full max-w-sm p-6 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl transform transition-all scale-95 hover:scale-100">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition duration-200"
          onClick={setClose}
        >
          ✕
        </button>

        {/* User Information */}
        <div className="text-center">
          {/* User Avatar */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={fileUrl || "/png/avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Details */}
          <h2 className="text-2xl font-bold text-gray-900">{user?.data.fullname}</h2>
          <p className="text-gray-500 text-sm mb-4">{user?.data.role === 'principal' ? user?.data.role.replace('p', 'P') : user?.data.role.replace('t', 'T')}</p>

          {/* Information Section */}
          <div className="bg-white p-4 rounded-lg shadow-md text-left">
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <FaUserTie className="text-blue-500" /> <span className="font-medium">Role:</span>
               {user?.data.role === 'principal' ? user?.data.role.replace('p', 'P') : user?.data.role.replace('t', 'T') || "N/A"}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <FaEnvelope className="text-blue-500" /> <span className="font-medium">Email:</span> {user?.data.email}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm mt-2">
              <FaPhoneAlt className="text-blue-500" /> <span className="font-medium">Contact:</span> {user?.data.contact}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm mt-2">
              <FaSchool className="text-blue-500" /> <span className="font-medium">School:</span>
               {user?.data.school || "N/A"}
            </p>
          </div>
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
            onClick={() => setUpdateProfile(true)}
            className="px-4 py-2 flex items-center gap-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            <FaUserEdit /> Update Profile
          </button>
        </div>
      </div>

      {/* Profile Update Modal */}
      <UpdateProfile
        isOpenProfile={isUpdateProfile}
        isCancel={() => setUpdateProfile(false)}
      />
    </div>
  );
};

export default ProfileModal;
