import { useState } from "react";

const PrincipalProfileModal = ({ isOpen, onClose, principal, onSave }) => {
  const [formData, setFormData] = useState({
    name: principal?.name || "",
    email: principal?.email || "",
    phone: principal?.phone || "",
    bio: principal?.bio || "",
    image: principal?.image || "https://via.placeholder.com/150",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-red-500">
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">Update Principal Profile</h2>

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center">
          <label htmlFor="imageUpload" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
              <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <input type="file" id="imageUpload" className="hidden" onChange={handleImageChange} />
          </label>
          <p className="text-sm text-gray-500 mt-2">Click to change profile picture</p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-3">
            <div>
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrincipalProfileModal;
