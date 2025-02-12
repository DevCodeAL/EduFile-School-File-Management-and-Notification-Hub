import { useEffect, useState } from "react"
import AnnouncementModal from "../Principal Dashbord/Modal/AnnouncementModal";
import { getAllAnnouncementByPrincipal } from "../../services/Api";
import { useAuth } from '../../context/AuthContext';

export default function TeachersAnnouncement(){
    const { user } = useAuth();
    const [announcements, setIsAnnouncements] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(false);

useEffect(()=>{
    const fetchAnnouncment = async ()=>{
        const teacherID = user?.data._id;
        try {
            const response = await getAllAnnouncementByPrincipal(teacherID);
            setIsAnnouncements(response);
        } catch (error) {
            console.error('Error fetching announcement!', error);
        }
    }

    fetchAnnouncment();

}, []);

    return(
        <>
            <div className="flex flex-col min-h-screen bg-gray-100">
                  {/* Main Content */}
                  <main className="flex-1 p-6 ml-64">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4">📢 Announcements</h1>
                    <p className="text-gray-600 mb-6">Post updates and notify teachers here.</p>
            
                    {/* Announcements Grid View */}
                    <div className="mt-6 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                      {announcements.length === 0 ? (
                        <p className="text-gray-500">No announcements yet.</p>
                      ) : (
                        announcements.toReversed().map((announcement) => (
                          <div key={announcement._id} className="relative bg-white p-4 shadow-md rounded-lg border border-gray-200 transform transition-all scale-95 hover:scale-100">
                            <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                            <p className="text-gray-600">📅 {announcement.date} | ⏰ {announcement.time}</p>
                            <p className="text-gray-500 mt-2">
                              {announcement.message.length > 100 ?
                               announcement.message.slice(0, 100).concat('.....') : announcement.message}
                              </p>
                              <button
                             onClick={() => setSelectedAnnouncement(announcement)}
                            className="mt-2 text-blue-500 hover:underline"
                          >
                            Read More
                          </button>
                          </div>
                        ))
                      )}
            
                            {/* Show modal when an announcement is selected */}
                        {selectedAnnouncement && (
                          <AnnouncementModal
                            announcement={selectedAnnouncement}
                            onClose={() => setSelectedAnnouncement(null)}
                          />
                        )}
                    </div>
                  </main>
                </div>
        </>
    )
}