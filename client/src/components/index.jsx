import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaHome, FaNewspaper, FaBullhorn, FaPhone, FaCalendarAlt,  FaBars, FaTimes} from "react-icons/fa";
import { useNavigate } from "react-router";
import { fetchAllAnnouncements, fetchAllEvents, fetchAllNews } from "../services/Api";

export default function IndexHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [newsItem, setIsNewsItems] = useState([]);
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navigate = useNavigate();

    // Fetch Announcements Files
        useEffect(()=>{
         const fetchAnouncemnetFiles = async ()=>{
          try {
            const response = await fetchAllAnnouncements();
            setAnnouncements(response.data);
            const newsItemResponse = await fetchAllNews();
            setIsNewsItems(newsItemResponse.data);
            const eventResponse = await fetchAllEvents();
            setSlides(eventResponse.data);
            console.log(eventResponse.data);
          } catch (error) {
            console.error('No files exist!', error);
            throw error;
          }
         };
  
         fetchAnouncemnetFiles();
  
        }, []);

      useEffect(() => {
        if(slides.length === 0) return;
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
      }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-blue-500 text-white py-4 px-6 fixed w-full z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Guimba East EduLink</h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
        <li><a href="#home" className="flex items-center space-x-2 hover:underline"><FaHome/><span>Home</span></a></li>
          <li><a href="#events" className="flex items-center space-x-2 hover:underline"><FaCalendarAlt /><span>Events</span></a></li>
          <li><a href="#news" className="flex items-center space-x-2 hover:underline"><FaNewspaper /><span>News</span></a></li>
          <li><a href="#announcements" className="flex items-center space-x-2 hover:underline"><FaBullhorn /><span>Announcements</span></a></li>
          <li><a href="#contact" className="flex items-center space-x-2 hover:underline"><FaPhone /><span>Contact</span></a></li>
        </ul>

        {/* Login Button */}
        <button 
          onClick={() => navigate('/login')} 
          className="hidden md:block bg-white text-blue-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 shadow-md"
        >
          Login
        </button>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white text-2xl focus:outline-none"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-16 left-0 w-full bg-blue-600 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col space-y-4 py-4 text-center">
          <li><a href="#events" className="block py-2 hover:bg-blue-700"><FaCalendarAlt className="inline mr-2"/> Events</a></li>
          <li><a href="#news" className="block py-2 hover:bg-blue-700"><FaNewspaper className="inline mr-2"/> News</a></li>
          <li><a href="#announcements" className="block py-2 hover:bg-blue-700"><FaBullhorn className="inline mr-2"/> Announcements</a></li>
          <li><a href="#contact" className="block py-2 hover:bg-blue-700"><FaPhone className="inline mr-2"/> Contact</a></li>
          <li><button onClick={() => navigate('/login')} className="block bg-white text-blue-500 px-4 py-2 rounded-md font-semibold mx-auto w-3/4 hover:bg-gray-200 shadow-md">Login</button></li>
        </ul>
      </div>
    </nav>
      
      {/* Video Section */}
      <section id="home" className="relative w-full h-screen overflow-hidden">
        <video 
          className="absolute top-16 left-0 w-full h-full object-fill"
          src="/video/EduPortal.mp4" 
          autoPlay 
          muted 
          loop
        ></video>
      </section>

      {/* Interactive Carousel Section */}
      <section id="events" className="py-16 text-center bg-blue-100">
        <h2 className="text-4xl font-bold mb-6 text-blue-700 flex justify-center items-center space-x-2">
          <FaCalendarAlt /> <span>Upcoming Events</span>
        </h2>

        <div className="relative container mx-auto flex flex-col items-center justify-center w-2/3">
          {/* Carousel Content */}
          <div className="relative w-full h-72 bg-white shadow-lg rounded-md overflow-hidden flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full shadow-md z-10"
            >
              <FaChevronLeft />
            </button>

            {/* Image */}
            {slides.length > 0 && (
              <div key={slides[currentSlide]._id} className="relative w-full h-full animate-fade-left">
                {slides[currentSlide].files.map((file, index) => (
                  <img
                    key={index}
                    className="w-full h-full object-center md:object-top rounded-md"
                    src={`https://edu-file-school-file-management-and-notification-hub.vercel.app/${encodeURI(file?.metadata?.path.replace(/\\/g, "/"))}`}
                    alt="Event"
                  />
                ))}
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full shadow-md"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Event Message */}
          <div className="mt-4 text-lg font-semibold text-blue-700 max-w-md text-center px-4">
            {slides.length > 0 && <p>{slides[currentSlide]?.message}</p>}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-4">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-blue-500 w-4 h-4 scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex justify-center items-center space-x-2 text-blue-700">
          <FaNewspaper className="text-4xl" />
          <h2 className="text-4xl font-bold">Latest News</h2>
        </div>

        {/* Mews Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItem.map((newItem) => {
            const words = newItem.message.split(" ");
            const isExpanded = expanded[newItem._id];
            const displayMessage = isExpanded ? newItem.message : words.slice(0, 10).join(" ") + (words.length > 50 ? "..." : "");

            return (
              <div
                key={newItem._id}
                className="bg-gray-100 p-6 shadow-md rounded-lg hover:shadow-xl transition duration-300"
              >
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800">{newItem.title}</h3>
                
                {/* Announcement Message */}
                <p className="text-gray-700 mt-4">{displayMessage}</p>

                {/* Image Grid */}
                {newItem.files && newItem.files.length > 0 && (
                  <div className="mt-4 grid gap-2 grid-cols-1 sm:grid-cols-2">
                    {newItem.files.slice(0, 3).map((file, index) =>
                      file?.metadata?.path ? (
                        <img
                          key={index}
                          className={`rounded-lg object-cover ${
                            newItem.files.length === 1 ? "w-full h-auto" : "h-28 w-full"
                          }`}
                          src={`https://edu-file-school-file-management-and-notification-hub.vercel.app/${encodeURI(file?.metadata?.path.replace(/\\/g, "/"))}`}
                          alt={`Image ${index + 1}`}
                        />
                      ) : (
                        <div key={index} className="w-full h-28 bg-gray-300 flex justify-center items-center rounded-lg">
                          <span>No Image</span>
                        </div>
                      )
                    )}
                    {newItem.files.length > 3 && (
                      <div className="w-full h-28 bg-gray-300 flex justify-center items-center rounded-lg">
                        <span className="text-xl font-semibold">+{newItem.files.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}

                 {/* Read More Button (Always Visible) */}
                 <button
                  onClick={() => toggleReadMore(newItem._id)}
                  className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            );
          })}

        </div>
      </div>
    </section>

    {/* Announcements Section */}
<section id="announcements" className="py-16 bg-white">
  <div className="container mx-auto px-4">
    {/* Section Title */}
    <div className="flex justify-center items-center space-x-2 text-blue-700">
      <FaBullhorn className="text-4xl" />
      <h2 className="text-4xl font-bold">Announcements</h2>
    </div>

    {/* Announcements Grid */}
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {announcements.map((announcement) => {
        const words = announcement.message.split(" ");
        const isExpanded = expanded[announcement._id];
        const displayMessage = isExpanded
          ? announcement.message
          : words.slice(0, 10).join(" ") + (words.length > 50 ? "..." : "");

        return (
          <div
            key={announcement._id}
            className="bg-gray-100 p-6 shadow-md rounded-lg hover:shadow-xl transition duration-300"
          >
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800">{announcement.title}</h3>

            {/* Announcement Message */}
            <p className="text-gray-700 mt-4">{displayMessage}</p>

            {/* Image Grid */}
            {announcement.files && announcement.files.length > 0 && (
              <div className="mt-4 grid gap-2 grid-cols-1 sm:grid-cols-2">
                {announcement.files.slice(0, 3).map((file, index) => {
                  if (file?.fileType.startsWith('image')) {
                    return (
                      file?.metadata?.path && (
                        <img
                          key={index}
                          className={`rounded-lg object-cover ${
                            announcement.files.length === 1 ? "w-full h-auto" : "h-32 w-full"
                          }`}
                          src={`https://edu-file-school-file-management-and-notification-hub.vercel.app/${encodeURI(file?.metadata?.path.replace(/\\/g, "/"))}`}
                          alt={`Image ${index + 1}`}
                        />
                      )
                    );
                  } else if (file?.fileType.startsWith('video')) {
                    return (
                      file?.metadata?.path && (
                        <video
                          key={index}
                          className={`rounded-lg object-cover ${
                            announcement.files.length === 1 ? "w-full h-auto flex" : "h-32 w-full"
                          }`}
                          controls
                          src={`https://edu-file-school-file-management-and-notification-hub.vercel.app/${encodeURI(file?.metadata?.path.replace(/\\/g, "/"))}`}
                          alt={`Video ${index + 1}`}
                        />
                      )
                    );
                  } else {
                    return (
                      <div key={index} className="w-full h-28 bg-gray-300 flex justify-center items-center rounded-lg">
                        <span>No Image</span>
                      </div>
                    );
                  }
                })}

                {announcement.files.length > 3 && (
                  <div className="w-full h-28 bg-gray-300 flex justify-center items-center rounded-lg">
                    <span className="text-xl font-semibold">+{announcement.files.length - 3}</span>
                  </div>
                )}
              </div>
            )}

            {/* Read More Button (Always Visible) */}
            <button
              onClick={() => toggleReadMore(announcement._id)}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-500 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} Guimba East EduLink. All rights reserved.</p>
      </footer>
    </>
  );
}
