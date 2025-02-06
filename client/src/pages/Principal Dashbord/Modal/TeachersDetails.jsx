

const TeachersProfile = ({ isOpen, onClose, onCancle, profile }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed z-20 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative bg-white shadow-2xl rounded-xl p-6 w-96 text-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          >
            ✕
          </button>
  
          {/* Profile Picture */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={profile?.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* Profile Details */}
          <h2 className="text-xl font-semibold text-gray-900">{profile?.name || "John Doe"}</h2>
          <p className="text-gray-600">{profile?.email || "johndoe@example.com"}</p>
          <p className="text-gray-500 mt-2">{profile?.bio || "No bio available"}</p>
        </div>
      </div>
    );
  };
  
  export default TeachersProfile;
  