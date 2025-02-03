import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import ProfileModal from "../../../components/Profile";
import { getUserPending, userApproval, rejectItem } from "../../../services/Api";
import SuccessModal from "../Modal/SuccessModal";
import RejectModal from "../Modal/RejectModal";

export default function PendingUsers() {
  const [isOpen, setOpen] = useState(false);
  const [isApproved, setApproved] = useState(false);
  const [isReject, setReject] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [pending, setPending] = useState([]);

  const fetchAllPendingTeachers = async () => {
    try {
      const response = await getUserPending();
      setPending(response);
    } catch (error) {
      console.error("No user to be approved!", error);
    }
  };

  useEffect(() => {
    fetchAllPendingTeachers();
  }, []);

  const approveTeacher = async (id) => {
    setApproved(true);
    try {
      await userApproval(id);
      setPending(pending.filter((teacher) => teacher._id !== id));
    } catch (error) {
      console.error("Error approving teacher:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectItem(id);
      setPending(pending.filter((teacher) => teacher._id !== id));
      setReject(false); // Close modal after rejection
    } catch (error) {
      console.error("Error rejecting teacher:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-1 p-6 ml-64">
          <div className="flex justify-between items-center mb-6 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-700">Principal Dashboard</h1>
            <Header setOpen={() => setOpen(true)} />
          </div>

          {isOpen && <ProfileModal setClose={() => setOpen(false)} />}

          {isApproved && <SuccessModal onClose={() => setApproved(false)} />}

          {isReject && (
            <RejectModal
              isOpen={isReject}
              onClose={() => setReject(false)}
              rejectItem={handleReject}
              teacherId={selectedTeacherId} // Pass the teacher ID
            />
          )}

          <section className="mt-8 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pending Applications</h2>

            <div className="overflow-auto max-h-96">
              <table className="w-full border-collapse rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="px-6 py-3 text-left font-medium">Role</th>
                    <th className="px-6 py-3 text-left font-medium">Name</th>
                    <th className="px-6 py-3 text-left font-medium">School</th>
                    <th className="px-6 py-3 text-left font-medium">Email</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((items) => (
                    <tr key={items._id} className="bg-gray-50 hover:bg-gray-100 transition">
                      <td className="px-6 py-4 border-b">{items.role}</td>
                      <td className="px-6 py-4 border-b">{items.fullname}</td>
                      <td className="px-6 py-4 border-b">{items.school}</td>
                      <td className="px-6 py-4 border-b">{items.email}</td>
                      <td className="px-6 py-4 border-b flex space-x-4">
                        <button
                          onClick={() => approveTeacher(items._id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTeacherId(items._id); // Store teacher ID
                            setReject(true);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
