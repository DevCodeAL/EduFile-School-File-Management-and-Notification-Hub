import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext";
import { getAllSpecificScheduleTeachers } from "../../../services/Api";

export default function TeacherSchedule(){
    const { user } = useAuth();
    const [schedules, setIsSchedule] = useState([]);

    useEffect(()=>{
        const  FetchSchedule = async ()=>{
            const id = user?.data._id;
            try {
                const response = await getAllSpecificScheduleTeachers(id);
                setIsSchedule(response);
            } catch (error) {
                console.error('Failed to fetch schedule!', error);
            }
        }

        FetchSchedule();

    },[]);


    return(
        <>
            <div className="flex flex-col min-h-screen bg-gray-100">
                    
                  {/* Main Content */}
                  <main className="flex-1 p-6 ml-64">
                  <h1 className="text-2xl font-bold text-gray-700 mb-4">📅 Schedule</h1>
                  <p className="text-gray-600 mb-6">Keep track of important dates and deadlines.</p>
            
                  {/* Schedule List (Grid View) */}
                  <div className="mt-6 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {schedules.length === 0 ? (
                      <p className="text-gray-500">No schedules added yet.</p>
                    ) : (
                      schedules.toReversed().map((schedule) => (
                        <div key={schedule._id} className="relative bg-white p-4 shadow-md rounded-lg border border-gray-200 transform transition-all scale-95 hover:scale-100">
                      {/* Schedule Details */}
                      <h3 className="text-lg font-semibold text-gray-800">{schedule.title}</h3>
                      <p className="text-gray-600">
                        📅 {schedule.date} | ⏰ {schedule.time}
                      </p>
                      {schedule.description && <p className="text-gray-500 mt-2">{schedule.description}</p>}
                    </div>        
                      ))
                    )}
                  </div>
                  </main>
                </div>
        </>
    )
}