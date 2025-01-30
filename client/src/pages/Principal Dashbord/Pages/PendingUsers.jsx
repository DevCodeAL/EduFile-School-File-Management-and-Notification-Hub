import { useState } from "react";
import Header from "../../../components/Header";
import ProfileModal from "../../../components/Profile";

export default function PendingUsers() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-1 p-6 ml-64">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-700">Principal Dashboard</h1>
            <Header setOpen={() => setOpen(true)} />
          </div>

          {isOpen && <ProfileModal setClose={() => setOpen(false)} />}

          {/* Pending Applications Section */}
          <section className="mt-8 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Applications</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="px-6 py-3 text-left font-medium">Name</th>
                    <th className="px-6 py-3 text-left font-medium">Role</th>
                    <th className="px-6 py-3 text-left font-medium">School</th>
                    <th className="px-6 py-3 text-left font-medium">Email</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50 hover:bg-gray-100 transition">
                    <td className="px-6 py-4 border-b">John Doe</td>
                    <td className="px-6 py-4 border-b">Teacher</td>
                    <td className="px-6 py-4 border-b">Springfield High</td>
                    <td className="px-6 py-4 border-b">john@example.com</td>
                    <td className="px-6 py-4 border-b flex space-x-4">
                      <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition">
                        Approve
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                        Reject
                      </button>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-100 transition">
                    <td className="px-6 py-4 border-b">Jane Smith</td>
                    <td className="px-6 py-4 border-b">Admin</td>
                    <td className="px-6 py-4 border-b">Riverside Academy</td>
                    <td className="px-6 py-4 border-b">jane@example.com</td>
                    <td className="px-6 py-4 border-b flex space-x-4">
                      <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition">
                        Approve
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                        Reject
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
