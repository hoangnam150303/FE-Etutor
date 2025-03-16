import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import BlogDetailOfHome from "../pages/BlogPage/BlogDetailOfHome";
import ListClassOfUser from "../pages/UsersPage/ListClass";
import InfoClassOfUser from "../pages/UsersPage/InfoOfClass";
import CourseDetailOfHome from "../pages/CoursePage/CourseDetailOfHome";

import ForgotPassword from "../pages/Login/ForgotPassword";
import ResetPassword from "../pages/Login/ResetPassword";
import TutorPage from "../pages/HomePage/TutorPage";
import ListTutor from "../pages/UsersPage/ListTutor";
import TutorBlog from "../pages/TutorPage/TutorBlog";
import TutorBlogDetail from "../pages/TutorPage/TutorBlogDetail";
import { useSelector } from "react-redux";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

function AppRoutes() {
  const userId = useSelector((state) => state.user.id);
  const userRole = useSelector((state) => state.user.role);
  useEffect(() => {
    console.log(userRole, userId);
  }, [userRole, userId]);
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="" element={<HomePage />} />
        <Route
          path="/courses"
          element={userId ? <CoursePage /> : <LoginPage />}
        />
        <Route
          path="/course/:id"
          element={userId ? <CourseDetailOfHome /> : <LoginPage />}
        />
        <Route
          path="/tutors"
          element={userId ? <TutorPage /> : <LoginPage />}
        />
        <Route path="/blogs" element={userId ? <BlogPage /> : <LoginPage />} />
        <Route
          path="/blog/:id"
          element={userId ? <BlogDetailOfHome /> : <LoginPage />}
        />
        <Route path="/NotFound" element={<NotFoundPage />}></Route>
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/callPage" element={<CallPage />} />

      {userId ? (
        <>
          <Route
            path="admin"
            element={
              userId && userRole === "Admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/NotFound" replace />
              )
            }
          >
            <Route
              path="user"
              element={
                userId && userRole === "Admin" ? (
                  <UserPage />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="courses"
              element={
                userId && userRole === "Admin" ? (
                  <Courses />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="class-registration"
              element={
                userId && userRole === "Admin" ? (
                  <ClassRegis />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="chat"
              element={
                userId && userRole === "Admin" ? (
                  <Chat />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
          </Route>

          <Route
            path="user"
            element={
              userId && userRole === "Student" ? (
                <UserLayout />
              ) : (
                <Navigate to="/NotFound" replace />
              )
            }
          >
            <Route
              path="profile"
              element={
                userId && userRole === "Student" ? (
                  <UserProfile />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="chat"
              element={
                userId && userRole === "Student" ? (
                  <Chat />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="reset-password"
              element={
                userId && userRole === "Student" ? (
                  <ResetPassword />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="blog"
              element={
                userId && userRole === "Student" ? (
                  <UserBlog />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="blog/:id"
              element={
                userId && userRole === "Student" ? (
                  <BlogDetail />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="listClass"
              element={
                userId && userRole === "Student" ? (
                  <ListClassOfUser />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="detailClass/:id"
              element={
                userId && userRole === "Student" ? (
                  <InfoClassOfUser />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="list-tutors"
              element={
                userId && userRole === "Student" ? (
                  <ListTutor />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            ></Route>
          </Route>

          <Route
            path="tutor"
            element={
              userId && userRole === "Tutor" ? (
                <TutorLayout />
              ) : (
                <Navigate to="/NotFound" replace />
              )
            }
          >
            <Route
              path=""
              element={
                userId && userRole === "Tutor" ? (
                  <HomePageOfTutor />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="list-classes"
              element={
                userId && userRole === "Tutor" ? (
                  <ListClass />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="detailClass/:id"
              element={
                userId && userRole === "Tutor" ? (
                  <InfoOfClass />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="list-students"
              element={
                userId && userRole === "Tutor" ? (
                  <ListStudents />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="tutorChat"
              element={
                userId && userRole === "Tutor" ? (
                  <Chat />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="blog"
              element={
                userId && userRole === "Tutor" ? (
                  <TutorBlog />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
            <Route
              path="blog/:id"
              element={
                userId && userRole === "Tutor" ? (
                  <TutorBlogDetail />
                ) : (
                  <Navigate to="/NotFound" replace />
                )
              }
            />
          </Route>
        </>
      ) : null}
    </Routes>
  );
}

export default AppRoutes;
