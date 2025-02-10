import { useEffect, useState } from "react";
import { createSchedule, deleteSchedule, getAllSchedule } from "../../../services/Api";
import { FaPlus } from "react-icons/fa";
import { useAuth } from '../../../context/AuthContext'
import { BsThreeDotsVertical } from "react-icons/bs";
import ScheduleModalUpdate from "../Modal/ScheduleUpdateModal";
import DeleteModal from "../Modal/DeleteAlertSchedule";

export default function Schedule() {
  const { user } = useAuth();
  const [isSchedule, setIsSchedule] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedDeleteSchedule, setIsDeletedSchedule] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  // Fetch Shchedules
  useEffect(()=>{
      const newSchedule = async ()=>{
        const id = user?.data._id;
        try {
          const response = await getAllSchedule(id);
          setSchedules(response);
        } catch (error) {
          console.error('Error fetching no schedule exist!', error);
        }
      };

      newSchedule();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.data._id;
     try {
        const response = await createSchedule(formData, userId);
        // Fetch the updated schedules after creating a new one
        const updatedSchedules = await getAllSchedule(userId);
        setSchedules(updatedSchedules);
        console.log(response);
        setFormData({
            title: "",
            date: "",
            time: "",
            description: "",
        });
        setIsSchedule(false);
     } catch (error) {
        console.error('Error no schedule created or no response!', error);
     }   
  };

  // Handle Updates
const handleEditEvent =  (schedule)=>{
    setSelectedSchedule(schedule);
    setIsUpdate(true);
};

// Handle Delete
const handleDelete = async (schedule) => {
  if (!schedule || !schedule._id) return;

  try {
    await deleteSchedule(schedule._id);
    setSchedules((prevSchedules) =>
      prevSchedules.filter((s) => s._id !== schedule._id)
    );
     
    setIsDelete(false);
  } catch (error) {
    console.error("Error deleting schedule:", error);
  }
};

async function UpdateUI() {
  // Fetch updated schedules using user ID
  const id = user?.data._id;
  const updatedSchedules = await getAllSchedule(id);
  setSchedules(updatedSchedules);
};



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        
      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">📅 Schedule</h1>
      <p className="text-gray-600 mb-6">Keep track of important dates and deadlines.</p>

{/* Create button that open a form */}
    <button
    onClick={()=> setIsSchedule(true)}
      className="flex items-center justify-center text-slate-600 w-16 h-16 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
    >
     <FaPlus/>
    </button>

    {isSchedule && (
         
         
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full relative">
        <button
          onClick={()=> setIsSchedule(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-700">Create a New Schedule</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Schedule Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          ></textarea>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
            Add Schedule
          </button>
        </form>
      </div>
    </div>
    )}

      {/* Schedule List (Grid View) */}
      <div className="mt-6 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {schedules.length === 0 ? (
          <p className="text-gray-500">No schedules added yet.</p>
        ) : (
          schedules.toReversed().map((schedule) => (
            <div key={schedule._id} className="relative bg-white p-4 shadow-md rounded-lg border border-gray-200 transform transition-all scale-95 hover:scale-100">
          {/* Three Dots (Dropdown Trigger) */}
          <div className="absolute top-2 right-2 group">
            <span className="p-2 absolute inset-0 left-auto cursor-pointer text-gray-600 hover:text-gray-900">
              <BsThreeDotsVertical />
            </span>

            {/* Tooltip & Buttons (Visible on Hover) */}
            <div className="hidden group-hover:flex flex-col absolute right-0 top-6 bg-white shadow-lg border border-gray-200 rounded-lg w-28 p-2 z-10">
              <button 
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 p-2 w-full text-sm"
                onClick={() => handleEditEvent(schedule)}
              >
                ✏️ Edit
              </button>
              <button 
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 p-2 w-full text-sm"
                onClick={() => {
                  setIsDeletedSchedule(schedule); 
                  setIsDelete(true);
                }}>
                🗑️ Delete
              </button>
            </div>
          </div>

          {/* Schedule Details */}
          <h3 className="text-lg font-semibold text-gray-800">{schedule.title}</h3>
          <p className="text-gray-600">
            📅 {schedule.date} | ⏰ {schedule.time}
          </p>
          {schedule.description && <p className="text-gray-500 mt-2">{schedule.description}</p>}
        </div>        
          ))
        )}

        {/* Update Modal */}
        {isUpdate && (
          <ScheduleModalUpdate 
          isUpdateOpen={isUpdate} 
          isUpdateClose={() => setIsUpdate(false)}
          schedule={selectedSchedule} // Pass selected schedule
          onUpdate={(updatedData) => {
            setSchedules(prevSchedules => prevSchedules.map(s => s._id === updatedData._id ? updatedData : s));
          }}
        />
        
        )}

      {/* Update Modal */}
        {isDelete && (
          <DeleteModal
           isOpen={isDelete}
            onClose={()=> setIsDelete(false)}
             schedule={selectedDeleteSchedule}
             onConfirm={()=>{
              handleDelete(selectedDeleteSchedule);
              UpdateUI();
              setIsDelete(false); // Close modal after deletion
             }}
             />
        )}
        
      </div>
      </main>
    </div>
  );
}
