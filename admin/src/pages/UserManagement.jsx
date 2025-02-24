import React, { useEffect } from "react";
import { useState } from "react";
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";
import CreateModal from "../Modal/RegistrationModal";
import { Button } from "flowbite-react";
import UpdateModal from "../Modal/EditModal";
import DeleteModal from "../Modal/DeleteModal";
import Header from "../components/Header";
import ProfileModal from "../components/ProfileAdmin";
import { getAllUsers, getAllUsersTeachers } from "../Services/ItemServices";

const UserManagement = () => {
 const [openModal, setOpenModal] = useState(false);
 const [EditopenModal, EditsetOpenModal] = useState(false);
 const [isdeleteOpen, setisDeleteOpen] = useState(false);
 const [isOpen, setIsOpen] = useState(false);
 const [userItems, setIsUserItems] = useState([]);
 const [userItemsTeachers, setIsUserItemsTeachers] = useState([]);
 const [isSelect, setSelect] = useState('principal');
 const [isSchoolSelect, setIsSelect] = useState('Ayos Lomboy Elementary School');


//  Handle Select Changge
const HandleChange = (e)=>{
    setSelect(e.target.value);
};

const HandleSchool = (e)=>{
  setIsSelect(e.target.value);
}
// Function to filter users based on selected role
const filteredData = (items) => {
  return items.filter((user) => user.role.toLowerCase() === isSelect.toLowerCase());
};

const filteredBySchool = (items) => {
  return items.filter((user) => user.school.toLowerCase() === isSchoolSelect.toLowerCase());
};

// Fetch All users
 useEffect(()=>{
  const fetchAllUsers = async ()=>{
    try {
      const response = await getAllUsers();
      setIsUserItems(response.data);
      const responseTeachers = await getAllUsersTeachers();
      setIsUserItemsTeachers(responseTeachers.data);
      console.log(responseTeachers.data);
    } catch (error) {
      console.error('Failed to fetch data or error!', error);
      throw error;
    }
  }

  fetchAllUsers();

 },[]);



  return (
   <>
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
      <div className="mb-8">
      <div className="flex justify-start gap-2">
        <div>
          <Button className="bg-blue-500" onClick={() => setOpenModal(true)}>Add User</Button>
        </div>
          <div>
            <select
            onChange={HandleChange}
             className="border border-gray-300 rounded-lg p-2 max-w-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value={isSelect}>Filter by Position</option>
              <option value="principal">Principal</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div>
            <select
            onChange={HandleSchool}
             className="border border-gray-300 rounded-lg p-2 max-w-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value={isSchoolSelect}>Filter by School</option>
              <option value="Ayos Lomboy Elementary School">Ayos Lomboy Elementary School</option>
              <option value="Bantug Elementary School">Bantug Elementary School</option>
              <option value="Bunol Integrated School">Bunol Integrated School</option>
              <option value="Caballero Elementary School">Caballero Elementary School</option>
              <option value="Cabaruan Elementary School">Cabaruan Elementary School</option>
              <option value="Camiing Elementary School">Camiing Elementary School</option>
              <option value="Cavite Elementary School">Cavite Elementary School</option>
              <option value="Cawayang Bugtong Elementary School">Cawayang Bugtong Elementary School</option>
              <option value="Consuelo Elementary School">Consuelo Elementary School</option>
              <option value="Culong Elementary School">Culong Elementary School</option>
              <option value="Don Pedro Elementary School">Don Pedro Elementary School</option>
              <option value="Faigal Elementary School">Faigal Elementary School</option>
              <option value="Guimba East Central School">Guimba East Central School</option>
              <option value="Guiset Elementary School">Guiset Elementary School</option>
              <option value="Manacsac Elementary School">Manacsac Elementary School</option>
              <option value="Mataranoc Elementary School">Mataranoc Elementary School</option>
              <option value="Naglabrahan Elementary School">Naglabrahan Elementary School</option>
              <option value="Nagpandayan Elementary School">Nagpandayan Elementary School</option>
              <option value="San Andres Elementary School">San Andres Elementary School</option>
              <option value="San Bernardino Integrated School">San Bernardino Integrated School</option>
              <option value="San Marcelino Integrated School">San Marcelino Integrated School</option>
              <option value="San Roque Elementary School">San Roque Elementary School</option>
              <option value="Sinulatan Elementary School">Sinulatan Elementary School</option>
              <option value="Sta. Ana Integrated School">Sta. Ana Integrated School</option>
              <option value="Sta. Cruz Elementary School">Sta. Cruz Elementary School</option>
              <option value="Sta. Lucia Elementary School">Sta. Lucia Elementary School</option>
              <option value="Triala Elementary School">Triala Elementary School</option>    
            </select>
          </div>
      </div>

      <CreateModal openModal={openModal} setOpenModal={()=> setOpenModal(!true)}/>
      <UpdateModal EditopenModal={EditopenModal} EditsetOpenModal={()=> EditsetOpenModal(!true)}/>
      <DeleteModal isdeleteOpen={isdeleteOpen} setisDeleteOpen={()=> setisDeleteOpen(!true)}/>

        <h2 className="text-lg font-semibold text-gray-600 mb-4">User List</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-blue-500 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 border border-gray-300 text-left">Role</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Name</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Email</th>
              <th className="px-6 py-3 border border-gray-300 text-left">School</th>
              <th className="px-6 py-3 border border-gray-300 text-center">Actions</th>
            </tr>
          </thead>

    <tbody className="bg-white divide-y divide-gray-200">
      {filteredBySchool(filteredData([...userItems, ...userItemsTeachers])).map((items) => (
          <tr key={items._id} className="hover:bg-gray-100 transition">
          <td className="px-6 py-4 border border-gray-300 text-gray-700">
            {items.role === 'principal' ? items.role.replace('p', 'P') : items.role ==='teacher' && items.role.replace('t', 'T')}</td>
          <td className="px-6 py-4 border border-gray-300 text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis min-w-[100px]">{items.fullname}</td>
          <td className="px-6 py-4 border border-gray-300 text-gray-700">{items.email}</td>
          <td className="px-6 py-4 border border-gray-300 text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis min-w-[100px]">
          {items.school}
        </td>
          <td className="px-6 py-4 border border-gray-300 flex justify-center space-x-2">
            <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
              <HiEye className="text-lg" /> View
            </button>

            <button 
              onClick={() => EditsetOpenModal(true)}
              className="text-green-600 hover:text-green-800 flex items-center gap-1"
            >
              <HiPencilAlt className="text-lg" /> Update
            </button>

            <button 
              onClick={() => setisDeleteOpen(true)}
              className="text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <HiTrash className="text-lg" /> Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        </div>
      </div>
      </main>
    </div>
   </>
  );
};

export default UserManagement;
