import React from "react";
import { useState } from "react";
import CreateModal from "../Modal/RegistrationModal";
import { Button } from "flowbite-react";
import UpdateModal from "../Modal/EditModal";
import DeleteModal from "../Modal/DeleteModal";
import Header from "../components/Header";
import ProfileModal from "../Modal/ProfileModal";

const UserManagement = () => {
 const [openModal, setOpenModal] = useState(false);
 const [EditopenModal, EditsetOpenModal] = useState(false);
 const [isdeleteOpen, setisDeleteOpen] = useState(false);
 const [openProfile, setOpenProfile] = useState(false);

  return (
   <>
    <div className="flex flex-col min-h-screen bg-gray-100"> 
      {openProfile &&  <ProfileModal setClose={()=> setOpenProfile(!true)}/>}
      <main className="flex-1 p-6 ml-64">
       {/* Header */}
       <h1 className="text-2xl font-bold text-gray-700">User Management</h1>
       <Header setClose={()=> setOpenProfile(true)}/>
      {/* User List */}
      <div className="mb-8">
      <div className="flex justify-start gap-2">
        <div>
          <Button className="bg-blue-500" onClick={() => setOpenModal(true)}>Add User</Button>
        </div>
          <div>
            <select
             
             className="border border-gray-300 rounded-lg p-2 max-w-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="principal">All List</option>
              <option value="principal">Principal</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
      </div>

      <CreateModal openModal={openModal} setOpenModal={()=> setOpenModal(!true)}/>
      <UpdateModal EditopenModal={EditopenModal} EditsetOpenModal={()=> EditsetOpenModal(!true)}/>
      <DeleteModal isdeleteOpen={isdeleteOpen} setisDeleteOpen={()=> setisDeleteOpen(!true)}/>

        <h2 className="text-lg font-semibold text-gray-600 mb-4">User List</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full">
            <thead className="bg-gray-200 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">School</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder rows */}
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">Name {index + 1}</td>
                  <td className="border px-4 py-2">user{index + 1}@example.com</td>
                  <td className="border px-4 py-2">Principal</td>
                  <td className="border px-4 py-2">CRT</td>
                  <td className="border px-4 py-2 flex space-x-2">
                  <Button className="text-blue-500 hover:underline">View</Button>
                    <Button onClick={()=> EditsetOpenModal(true)} className="text-green-600 hover:underline">Update</Button>
                    <Button onClick={()=> setisDeleteOpen(true)} className="text-red-500 hover:underline">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </main>
    </div>
   </>
  );
};

export default UserManagement;
