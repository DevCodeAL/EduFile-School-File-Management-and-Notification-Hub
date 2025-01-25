import React from "react";
import Header from "./Modal/Header";

const PrincipalDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    {/* Main Content */}
    <main className="flex-1 p-6 ml-64">
      {/* Header */}
        <h1 className="text-2xl font-bold text-gray-700">Principal Dashboard</h1>
        <Header/>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-gray-500 text-sm">Total Teachers</h2>
          <p className="text-2xl font-bold text-blue-500">123</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-gray-500 text-sm">Pending Applications</h2>
          <p className="text-2xl font-bold text-orange-500">5</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-gray-500 text-sm">Files Uploaded</h2>
          <p className="text-2xl font-bold text-green-500">47</p>
        </div>
      </section>
  
      {/* Upload Files Section */}
      <section id="upload" className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-700">Upload Files</h2>
        <div className="mt-4 border-dashed border-2 border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center">
          <p className="text-gray-500">Drag and drop files here</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Browse Files
          </button>
        </div>
      </section>
  
      {/* Pending Applications Section */}
      <section id="teachers" className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">List of Teachers</h2>
        <table className="w-full text-left border-collapse">
            <thead>
            <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {/* Example Row 1 */}
            <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">John Doe</td>
                <td className="border border-gray-300 px-4 py-2">john@example.com</td>
                <td className="border border-gray-300 px-4 py-2 text-green-500 font-semibold">Active</td>
                <td className="border border-gray-300 px-4 py-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    View
                </button>
                </td>
            </tr>
            </tbody>
        </table>
        </section>
    </main>
  </div>  
  );
};

export default PrincipalDashboard;
