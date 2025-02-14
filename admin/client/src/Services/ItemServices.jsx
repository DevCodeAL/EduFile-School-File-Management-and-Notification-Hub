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