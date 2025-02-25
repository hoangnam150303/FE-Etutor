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

import UserProfile from "../pages/UsersPage/UserProfile";
import TutorLayout from "../layouts/TutorLayout";
import ListClass from "../pages/TutorPage/ListClass";
import HomePageOfTutor from "../pages/TutorPage/HomePageOfTutor";
import InfoOfClass from "../pages/TutorPage/InfoOfClass";
import ListStudents from "../pages/TutorPage/ListStudents";
import UserBlog from "../pages/UsersPage/UserBlog";
import HomeLayout from "../layouts/HomeLayout";
import BlogDetail from "../pages/UsersPage/BlogDetail";
import CoursePage from "../pages/CoursePage/CoursePage";
import { CallPage } from "../pages/CallPage/CallPage";
import Chat from "../pages/ChatPage/Chat";
import HomePage from "../pages/HomePage/HomePage";
import BlogPage from "../pages/BlogPage/BlogPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} >
        <Route path='' element={<HomePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/callPage/:id" element={<CallPage />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route path="user" element={<UserPage />} />
        <Route path="courses" element={<Courses />} />
        <Route path="class-registration" element={<ClassRegis />} />
        <Route path="chat" element={<Chat />} />
      </Route>

      <Route path="user" element={<UserLayout />}>
        <Route path="profile" element={<UserProfile />} />
        <Route path="chat" element={<Chat />} />
        <Route path="blog" element={<UserBlog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
      </Route>

      <Route path="tutor" element={<TutorLayout />}>
        <Route path="" element={<HomePageOfTutor />} />
        <Route path="list-classes" element={<ListClass />} />
        <Route path="list-classes/:className" element={<InfoOfClass />} />
        <Route path="list-students" element={<ListStudents />} />
        <Route path="tutorChat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
