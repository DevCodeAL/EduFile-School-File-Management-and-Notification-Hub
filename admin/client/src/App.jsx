import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import FileManagement from "./pages/FileManagement";
import Settings from "./pages/Settings";
import AdminNavbar from "./components/AdminNavbar";
import Login from "./components/Login";
import { useAuth } from "./AuthContext/AuthContext";


function App() {
  const { user, loading } = useAuth();
  const ProtectedRoute = ({children})=>{  
      if(!user){
        return <Navigate to="/"/>;
      }

      return children;
  }

  if (loading) {
    // Render a loading screen while checking authentication
    return (<span>{''}</span>);
  }

  return (
    <Router>
      {user && <AdminNavbar />}
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Routes>
            <Route path="/" element={user ? <Navigate to={ '/dashboard'}/> : <Login/>}/>

          <Route path="/dashboard"  element={
            <ProtectedRoute>
               <AdminDashboard/>
            </ProtectedRoute>
            } />
          <Route path="user-management" element={
           <ProtectedRoute>
               <UserManagement/>
           </ProtectedRoute>
            } />
          <Route path="file-management" element={
            <ProtectedRoute>
              <FileManagement/>
            </ProtectedRoute>
          } />
          <Route path="settings" element={
            <ProtectedRoute>
              <Settings/>
            </ProtectedRoute>
          } />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
