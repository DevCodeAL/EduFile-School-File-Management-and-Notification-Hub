import axios from 'axios';

// Teacher Registration
const userItemsAPI = 'http://localhost:5000/api/register';
export const createUser = async (userData) => {

    try {
        const response = await axios.post(userItemsAPI, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; 
    }
};

// Users Login
const API_Login = "http://localhost:5000/api/user";
export const adminLogin = async (userItem)=> {
    try {
        const response = await axios.post(API_Login, userItem);
        return response.data;
    } catch (error) {
        console.error("Error login user:", error);
        throw error; 
    }
}


// Get Profile Users Principals and Teachers
const API_Admin = 'http://localhost:5000/api/user-profile';

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


// Associte Teacher Data
const API_Associte = 'http://localhost:5000/api/associate';

export const createAssociate = async (userData)=>{
  try{
      const response = await axios.post(API_Associte, userData);
      return response.data;
  }catch(error){
    console.error("No teachers associate with principal", error);
    throw error;
  }
}

const API_Files = 'http://localhost:5000/api/files';

export const getAllFiles = async (files)=> {
    try {
      const response = await axios.get(API_Files, files);
      return response.data;
      
    } catch (error) {
      console.error("No files exist", error);
      throw error;
    }
}