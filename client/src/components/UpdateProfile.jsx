import { useEffect, useState } from "react";
import { updateProfileAPI } from "../services/Api";
import { useAuth } from "../context/AuthContext";
import UpdateLoading from "../Success/UpdateLoading";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UpdateProfile = ({isOpenProfile, isCancel})=> {
  const { user } = useAuth();
  const [isLoadingUpdate, setLoadingUpdate] = useState(false);
  const [isFormData, setFormData] = useState({ picture: null, preview: null, fullname: '', email: '', contact: ''});
  const fileUrl = user?.data?.metadata?.path
    ? `${VITE_API_BASE_URL}/${encodeURI(user.data.metadata.path.replace(/\\/g, "/"))}`
    : "/png/avatar.png"; // Fallback to default avatar if path is missing

  
  // Handle form change
  const handleChange = (event)=>{
    const { name, value } = event.target;
    setFormData({
      ...isFormData,
       [name]: value
    })
  };

  // Handle file change
  const handleFileChange = (e)=>{
    const file = e.target.files[0];
    if (!file) return;
    setFormData({
      ...isFormData,
        picture : file,
        preview: URL.createObjectURL(file),
    });
  };

  // Handle form submit
  const HandleUpdateProfileUpdate = async(e)=>{
    e.preventDefault();
    setLoadingUpdate(true);
     
    const data = new FormData();
    data.append("picture", isFormData.picture);
    data.append("fullname", isFormData.fullname);
    data.append("email", isFormData.email);
    data.append("contact", isFormData.contact);
   const userId = user?.data._id;
   const role = user?.data.role;
   data.append("role", role); // Add role to FormData
    try {
       const response =  await updateProfileAPI(userId, data);
       console.log('Data: ', response);
      setFormData({
        ...isFormData,
      });
      
      let closeAll = false;
      setTimeout(()=>{
        setLoadingUpdate(false);
        isCancel(closeAll);
      }, 1000);
    
    } catch (error) {
      console.error("No profile updates!", error);
      throw error;
    }
  };

// Modal 
    if(!isOpenProfile) return null;


return(
       <>
{/* <!-- Update Profile Modal --> */}
<div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    {/* <!-- Modal Header --> */}
    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Update Profile</h2> 
     <form onSubmit={HandleUpdateProfileUpdate}>
       {/* <!-- Profile Picture Upload --> */}
    <div className="flex flex-col items-center mb-4 ">
      <label htmlFor="profilePic" className="relative">
        <img id="profilePreview" src={isFormData.preview || fileUrl ||  '/png/avatar.png'} 
          alt="Profile Picture" className="w-24 h-24 rounded-full  object-cover border-4 border-blue-500 shadow-lg"/>
        <input type="file" name="picture" accept="image" onChange={handleFileChange} id="profilePic" className="absolute inset-0 opacity-0 cursor-pointer"/>
      </label>
      <p className="text-sm text-gray-500 mt-2">Click to change</p>
    </div>

    {/* <!-- Form Fields --> */}
    <div className="space-y-3">
      <input type="text" name="fullname" value={isFormData.fullname} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
      <input type="email" name="email" value={isFormData.email} onChange={handleChange} placeholder="Email Address" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
      <input type="text" name="contact" value={isFormData.contact} onChange={handleChange} placeholder="Contact Number" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
    </div>

    {/* <!-- Buttons --> */}
    <div className="mt-5 flex justify-end space-x-3">
      <button type="button" onClick={isCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
    </div>
     </form>

     {isLoadingUpdate &&  <UpdateLoading/>}
  </div>
</div>

       </>
    )
}

export default UpdateProfile;