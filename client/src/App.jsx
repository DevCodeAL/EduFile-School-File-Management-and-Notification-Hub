import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./components/Login";
import PrincipalDashboard from "./pages/Principal Dashbord/PrincipalHome";
import TeacherDashboard from "./pages/Teacher Dashbord/TeacherHome";
import UploadeFiles from "./pages/Principal Dashbord/Pages/UploadFiles";
import PendingUsers from "./pages/Principal Dashbord/Pages/PendingUsers";
import RegistrationForm from "./components/RegistrationForm";
import NavBar from "./pages/Principal Dashbord/Pages/NavBar";
import TeacherNavbar from "./pages/Teacher Dashbord/TeacherNavBar";

function App() {

  return (
    <>
      <Router>
        <NavBar/>
        <TeacherNavbar/>
        <Routes>
              <Route path={'/'} index element={<Login />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/principal_dashboard" element={<PrincipalDashboard />} />
              <Route path="/uploaded-files" element={<UploadeFiles />} />
              <Route path="/teachers" element={<PendingUsers />} />
              <Route path="/teachers_dashboard" element={<TeacherDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
