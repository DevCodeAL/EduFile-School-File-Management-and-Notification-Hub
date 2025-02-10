import { useEffect, useState } from "react";
import { deleteAnnouncement, getAllAnnouncement, newAnnouncement } from "../../../services/Api";
import { useAuth } from "../../../context/AuthContext";
import AnnouncementModal from "../Modal/AnnouncementModal";
import AnnouncementsUpdateModal from "../Modal/AnnouncementUpdateModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteModalAnnouncement from "../Modal/DeleteModalAnnoncement";

export default function Announcements() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(false);
  const [isAnnouncementModal, setIsAnnouncementModal] = useState(false);
  const [isAnnounceDelete, setIsAnnounceDelete] = useState(false);
  const [isDeleteSelect, setisDeleteSelect] = useState(null);
  const [isSelectedAnnouncement, setIsSelectedAnnouncement] = useState(null);
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

// Update Announcement
const HandleUpdateAnnouncement = (announcement)=>{
      setIsSelectedAnnouncement(announcement);
      setIsAnnouncementModal(true);
};

const HandleDeleteEvent = async (announcement)=>{
  try {
    await deleteAnnouncement(announcement._id);
    setAnnouncements((preveAnnounce)=> preveAnnounce.filter((t) => t._id !== announcement._id));
    setIsAnnounceDelete(false);
  } catch (error) {
    console.error('No deleted announcement!', error);
    throw error;
  }
};

// Update UI
async function UpdateUI() {
  // Fetch updated schedules using user ID
  const id = user?.data._id;
  const updatedSchedules = await getAllAnnouncement(id);
  setAnnouncements(updatedSchedules);
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
            announcements.toReversed().map((announcement) => (
              <div key={announcement._id} className="relative bg-white p-4 shadow-md rounded-lg border border-gray-200 transform transition-all scale-95 hover:scale-100">
                 <div className="group">
                 <span className="p-2 absolute inset-0 left-auto cursor-pointer text-gray-600 hover:text-gray-900">
                    <BsThreeDotsVertical />
                  </span>
                   {/* Tooltip & Buttons (Visible on Hover) */}
                  <div className="hidden group-hover:flex flex-col absolute right-0 top-6 bg-white shadow-lg border border-gray-200 rounded-lg w-28 p-2 z-10">
                    <button 
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 p-2 w-full text-sm"
                      onClick={() => {
                        HandleUpdateAnnouncement(announcement);
                        setIsAnnouncementModal(true);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="flex items-center gap-2 text-gray-700 hover:text-red-600 p-2 w-full text-sm"
                      onClick={() => {
                        setisDeleteSelect(announcement); 
                        setIsAnnounceDelete(true);
                      }}>
                      🗑️ Delete
                    </button>
                  </div>
                 </div>
                <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                <p className="text-gray-600">📅 {announcement.date} | ⏰ {announcement.time}</p>
                <p className="text-gray-500 mt-2">
                  {announcement.message.length > 100 ?
                   announcement.message.slice(0, 100).concat('.....') : announcement.message}
                  </p>
                  <button
                 onClick={() => setSelectedAnnouncement(announcement)}
                className="mt-2 text-blue-500 hover:underline"
              >
                Read More
              </button>
              </div>
            ))
          )}

                {/* Show modal when an announcement is selected */}
            {selectedAnnouncement && (
              <AnnouncementModal
                announcement={selectedAnnouncement}
                onClose={() => setSelectedAnnouncement(null)}
              />
            )}
          {/* Update Modal */}
            {isAnnouncementModal && (
              <AnnouncementsUpdateModal
               isOpenAnnouncement={isAnnouncementModal}
                isCloseAnnouncement={()=> setIsAnnouncementModal(false)}
                announcement={isSelectedAnnouncement}
                onUpdate={(updatedData)=>{
                  setAnnouncements((prevData)=> prevData.map(s => s._id === updatedData._id ? updatedData : s))
                }}
                />
            )}

            {/* Delete Modal Alert */}
            {isAnnounceDelete && (
              <DeleteModalAnnouncement isOpen={isAnnounceDelete}
               onClose={()=> setIsAnnounceDelete(false)}
               announcement={isDeleteSelect}
               onConfirm={()=> {
                HandleDeleteEvent(isDeleteSelect);
                setIsAnnounceDelete(false);
                UpdateUI();
               }}/>
            )}
            
        </div>
      </main>
    </div>
  );
}
