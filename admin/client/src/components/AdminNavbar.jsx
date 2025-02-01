import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

// Function to determine the active link class
const isActive = (path) => {
  return location.pathname === path
    ? 'text-white border-b-2 border-white px-3 py-2 transition-all duration-300 ease-in-out'
    : 'text-white hover:bg-blue-600 hover:bg-opacity-20 rounded-lg px-3 py-2';
};

  return (
    <aside className="fixed bg-blue-600 text-white w-64 h-screen shadow-lg">
      <div className="flex items-center justify-center py-6 border-b border-white/20">
        <h1 className="text-2xl font-bold">EduPortal Admin</h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-4 px-4">
          <li>
            <Link to="/dashboard" className={isActive('/dashboard')}>
              <span className="text-white text-sm font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/user-management" className={isActive('/user-management')}>
              <span className="text-white text-sm font-medium">User Management</span>
            </Link>
          </li>
          <li>
            <Link to="/file-management" className={isActive('/file-management')}>
              <span className="text-white text-sm font-medium">File Management</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className={'/settings'}>
              <span className="text-white text-sm font-medium">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
