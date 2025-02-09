import { useEffect, useState } from "react";
import { getAllAnnouncement, newAnnouncement } from "../../../services/Api";
import { useAuth } from "../../../context/AuthContext";

export default function Announcements() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    message: "",
  });

  useEffect(()=>{
    const newAnnouncements = async ()=>{
      const userid = user?.data._id;
      try {
        const response = await getAllAnnouncement(userid);
        setAnnouncements(response);
      } catch (error) {
        console.error('Failed to fetching data!', error);
        throw error;
      };
    }

    newAnnouncements();
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.data._id;
    console.log(userId)
    try {
      const response = await newAnnouncement(formData, userId);
      const updatedNewAnnouncement = await getAllAnnouncement(userId);
      setAnnouncements(updatedNewAnnouncement);
      console.log(response);
      setFormData({ title: "", date: "", time: "", message: "" });
      setIsOpen(false); // Close modal after submission
    } catch (error) {
      console.error('Failed to create announcment', error);
      throw error;
    }
   
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">📢 Announcements</h1>
        <p className="text-gray-600 mb-6">Post updates and notify teachers here.</p>

        {/* Button to Open Announcement Form */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
        >
          +
        </button>

        {/* Announcement Form Modal */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm  z-50">
            <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold mb-4 text-gray-700">Create a New Announcement</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Announcement Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-3"
                  required
                />

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-3"
                  required
                />

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-3"
                  required
                />

                <textarea
                  name="message"
                  placeholder="Announcement Details"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-3"
                  required
                ></textarea>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                  Add Announcement
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Announcements Grid View */}
        <div className="mt-6 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {announcements.length === 0 ? (
            <p className="text-gray-500">No announcements yet.</p>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement._id} className="bg-white p-4 shadow-md rounded-lg border border-gray-200 transform transition-all scale-95 hover:scale-100">
                <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                <p className="text-gray-600">📅 {announcement.date} | ⏰ {announcement.time}</p>
                <p className="text-gray-500 mt-2">
                  {announcement.message.slice(0, 150).concat(' .....')}
                  </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
