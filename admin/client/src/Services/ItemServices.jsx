const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';

//Login API for Admin
const API_Login = `${VITE_API_BASE_URL}/api/admin`;
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
const API_Admin = `${VITE_API_BASE_URL}/api/profile`;

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
const API_Principal = `${VITE_API_BASE_URL}/api/principal`;

export const createPrincipal = async (userData)=>{
    try {
      const response = await axios.post(API_Principal, userData);
      return response.data;
    } catch (error) {
      console.error("Failed to create:", error);
      throw error;
    }
}