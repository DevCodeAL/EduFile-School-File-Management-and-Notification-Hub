import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaHome, FaNewspaper, FaBullhorn, FaPhone, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

export default function IndexHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["Event 1", "Event 2", "Event 3", "Event 4"];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-blue-500 text-white py-4 px-6 fixed w-full z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Guimba East EduLink</h1>
          <ul className="flex space-x-6">
            <li><a href="#events" className="flex items-center space-x-2 hover:underline"><FaCalendarAlt /> <span>Events</span></a></li>
            <li><a href="#news" className="flex items-center space-x-2 hover:underline"><FaNewspaper /> <span>News</span></a></li>
            <li><a href="#announcements" className="flex items-center space-x-2 hover:underline"><FaBullhorn /> <span>Announcements</span></a></li>
            <li><a href="#contact" className="flex items-center space-x-2 hover:underline"><FaPhone /> <span>Contact</span></a></li>
          </ul>
          <button onClick={()=> navigate('/login')} className="bg-white text-blue-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 shadow-md">Login</button>
        </div>
      </nav>
      
      {/* Video Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/video/EduPortal.mp4" 
          autoPlay 
          muted 
          loop
        ></video>
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-60 p-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">Welcome to Guimba East EduLink</h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl">
            Unified Learning Resource and Data Management System! Join our growing community dedicated to seamless learning and efficient data management.
          </p>
        </div> */}
      </section>

      {/* Interactive Carousel Section */}
      <section id="events" className="py-16 text-center bg-blue-100">
        <h2 className="text-4xl font-bold mb-6 text-blue-700 flex justify-center items-center space-x-2"><FaCalendarAlt /> <span>Upcoming Events</span></h2>
        <div className="relative container mx-auto flex items-center justify-center w-2/3">
          <button onClick={prevSlide} className="absolute left-0 p-2 bg-blue-500 text-white rounded-full shadow-md">
            <FaChevronLeft />
          </button>
          <div className="w-full h-56 bg-white shadow-lg p-6 rounded-md flex items-center justify-center text-lg font-semibold text-blue-700">
            {slides[currentSlide]}
          </div>
          <button onClick={nextSlide} className="absolute right-0 p-2 bg-blue-500 text-white rounded-full shadow-md">
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 text-center bg-gray-50">
        <h2 className="text-4xl font-bold text-blue-700 flex justify-center items-center space-x-2"><FaNewspaper /> <span>Latest News</span></h2>
        <div className="container mx-auto mt-6 grid md:grid-cols-3 gap-6">
          {Array(4).fill("News Item").map((news, index) => (
            <div key={index} className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold">{news} {index + 1}</h3>
              <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements Section */}
      <section id="announcements" className="py-16 text-center bg-white">
        <h2 className="text-4xl font-bold text-blue-700 flex justify-center items-center space-x-2"><FaBullhorn /> <span>Announcements</span></h2>
        <div className="container mx-auto mt-6 grid md:grid-cols-3 gap-6">
          {Array(4).fill("Announcement").map((announcement, index) => (
            <div key={index} className="bg-gray-100 p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold">{announcement} {index + 1}</h3>
              <p className="text-gray-600 mt-2">Important updates and notices for the school community.</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Read More</button>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer id="contact" className="bg-blue-500 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} Guimba East EduLink. All rights reserved.</p>
      </footer>
    </>
  );
}
