import Analytics from './Analytics'
import { useAuth } from '../AuthContext/AuthContext';
import ProfileModal from '../Modal/ProfileModal';
import { useState } from 'react';
import Header from '../components/Header';


function AdminDashboard() {
const [isOpen, setClose] = useState(false);
const { user } = useAuth();

if (!user) {
  return <p>Loading user profile...</p>; // Show a loading state if the user data hasn't been fetched yet
}

    return (
      <div className="flex flex-col min-h-screen bg-gray-100"> 
      {/* Profile Modal */}
         {isOpen &&  <ProfileModal setClose={()=> setClose(!true)}/>}
      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-6 px-6 py-4">
          <div>
              <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
          </div>

          <div className='flex justify-end'>
               <Header setClose={()=> setClose(true)}/>
            </div>
          </div>
       
        {/* Overview Section */}
        <section>
          <div className="grid grid-cols-2 gap-6 mb-5">
            {/* Card 1: Total Users */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-700">Total Users</h2>
              <p className="text-3xl font-bold text-gray-900">1,234</p>
            </div>
    
            {/* Card 2: New Files */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-700">New Files</h2>
              <p className="text-3xl font-bold text-gray-900">456</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-5">
            {/* Card 1: Total Users */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-700">Total Principals</h2>
              <p className="text-3xl font-bold text-gray-900">28</p>
            </div>
    
            {/* Card 2: New Files */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-700">Total Teachers</h2>
              <p className="text-3xl font-bold text-gray-900">160</p>
            </div>
          </div>
    
        <Analytics/>
        </section>
      </main>
    </div>
    
    );
  }
  
  export default AdminDashboard;
  