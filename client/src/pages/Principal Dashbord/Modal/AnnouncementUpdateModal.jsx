import { useEffect, useState } from "react";
import { updateAnnouncement } from "../../../services/Api";

export default function AnnouncementsUpdateModal({isOpenAnnouncement, isCloseAnnouncement, announcement, onUpdate}) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    message: "",
  });

  useEffect(()=>{
     if(announcement) setFormData(announcement);
  },[announcement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleSubmitUpdate = async(e)=>{
    e.preventDefault();
        try {
         const response = await updateAnnouncement(announcement._id, formData);
         onUpdate(response);
         isCloseAnnouncement();
        } catch (error) {
            console.error('Error no announcement update!', error);
            throw error;
        }
  };


  if(!isOpenAnnouncement) return null;

  return (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm  z-50">
            <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full relative">
              {/* Close Button */}
              <button
                onClick={isCloseAnnouncement}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold mb-4 text-gray-700">Update Announcement</h2>

              <form onSubmit={HandleSubmitUpdate}>
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
                  Update Announcement
                </button>
              </form>
            </div>
          </div>   
  );
}
