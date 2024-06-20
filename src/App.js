// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentReport from "./pages/StudentReport";
import StudentCourse from "./pages/Course";
import StudentEvent from "./pages/Event";
import Ticket from "./pages/Ticket";
import Note from "./pages/Note";
import StudentAchievement from "./pages/Achievement";
import StudentCertificate from "./pages/Certificate";
import Header from "./components/layout/Header";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Difficulties from "./pages/Difficulties";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/report" element={<StudentReport />} />
        <Route path="/student/courses" element={<StudentCourse />} />
        <Route path="/student/events" element={<StudentEvent />} />
        <Route path="/student/tickets" element={<Ticket />} />
        <Route path="/notes" element={<Note />} />
        <Route path="/student/achievements" element={<StudentAchievement />} />
        <Route path="/student/certificates" element={<StudentCertificate />} />
        <Route path="/student/difficulties" element={<Difficulties />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
