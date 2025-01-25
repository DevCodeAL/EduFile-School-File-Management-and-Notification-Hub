import { Button } from "flowbite-react";
import FileDeleteModal from "../Modal/FileModalDelete";
import { useState } from "react";
import Header from "../components/Header";
import ProfileModal from '../Modal/ProfileModal';

function FileManagement() {
  const [isdeleteOpenFile, setisDeleteOpenFile] = useState(false);
 const [openProfile, setOpenProfile] = useState(false);

    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        {openProfile && <ProfileModal setClose={()=> setOpenProfile(!true)}/>}
      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
       {/* Header */}
       <h1 className="text-2xl font-bold text-gray-700">File Management</h1>
       <Header setClose={()=> setOpenProfile(true)}/>

        <FileDeleteModal isdeleteOpenFile={isdeleteOpenFile} setisDeleteOpenFile={()=> setisDeleteOpenFile(!true)}/>

        <div className="p-6">
      {/* View Files Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">View Files</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full">
            <thead className="bg-gray-200 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-4 py-2">File Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Uploaded By</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">School</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder rows */}
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="border px-4 py-2">File_{index + 1}.pdf</td>
                  <td className="border px-4 py-2">PDF</td>
                  <td className="border px-4 py-2">User {index + 1}</td>
                  <td className="border px-4 py-2">Principal {index + 1}</td>
                  <td className="border px-4 py-2">CRT</td>
                  <td className="border px-4 py-2">2025-01-22</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <Button className="text-blue-500 hover:underline">View</Button>
                    <Button onClick={()=> setisDeleteOpenFile(true)} className="text-red-500 hover:underline">Delete</Button>
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
    );
  }
  
  export default FileManagement;
  