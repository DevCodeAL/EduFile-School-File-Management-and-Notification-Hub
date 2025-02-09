import { Link, useLocation } from "react-router";

export default function NavBar() {
  const location = useLocation();

  // Function to determine the active link class
  const isActive = (path) => {
    return location.pathname === path
      ? 'text-white border-b-2 border-white px-3 py-2 transition-all duration-300 ease-in-out'
      : 'text-white hover:bg-blue-600 hover:bg-opacity-20 rounded-lg px-3 py-2';
  };

  return (
    <>
      <aside className="fixed z-10 top-0 left-0 h-full w-64 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg flex flex-col">
        {/* Logo Section */}
        <div className="text-center py-6 border-b border-white/20">
        <h1 className="text-xl font-bold">Guimba East EduLink</h1>
        <p className="text-sm opacity-80">Empowering Education</p>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 flex-1 px-4">
          <ul className="space-y-4">
            <li>
              <Link
                to={'/principals_dashboard'}
                className={isActive('/principals_dashboard')}
              >
                <span className="text-sm font-medium">
                📊 Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={'/uploaded-files'}
                className={isActive('/uploaded-files')}
              >
                <span className="text-sm font-medium">
                📁 Learning Materials</span>
              </Link>
            </li>
            <li>
              <Link
                to={'/teachers'}
                className={isActive('/teachers')}
              >
                <span className="text-sm font-medium">⏳ Pending Applications</span>
              </Link>
            </li>
              
           
           <li>
           <Link to={'/schedule-principal'}   className={isActive('/schedule-principal')}>
             <span  className="text-sm font-medium">
             📅 Schedule
             </span>
          </Link>
           </li>
        
          <li>
            <Link to={'/announcement-principal'} className={isActive('/announcement-principal')}>
            <span  className="text-sm font-medium">
                📢 Announcements
            </span>
            </Link>
          </li>

          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 text-center text-sm text-white/70 border-t border-white/20">
          © 2025 EduPortal. All Rights Reserved.
        </div>
      </aside>
    </>
  );
}
