import axios from 'axios';
const VITE_API_BASE_URL = import.meta.VITE_API_BASE_URL;

// Teacher Registration
const userItemsAPI = `${VITE_API_BASE_URL}/api/register`; 
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
const API_Login = `${VITE_API_BASE_URL}/api/user`;
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
const API_Admin = `${VITE_API_BASE_URL}/api/user-profile`;

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
const API_Associte = `${VITE_API_BASE_URL}/api/associate`;

export const createAssociate = async (userData)=>{
  try{
      const response = await axios.post(API_Associte, userData);
      return response.data;
  }catch(error){
    console.error("No teachers associate with principal", error);
    throw error;
  }
}

const API_SpecificTeachers = `${VITE_API_BASE_URL}/api/specificteachers`;

export const getAllSpecificTeachers = async (id)=> {
  try {
    const response = await axios.get(`${API_SpecificTeachers}/${id}`);
    return response.data;
  } catch (error) {
    console.error("No specific teachers exist", error);
    throw error;
  }
}


// Get All uploaded files
const API_Files = `${VITE_API_BASE_URL}/api/file`;

export const getAllFiles = async ()=> {
    try {
      const response = await axios.get(API_Files);
      return response.data;
    } catch (error) {
      console.error("No files exist", error);
      throw error;
    }
}

// Api for approval
const API_Approval = `${VITE_API_BASE_URL}/api/approve`;

export const userApproval = async (id) => {
  try {
    const response = await axios.put(`${API_Approval}/${id}`);
    return response.data;
  } catch (error) {
    console.error("No users exist to be approved", error);
    throw error;
  }
};

// API for Reject application teacher
const API_Reject = `${VITE_API_BASE_URL}/api/reject`;
export const rejectItem = async (id)=> {
   try {
    const response = await axios.delete(`${API_Reject}/${id}`);
    return response.data;
   } catch (error) {
    console.error("No users exist to be deleted!", error);
    throw error;
   }
}



// API for get all pending teachers
const API_userPendingList = `${VITE_API_BASE_URL}/api/pending-teachers`;

export const getUserPending = async (principalUserId)=>{
  try {
    const response = await axios.get(`${API_userPendingList}/${principalUserId}`);
    return response.data;
  } catch (error) {
    console.error("No teachers users exist!", error);
    throw error;
  }
}