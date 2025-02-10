import { useState, useEffect } from "react";
import { updateSchedule } from "../../../services/Api";

export default function ScheduleModalUpdate({isUpdateOpen, isUpdateClose, schedule, onUpdate}) {
      const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        description: "",
      });

      useEffect(() => {
        if (schedule) setFormData(schedule); // Pre-fill form
      }, [schedule]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
      };

      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const updatedSchedule = await updateSchedule(schedule._id, formData);
          onUpdate(updatedSchedule); // Update state in parent component
          isUpdateClose(); // Close modal
        } catch (error) {
          console.error("Update failed:", error);
        }
      };

    if(!isUpdateOpen) return null;

    return(
        <>
         <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
           <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full relative">
             <button
               onClick={isUpdateClose}
               className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
             >
               ✕
             </button>
     
             <h2 className="text-lg font-semibold mb-4 text-gray-700">Update Schedule</h2>
     
             <form onSubmit={handleUpdate}>
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
                 Update Schedule
               </button>
             </form>
           </div>
         </div>
        </>
    )
}