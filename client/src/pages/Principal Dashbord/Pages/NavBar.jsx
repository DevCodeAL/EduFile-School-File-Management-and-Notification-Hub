import { Link } from "react-router"
export default function NavBar(){
    return(
        <>
            <aside className="fixed z-10 top-0 left-0 h-full w-64 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg flex flex-col">
            {/* Logo Section */}
            <div className="text-center py-6 border-b border-white/20">
                <h1 className="text-2xl font-bold">EduPortal</h1>
                <p className="text-sm text-white/80">Principal Dashboard</p>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6 flex-1 px-4">
                <ul className="space-y-4">
                <li>
                    <Link
                    to={'/principal_dashboard'} 
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                    <span className="text-white text-sm font-medium">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link
                     to={'/uploaded-files'}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                    <span className="text-white text-sm font-medium">Upload Files</span>
                    </Link>
                </li>
                <li>
                    <Link
                     to={'/teachers'}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                    <span className="text-white text-sm font-medium">Pending Applications</span>
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
    )
}