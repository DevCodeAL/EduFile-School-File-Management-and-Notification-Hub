import { useAuth } from "../context/AuthContext";


export default function Header({setOpen}){
    const { logout } = useAuth();
    
        return(
            <>
           {/* Header */}
            <header>
            {/* Profile Toolkit */}
            <div className="  relative left-full -ms-8 group">
              {/* Profile Picture */}
              <div className="w-12 h-12 border-2 border-indigo-600 rounded-full overflow-hidden cursor-pointer">
                <img
                  className="w-full h-full object-cover"
                  src="/image/Leomar .jpg"
                  alt="User Profile"
                />
                <div className="absolute right-0 text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
              </div>
    
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                <ul className="text-gray-700 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <button onClick={setOpen}>Profile</button>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </header>
    
            </>
        )
    }