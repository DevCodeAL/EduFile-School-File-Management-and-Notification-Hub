import axios from 'axios';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Login API for Admin
const API_Login = `http://localhost:5000/api/admin`;
export const adminLogin = async (userItem)=> {
    try {
        const response = await axios.post(API_Login, userItem);
        return response.data;
    } catch (error) {
        console.error("Error login user:", error);
        throw error; 
    }
}
// Get Profile API for Admin
const API_Admin = `http://localhost:5000/api/profile`;

export const getUserAdmin = async (authToken) => {
  try {
    const response = await axios.get(API_Admin, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("No user details admin:", error);
    throw error;
  }
};

// Update userProfile
const UpdateAdminProfile = `${VITE_API_BASE_URL}/api/admin-update-profile`;
export const updateProfileAPI = async (userId, formData)=>{
   try {
    const response = await axios.put(`${UpdateAdminProfile}/${userId}`, formData,{
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
   } catch (error) {
      console.error("No profile updates", error);
      throw error;
   }
};

// Get All Users
const API_All_Users = `http://localhost:5000/api/all-users`;
export const getAllUsers = async()=>{
  try {
    const response = await axios.get(API_All_Users);
    return response.data;
  } catch (error) {
    console.error("No fetch users", error);
    throw error;
  }
};

// Get All teachers 
// all-users-teachers
const API_All_Users_T = `http://localhost:5000/api/all-users-teachers`;
export const getAllUsersTeachers = async()=>{
  try {
    const response = await axios.get(API_All_Users_T);
    return response.data;
  } catch (error) {
    console.error("No fetch users", error);
    throw error;
  }
};



// Registration API for Principal
const API_Principal = `http://localhost:5000/api/principal`;

export const createPrincipal = async (userData)=>{
    try {
      const response = await axios.post(API_Principal, userData);
      return response.data;
    } catch (error) {
      console.error("Failed to create:", error);
      throw error;
    }
};
// Get announcement files
const API_AnouncementFiles = `http://localhost:5000/api/get-anouncement-files`;
export const fetchAllAnnouncement = async ()=>{
  try {
    const response = await axios.get(API_AnouncementFiles);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch anouncement files', error);
    throw error;
  }
}

// get-news-files
const API_NewsFiles = `http://localhost:5000/api/get-news-files`;
export const fetchAllNews = async ()=>{
  try {
    const response = await axios.get(API_NewsFiles);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch anouncement files', error);
    throw error;
  }
};

// get-events-files
const API_NewsEvents = `http://localhost:5000/api/get-events-files`;
export const fetchAllEvents = async ()=>{
  try {
    const response = await axios.get(API_NewsEvents);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch anouncement files', error);
    throw error;
  }
};

// -----------------------------------------------
// Update Announcements
const API_UpdateAnnoucements = `http://localhost:5000/api/update-announcement-admin`;
export const createUpdateAnnouncements = async (updateId, data)=>{
  try {
    const response = await axios.put(`${API_UpdateAnnoucements}/${updateId}`, data);
    return response.data;
  } catch (error) {
    console.error('No Updated Announcements', error);
    throw error;
  }
};

// Delete Announcements
const API_Delete_Announcement = `http://localhost:5000/api/anouncement-delete-admin`;
export const deleteAnnouncement =  async (id, deleteItem)=>{
  try {
    const response = await axios.delete(`${API_Delete_Announcement}/${id}`, deleteItem);
    return  response.data;
  } catch (error) {
    console.error('No Delete Announcements', error);
    throw error;
  }
};

// Events Update
const API_UpdateEvents = `http://localhost:5000/api/update-events-admin`;
export const createUpdateEvents = async (updateId, data)=>{
  try {
    const response = await axios.put(`${API_UpdateEvents}/${updateId}`, data);
    return response.data;
  } catch (error) {
    console.error('No Updated Announcements', error);
    throw error;
  }
};

// Delete Events
const API_Delete_Events = `http://localhost:5000/api/events-delete-admin`;
export const deleteEvents =  async (id, deleteItem)=>{
  try {
    const response = await axios.delete(`${API_Delete_Events}/${id}`, deleteItem);
    return  response.data;
  } catch (error) {
    console.error('No Delete Announcements', error);
    throw error;
  }
};

// Update News 
const API_UpdateNews = `http://localhost:5000/api/update-news-admin`;
export const createUpdateNews = async (updateId, data)=>{
  try {
    const response = await axios.put(`${API_UpdateNews}/${updateId}`, data);
    return response.data;
  } catch (error) {
    console.error('No Updated Announcements', error);
    throw error;
  }
};

// Delete News
const API_Delete_News = `http://localhost:5000/api/news-delete-admin`;
export const deleteNews =  async (id, deleteItem)=>{
  try {
    const response = await axios.delete(`${API_Delete_News}/${id}`, deleteItem);
    return  response.data;
  } catch (error) {
    console.error('No Delete Announcements', error);
    throw error;
  }
};

// Get All Upload Files
const API_Files = `http://localhost:5000/api/file`;

export const getAllFiles = async ()=> {
    try {
      const response = await axios.get(API_Files);
      return response.data;
    } catch (error) {
      console.error("No files exist", error);
      throw error;
    }
};


