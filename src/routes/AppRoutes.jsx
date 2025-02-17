import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import LoginPage from "../pages/Login/LoginPage";
import OTPPage from "../pages/Register/OTPPage";
import RegisterPage from "../pages/Register/RegisterPage";
import AdminLayout from "../layouts/AdminLayout";
import UserPage from "../pages/AdminPage/UserPage";
import Courses from "../pages/AdminPage/Courses";
import ClassRegis from "../pages/AdminPage/ClassRegis";
import Chat from "../pages/AdminPage/Chat";
import UserProfile from "../pages/UsersPage/UserProfile";
import TutorLayout from "../layouts/TutorLayout";
import ListClass from "../pages/TutorPage/ListClass";
import HomePageOfTutor from "../pages/TutorPage/HomePageOfTutor";
import InfoOfClass from "../pages/TutorPage/InfoOfClass";
import ListStudents from "../pages/TutorPage/ListStudents";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route path="user" element={<UserPage />} />
        <Route path="courses" element={<Courses />} />
        <Route path="class-registration" element={<ClassRegis />} />
        <Route path="chat" element={<Chat />} />
      </Route>

      <Route path="/userProfile" element={<UserProfile />} />

      <Route path="tutor" element={<TutorLayout />}>
        <Route path="" element={<HomePageOfTutor />} />
        <Route path="list-classes" element={<ListClass />} />
        <Route path="list-classes/:className" element={<InfoOfClass />} />
        <Route path="list-students" element={<ListStudents />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
