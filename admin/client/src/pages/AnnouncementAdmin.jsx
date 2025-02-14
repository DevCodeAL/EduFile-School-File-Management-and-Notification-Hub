import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import AnnouncementModal from "../Modal/AnnouncementModal";

export default function AdminAnnouncement(){
      const [isOpen, setIsOpen] = useState(false);
      const [selectedAnnouncement, setSelectedAnnouncement] = useState(false);
      const [announcements, setAnnouncements] = useState([]);
      const [formData, setFormData] = useState({
        title: "",
        date: "",
        message: "",
        file: null,
      });

  // Fetch Announcements Files
      useEffect(()=>{
       const fetchAnouncemnetFiles = async ()=>{
        try {
          const response = await fetchAnouncemnetFiles();
          setAnnouncements(response);
        } catch (error) {
          console.error('No files exist!', error);
          throw error;
        }
       };

      //  fetchAnouncemnetFiles();

      }, []);

    
    // Handle Input Change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      // Handle File Change
      const HandleFileChange = (e)=>{
        const file = e.target.files[0];
        if(!file) return;
        setFormData((prev)=> ({...prev, file }));
      };

    
      const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('date', formData.date);
        data.append('message', formData.message);
        data.append('file', formData.file);
      
        try {
          const response = await fetch(`http://localhost:5000/api/annoncement-files`, {
            method: "POST",
            body: data,
          });
          setFormData({ title: "", date: "",  message: "", file: null, });
          console.log(response);
        } catch (error) {
          console.error('Failed to create announcment', error);
          throw error;
        }
       
      };

      const filePreview = ()=> {
         if(formData.file){
          const file = formData.file;
          const fileURL = URL.createObjectURL(file);

          if(file.type.startsWith('image/')){
            return(
              <div className="flex justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
                  <img src={fileURL} alt="Preview" className="max-w-full max-h-20 rounded-md" />
            </div>
            );
          } else if(file.type.startsWith('video/')){
              return(
                <div className="flex justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
                  <video src={fileURL} controls className="max-w-full max-h-20 ">
                  Your browser does not support the video tag.
                </video>
                </div>
              );
          } else {
           return <div className="flex flex-col justify-center items-center mt-1 p-3 border rounded-lg shadow-md bg-white">
                  <p>Unsupported Files</p>
              </div>
          }
         }
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
           
                         <h2 className="text-lg font-semibold mb-4 text-gray-700">Create a New Announcement</h2>
           
                         <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
                             name="file"
                             accept="image, video"
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
                                 onClick={null}
                               >
                                 ✏️ Edit
                               </button>
                               <button 
                                 className="flex items-center gap-2 text-gray-700 hover:text-red-600 p-2 w-full text-sm"
                                 onClick={null}>
                                 🗑️ Delete
                               </button>
                             </div>
                            </div>
                           <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                           <p className="text-gray-600">📅 {announcement.date}</p>
                           <p className="text-gray-500 mt-2">
                             {announcement.message.length > 100 ?
                              announcement.message.slice(0, 100).concat('.....') : announcement.message}
                             </p>
                             <button
                            onClick={null}
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
                   </div>
                 </main>
               </div>
        </>
    )
}