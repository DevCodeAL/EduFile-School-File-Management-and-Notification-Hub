
export default function TeacherNavbar(){
    return(
        <>
            {/* Sidebar */}
       <aside className="fixed z-0 top-0 left-0 h-full w-64 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg flex flex-col">
        <div className="text-center py-6 border-b border-white/20">
          <h1 className="text-2xl font-bold">EduPortal</h1>
          <p className="text-sm text-white/80">Teacher Dashboard</p>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-4">
            <li>
              <a href="#dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
                <span className="text-white text-sm font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#library" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
                <span className="text-white text-sm font-medium">File Library</span>
              </a>
            </li>
            <li>
              <a href="#folder" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
                <span className="text-white text-sm font-medium">Folder</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="px-4 py-4 text-center text-sm text-white/70 border-t border-white/20">
          © 2025 EduPortal. All Rights Reserved.
        </div>
      </aside>
        </>
    )
}