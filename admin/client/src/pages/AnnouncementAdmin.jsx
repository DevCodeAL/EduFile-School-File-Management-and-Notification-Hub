import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import AnnouncementModal from "../Modal/AnnouncementModal";
import { fetchAllAnnouncement } from "../Services/ItemServices";

export default function AdminAnnouncement(){
      const [isOpen, setIsOpen] = useState(false);
      const [selectedAnnouncement, setSelectedAnnouncement] = useState(false);
      const [announcements, setAnnouncements] = useState([]);
      const [formData, setFormData] = useState({
        title: "",
        date: "",
        message: "",
        files: [],
      });

  // Fetch Announcements Files
      useEffect(()=>{
       const fetchAnouncemnetFiles = async ()=>{
        try {
          const response = await fetchAllAnnouncement();
          setAnnouncements(response.data);
          console.log('Data: ', response.data);
        } catch (error) {
          console.error('No files exist!', error);
          throw error;
        }
       };

       fetchAnouncemnetFiles();

      }, []);

    
    // Handle Input Change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      // Handle File Change
      const HandleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) return;
      
        setFormData((prev) => ({
          ...prev,
          files: [...prev.files, ...selectedFiles],
        }));
      };
      
      // Submit Form
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const data = new FormData();
        data.append("title", formData.title);
        data.append("date", formData.date);
        data.append("message", formData.message);
        formData.files.forEach((file) => data.append("files", file)); 
      
        try {
          const response = await fetch(`http://localhost:5000/api/announcement-files`, {
            method: "POST",
            body: data,
          });
      
          setFormData({ title: "", date: "", message: "", files: [] }); // Reset state
          console.log(response);
        } catch (error) {
          console.error("Failed to create announcement", error);
        }
      };
      
  // File Preview
  const filePreview = () => {
    if (formData.files.length > 0) {
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.files.map((file, index) => {
            const fileURL = URL.createObjectURL(file);

            return file.type.startsWith("image/") ? (
              <img key={index} src={fileURL} alt="Preview" className="w-24 h-24 object-cover rounded-md border shadow-md" />
            ) : file.type.startsWith("video/") ? (
              <video key={index} src={fileURL} controls className="w-24 h-24 border shadow-md rounded-md">
                Your browser does not support the video tag.
              </video>
            ) : (
              <div key={index} className="p-3 border rounded-lg shadow-md bg-white text-center">
                <p>Unsupported File</p>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };
      
  
    return(
        <>
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
           
                         <h2 className="text-lg font-semibold mb-4 text-gray-700">Create New Announcement</h2>
           
                         <form onSubmit={handleSubmit} encType="multipart/form-data">
                          <label className="font-normal">
                            Title
                          </label>
                           <input
                             type="text"
                             name="title"
                             placeholder="Announcement Title"
                             value={formData.title}
                             onChange={handleChange}
                             className="w-full p-2 border rounded mb-3"
                             required
                           />

                            <label className="font-normal">
                            Date
                          </label>
                           <input
                             type="date"
                             name="date"
                             value={formData.date}
                             onChange={handleChange}
                             className="w-full p-2 border rounded mb-3"
                             required
                           />

                            <label className="font-normal">
                           Message
                          </label>
                           <textarea
                             name="message"
                             placeholder="Announcement Details"
                             value={formData.message}
                             onChange={handleChange}
                             className="w-full p-2 border rounded mb-3"
                             required
                           ></textarea>

                          <input
                             type="file"
                              name="files"
                              multiple
                              accept="image/*,video/*"
                             onChange={HandleFileChange}
                             className="w-full p-2 border rounded mb-3"
                             required
                           />

                           {/* File Preview */}
                           <div>
                              {filePreview()}
                           </div>
           
                           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                             Add Announcement
                           </button>
                         </form>
                       </div>
                     </div>
                   )}
           
             {/* Announcements Grid View */}
<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {announcements.length === 0 ? (
    <p className="text-gray-500 text-center col-span-full">No announcements yet.</p>
  ) : (
    announcements.slice().reverse().map((announcement) => (
      <div
        key={announcement._id}
        className="relative bg-white p-4 shadow-md rounded-lg border border-gray-200 transform transition-all scale-95 hover:scale-100"
      >
        {/* Options Menu */}
        <div className="relative group">
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 p-1">
            <BsThreeDotsVertical />
          </button>
          
          {/* Edit & Delete Buttons - Shown on Hover */}
          <div className="hidden group-hover:flex flex-col absolute right-0 top-8 bg-white shadow-lg border border-gray-200 rounded-lg w-28 p-2 z-10">
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 p-2 w-full text-sm">
              ✏️ Edit
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-red-600 p-2 w-full text-sm">
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Announcement Title & Date */}
        <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
        <p className="text-gray-600">📅 {announcement.date}</p>

        {/* Announcement Message (Shortened) */}
        <p className="text-gray-500 mt-2">
          {announcement.message.length > 100
            ? `${announcement.message.slice(0, 100)}.....`
            : announcement.message}
        </p>

        {/* Image Grid with Full-Width Single Image */}
{announcement.files && announcement.files.length > 0 && (
  <div className={`mt-3 grid gap-2 ${announcement.files.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"}`}>
    {announcement.files.slice(0, 3).map((file, index) => (
      file?.metadata?.path ? (
        <img
          key={index}
          className={`rounded-lg object-cover ${
            announcement.files.length === 1 ? "w-full h-auto" : "h-32 w-full"
          }`}
          src={`http://localhost:5000/${encodeURI(file?.metadata?.path.replace(/\\/g, "/"))}`}
          alt={`Image ${index + 1}`}
        />
      ) : (
        <div key={index} className="w-full h-32 bg-gray-300 flex justify-center items-center rounded-lg">
          <span>No Image</span>
        </div>
      )
    ))}
    
    {announcement.files.length > 3 && (
      <div className="w-full h-32 bg-gray-300 flex justify-center items-center rounded-lg">
        <span className="text-xl font-semibold">+{announcement.files.length - 3}</span>
      </div>
    )}
  </div>
)}
        {/* Read More Button */}
        <button className="mt-4 text-blue-500 hover:underline" onClick={null}>
          Read More
        </button>
      </div>
    ))
  )}

  {/* Announcement Modal */}
  {selectedAnnouncement && (
    <AnnouncementModal
      announcement={selectedAnnouncement}
      onClose={() => setSelectedAnnouncement(null)}
    />
  )}
</div>

                 </main>
               </div>
        </>
    )
}