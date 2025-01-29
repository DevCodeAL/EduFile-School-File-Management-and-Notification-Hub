import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router";
import Login from "./components/Login";
import PrincipalDashboard from "./pages/Principal Dashbord/PrincipalHome";
import TeacherDashboard from "./pages/Teacher Dashbord/TeacherHome";
import PendingUsers from "./pages/Principal Dashbord/Pages/PendingUsers";
import RegistrationForm from "./components/RegistrationForm";
import NavBar from "./pages/Principal Dashbord/Pages/NavBar";
import TeacherNavbar from "./pages/Teacher Dashbord/TeacherNavBar";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoutes";
import Files from "./pages/Principal Dashbord/Pages/Files";

function App() {
  const { user } = useAuth();

  
  return (
    <Router>
    {user?.data.role === 'principal' && <NavBar />}
    {user?.data.role === 'teacher' && <TeacherNavbar />}
    <Routes>
    {/* Default Routes */}
    <Route path="/" index element={<Login/>}/>

      {/* Public Routes */}
      <Route path="/login" index element={<Login />} />
      <Route path="/register" element={<RegistrationForm />} />
  
      {/* Principal Routes */}
      <Route
        path="/principals_dashboard"
        element={
          <ProtectedRoute role="principal">
            <PrincipalDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/uploaded-files"
        element={
          <ProtectedRoute role="principal">
          <Files/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachers"
        element={
          <ProtectedRoute role="principal">
            <PendingUsers />
          </ProtectedRoute>
        }
      />
  
      {/* Teacher Routes */}
      <Route
        path="/teacher_dashboard"
        element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>  
  );
}

export default App;
