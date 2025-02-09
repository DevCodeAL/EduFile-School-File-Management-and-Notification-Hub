import { Link, useLocation } from "react-router";

export default function TeacherNavbar() {
  const location = useLocation();

  // Function to determine the active link class
  const isActive = (path) => {
    return location.pathname === path
      ? 'text-white border-b-2 border-white px-3 py-2 transition-all duration-300 ease-in-out'
      : 'text-white hover:bg-blue-600 hover:bg-opacity-20 rounded-lg px-3 py-2';
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="fixed z-0 top-0 left-0 h-full w-64 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg flex flex-col">
        {/* Logo & Header */}
        <div className="text-center py-6 border-b border-white/20">
          <h1 className="text-xl font-bold">Guimba East EduLink</h1>
          <p className="text-sm opacity-80">Empowering Education</p>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4 mt-6">
          <ul className="space-y-4">
            <li>
              <Link to={'/teacher_dashboard'} className={isActive('/teacher_dashboard')}>
                <span className="text-white text-sm font-medium">
                📊 Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={'/file-library'} className={isActive('/file-library')}>
                <span className="text-white text-sm font-medium">
                📁 Learning Materials</span>
              </Link>
            </li>
             
           <li>
           <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">
            📅 Schedule
          </a>
           </li>
        
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">
              📢 Announcements
            </a>
          </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto px-4 py-4 text-center text-sm text-white/70 border-t border-white/20">
          © 2025 EduPortal. All Rights Reserved.
        </div>
      </aside>
    </>
  );
}
