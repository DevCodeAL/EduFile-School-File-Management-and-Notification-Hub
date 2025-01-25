import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="fixed bg-blue-600 text-white w-64 h-screen shadow-lg">
      <div className="flex items-center justify-center py-6 border-b border-white/20">
        <h1 className="text-2xl font-bold">EduPortal Admin</h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-4 px-4">
          <li>
            <Link to="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <span className="text-white text-sm font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/user-management" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <span className="text-white text-sm font-medium">User Management</span>
            </Link>
          </li>
          <li>
            <Link to="/file-management" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <span className="text-white text-sm font-medium">File Management</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <span className="text-white text-sm font-medium">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
