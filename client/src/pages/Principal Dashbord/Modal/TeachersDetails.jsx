import { FaEnvelope, FaSchool, FaUserTie } from "react-icons/fa";

const TeachersProfile = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div className="relative bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl p-8 w-[400px] max-w-full text-center transform transition-all scale-95 hover:scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition duration-200"
        >
          ✕
        </button>

        {/* Profile Picture */}
        <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
          <img
            src={item?.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Details */}
        <h2 className="text-2xl font-bold text-gray-900">{item?.fullname || "John Doe"}</h2>
        <p className="text-gray-500 text-sm mb-4">{item?.role || "Teacher"}</p>

        {/* Info Section */}
        <div className="bg-white p-4 rounded-lg shadow-md text-left">
          <p className="flex items-center gap-2 text-gray-700 text-sm">
            <FaUserTie className="text-blue-500" /> <span className="font-medium">Role:</span> {item?.role || "N/A"}
          </p>
          <p className="flex items-center gap-2 text-gray-700 text-sm mt-2">
            <FaEnvelope className="text-blue-500" /> <span className="font-medium">Email:</span> {item?.email || "N/A"}
          </p>
          <p className="flex items-center gap-2 text-gray-700 text-sm mt-2">
            <FaSchool className="text-blue-500" /> <span className="font-medium">School:</span> {item?.school || "N/A"}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TeachersProfile;
