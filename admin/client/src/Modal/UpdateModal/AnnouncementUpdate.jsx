import { useEffect, useState } from "react";
import { createUpdateAnnouncements } from "../../Services/ItemServices";

export default function AnnouncementsUpdate({isOpenAnnouncement, isCloseAnnouncement, announcement, onUpdate}) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    message: "",
    files: [],
  });
// Modal Options
  if(!isOpenAnnouncement) return null;

  useEffect(()=>{
     if(announcement) setFormData(announcement);
  },[announcement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleFileChange = (e)=>{
    const selectedFile = Array.from(e.target.files);
    setFormData((prev)=> ({
        ...prev,
        file: [...prev.files, ...selectedFile],
    }));
  };

  const HandleSubmitUpdate = async(e)=>{

    const data = new FormData();
    data.append('title', formData.title);
    data.append('date', formData.date);
    data.append('message', formData.message);
    formData.files.forEach((file) => data.append("files", file));

    e.preventDefault();
        try {
        const response = await createUpdateAnnouncements(announcement._id, formData)
         onUpdate(response);
         isCloseAnnouncement();
        } catch (error) {
            console.error('Error no announcement update!', error);
            throw error;
        }
  };

//   Preview File
const previewFile = ()=>{
    if(formData.files.length > 0) {
     return (
        <div className="flex flex-wrap gap-2 mt-2">
            {formData.files.map((file, index)=> {
                 const fileUrl = URL.createObjectURL(file);
                 return file.type.startsWith('image/') ? 
                 (<img key={index} src={fileUrl} alt="Image Preview"/>)
                  : file.type.startsWith('video/') ?
                  (<video key={index} src={fileUrl} controls className="w-24 h-24 border shadow-md rounded-md">
                    Your browser does not support the video tag.
                  </video>) : 
                  (<div key={index} className="p-3 border rounded-lg shadow-md bg-white text-center">
                    <p>Unsupported File</p>
              </div>)  
            })}
        </div>
     )
    }

    return null;
}


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

              <form onSubmit={HandleSubmitUpdate} encType="multipart/form-data">
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

                <textarea
                  name="message"
                  placeholder="Announcement Details"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-3"
                  rows={5}
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

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                  Update Announcement
                </button>
              </form>

            {/* Preview File */}
              {previewFile()}
            </div>
          </div>   
  );
}
