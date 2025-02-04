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

const API_SpecificTeachers = "http://localhost:5000/api/specificteachers";

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
const API_Files = 'http://localhost:5000/api/file';

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
const API_Approval = "http://localhost:5000/api/approve";

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
const API_Reject = "http://localhost:5000/api/reject";
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
const API_userPendingList = 'http://localhost:5000/api/pending-teachers';

export const getUserPending = async (principalUserId)=>{
  try {
    const response = await axios.get(`${API_userPendingList}/${principalUserId}`);
    return response.data;
  } catch (error) {
    console.error("No teachers users exist!", error);
    throw error;
  }
}