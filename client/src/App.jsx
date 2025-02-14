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
import FileLibrary from "./pages/Teacher Dashbord/FileLibrary";
import Schedule from "./pages/Principal Dashbord/Pages/SchedulePage";
import Announcements from "./pages/Principal Dashbord/Pages/Announcement";
import TeacherSchedule from "./pages/Teacher Dashbord/Modal/TeacherSchedule";
import TeachersAnnouncement from "./pages/Teacher Dashbord/TeacherAnnouncement";
import IndexHome from ".";
import ForgotPassword from "./ResetPassword/ForgotPassword";
import ResetPassword from "./ResetPassword/ResetPassword";

function App() {
  const { user } = useAuth();
  
  return (
    <Router>
    {user?.data.role === 'principal' && <NavBar />}
    {user?.data.role === 'teacher' && <TeacherNavbar />}
    <Routes>
    {/* Default Routes */}
    <Route path="/" index element={<IndexHome/>}/>

      {/* Public Routes */}
      <Route path="/login" index element={<Login />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/forgot-pass" element={<ForgotPassword/>} />
      <Route path="/reset-password/:token" element={<ResetPassword/>}/>
  
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
        }/>

    <Route path="/schedule-principal" element={
          <ProtectedRoute role="principal">
              <Schedule/>
          </ProtectedRoute>
        }/>


    <Route path="/announcement-principal" element={
          <ProtectedRoute role="principal">
              <Announcements/>
          </ProtectedRoute>
        }/>

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
      
    <Route path="/file-library"
          element={
            <ProtectedRoute role="teacher">
                <FileLibrary/>
            </ProtectedRoute>
          } />

          <Route path="/teacher-schedule" element={
            <ProtectedRoute role="teacher">
              <TeacherSchedule/>
            </ProtectedRoute>
          }/>

          <Route path="/techers-announcement" element={
            <ProtectedRoute role="teacher">
                <TeachersAnnouncement/>
            </ProtectedRoute>
          }
          />
    </Routes>
   </Router>  
  );
}

export default App;
