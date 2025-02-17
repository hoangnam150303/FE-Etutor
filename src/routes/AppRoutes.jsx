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
import UserChat from "../pages/UsersPage/UserChat";
import TutorChat from "../pages/TutorPage/TutorChat";

import ProductsTutor from "../pages/TutorPage/ProductsTutor";
import DetailsPage from "../pages/TutorPage/DetailTutor";

import UserBlog from "../pages/UsersPage/UserBlog";
import HomeLayout from "../layouts/HomeLayout";
import BlogDetail from "../pages/UsersPage/BlogDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="test" element={<AdminLayout />}>
        <Route path="user" element={<UserPage />} />
        <Route path="courses" element={<Courses />} />
        <Route path="class-registration" element={<ClassRegis />} />
        <Route path="chat" element={<Chat />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route path="user" element={<UserPage />} />
        <Route path="courses" element={<Courses />} />
        <Route path="class-registration" element={<ClassRegis />} />
        <Route path="chat" element={<Chat />} />
      </Route>

      <Route path="tutor" element={<TutorLayout />}>
        <Route path="" element={<HomePageOfTutor />} />
        <Route path="list-classes" element={<ListClass />} />
        <Route path="list-classes/:className" element={<InfoOfClass />} />
        <Route path="list-students" element={<ListStudents />} />
        <Route path="tutorChat" element={<TutorChat />} />
        <Route path="products" element={<ProductsTutor />} />
      </Route>

      <Route path="/details/:id" element={<DetailsPage />} />
    </Routes>
  );
}

export default AppRoutes;
