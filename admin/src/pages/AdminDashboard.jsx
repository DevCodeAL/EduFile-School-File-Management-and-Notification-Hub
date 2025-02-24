import Analytics from './Analytics'
import { useAuth } from '../AuthContext/AuthContext';
import ProfileModal from '../components/ProfileAdmin';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getAllUsers, getAllUsersTeachers,  getAllFiles  } from "../Services/ItemServices";
import { FaUsers, FaFileAlt, FaUserCheck, FaUser } from "react-icons/fa";


function AdminDashboard() {
const [isOpen, setIsOpen] = useState(false);
 const [userItems, setIsUserItems] = useState([]);
 const [userItemsTeachers, setIsUserItemsTeachers] = useState([]);
 const [files, setFiles] = useState([]);
const { user } = useAuth();

if (!user) {
  return <p>Loading user profile...</p>; 
};

// Fetch All users
 useEffect(()=>{
  const fetchAllUsers = async ()=>{
    try {
      const response = await getAllUsers();
      setIsUserItems(response.data);
      const responseTeachers = await getAllUsersTeachers();
      setIsUserItemsTeachers(responseTeachers.data);
      const getFiles = await getAllFiles();
      setFiles(getFiles);
    } catch (error) {
      console.error('Failed to fetch data or error!', error);
      throw error;
    }
  }

  fetchAllUsers();

 },[]);



    return (
      <div className="flex flex-col min-h-screen bg-gray-100"> 
      {/* Profile Modal */}
         {isOpen &&  <ProfileModal isOpen={isOpen} setClose={()=> setIsOpen(false)}/>}
      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-6 px-6 py-4">
          <div>
              <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
          </div>

          <div className='flex justify-end'>
               <Header setOpen={()=> setIsOpen(true)}/>
            </div>
          </div>
       
        {/* Overview Section */}
        <section>
      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Card 1: Total Users */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl rounded-lg p-6 flex items-center space-x-4">
          <FaUsers size={40} className="text-white" />
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold">{userItems.concat(userItemsTeachers).length}</p>
          </div>
        </div>

        {/* Card 2: New Files */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-xl rounded-lg p-6 flex items-center space-x-4">
          <FaFileAlt size={40} className="text-white" />
          <div>
            <h2 className="text-lg font-semibold">New Files</h2>
            <p className="text-3xl font-bold">{files.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Card 3: Total Principals */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-xl rounded-lg p-6 flex items-center space-x-4">
          <FaUserCheck size={40} className="text-white" />
          <div>
            <h2 className="text-lg font-semibold">Total Principals</h2>
            <p className="text-3xl font-bold">{userItems.length}</p>
          </div>
        </div>

        {/* Card 4: Total Teachers */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl rounded-lg p-6 flex items-center space-x-4">
          <FaUser size={40} className="text-white" />
          <div>
            <h2 className="text-lg font-semibold">Total Teachers</h2>
            <p className="text-3xl font-bold">{userItemsTeachers.length}</p>
          </div>
        </div>
      </div>

      <Analytics />
    </section>
      </main>
    </div>
    
    );
  }
  
  export default AdminDashboard;
  