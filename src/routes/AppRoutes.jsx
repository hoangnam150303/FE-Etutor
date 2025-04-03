import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserRequest } from "../reducers/user";

// Layouts
import HomeLayout from "../layouts/HomeLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import TutorLayout from "../layouts/TutorLayout";

// Pages
import LoginPage from "../pages/Login/LoginPage";
import ForgotPassword from "../pages/Login/ForgotPassword";
import ResetPassword from "../pages/Login/ResetPassword";
import OTPPage from "../pages/Register/OTPPage";
import RegisterPage from "../pages/Register/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

import HomePage from "../pages/HomePage/HomePage";
import TutorPage from "../pages/HomePage/TutorPage";

import BlogPage from "../pages/BlogPage/BlogPage";
import BlogDetailOfHome from "../pages/BlogPage/BlogDetailOfHome";

import CoursePage from "../pages/CoursePage/CoursePage";
import CourseDetailOfHome from "../pages/CoursePage/CourseDetailOfHome";

import CallPage from "../pages/CallPage/CallPage";
import Chat from "../pages/ChatPage/Chat";

// Admin Pages
import UserPage from "../pages/AdminPage/UserPage";
import Courses from "../pages/AdminPage/Courses";
import ClassRegis from "../pages/AdminPage/ClassRegis";

// Student Pages
import UserProfile from "../pages/UsersPage/UserProfile";
import UserBlog from "../pages/UsersPage/UserBlog";
import BlogDetail from "../pages/UsersPage/BlogDetail";
import ListClassOfUser from "../pages/UsersPage/ListClass";
import InfoClassOfUser from "../pages/UsersPage/InfoOfClass";
import ListTutor from "../pages/UsersPage/ListTutor";

// Tutor Pages
import ListClass from "../pages/TutorPage/ListClass";
import HomePageOfTutor from "../pages/TutorPage/HomePageOfTutor";
import InfoOfClass from "../pages/TutorPage/InfoOfClass";
import ListStudents from "../pages/TutorPage/ListStudents";
import TutorBlog from "../pages/TutorPage/TutorBlog";
import TutorBlogDetail from "../pages/TutorPage/TutorBlogDetail";

// Auth utils
import  RequireAuth  from "../utils/RequireAuth";
import RequireRole from "../utils/RequireRole";
function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public layout + home routes */}
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tutors" element={<TutorPage />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="courses" element={<CoursePage />} />
        <Route
          path="course/:id"
          element={
            <RequireAuth>
              <CourseDetailOfHome />
            </RequireAuth>
          }
        />
        <Route
          path="blog/:id"
          element={
            <RequireAuth>
              <BlogDetailOfHome />
            </RequireAuth>
          }
        />
        <Route
          path="callPage"
          element={
            <RequireAuth>
              <CallPage />
            </RequireAuth>
          }
        />
      </Route>

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin routes */}
      <Route
        path="admin"
        element={
          <RequireRole role="Admin">
            <AdminLayout />
          </RequireRole>
        }
      >
        <Route path="user" element={<UserPage />} />
        <Route path="courses" element={<Courses />} />
        <Route path="class-registration" element={<ClassRegis />} />
        <Route path="chat" element={<Chat />} />
      </Route>

      {/* Student routes */}
      <Route
        path="user"
        element={
          <RequireRole role="Student">
            <UserLayout />
          </RequireRole>
        }
      >
        <Route path="profile" element={<UserProfile />} />
        <Route path="chat" element={<Chat />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="blog" element={<UserBlog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="listClass" element={<ListClassOfUser />} />
        <Route path="detailClass/:id" element={<InfoClassOfUser />} />
        <Route path="list-tutors" element={<ListTutor />} />
      </Route>

      {/* Tutor routes */}
      <Route
        path="tutor"
        element={
          <RequireRole role="Tutor">
            <TutorLayout />
          </RequireRole>
        }
      >
        <Route index element={<HomePageOfTutor />} />
        <Route path="list-classes" element={<ListClass />} />
        <Route path="detailClass/:id" element={<InfoOfClass />} />
        <Route path="list-students" element={<ListStudents />} />
        <Route path="tutorChat" element={<Chat />} />
        <Route path="blog" element={<TutorBlog />} />
        <Route path="blog/:id" element={<TutorBlogDetail />} />
      </Route>

      {/* 404 fallback */}
      <Route path="/NotFound" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/NotFound" replace />} />
    </Routes>
  );
}

export default AppRoutes;
