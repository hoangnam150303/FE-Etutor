import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomeHeader = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);
  const userRole = useSelector((state) => state.user.role);
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <div className="">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-1">
          <div className="text-red-500 text-3xl font-bold">e</div>
          <div className="text-blue-800 text-xl font-bold">tutor</div>
        </a>

        {/* Navigation */}
        <nav className="flex space-x-6 text-lg font-medium text-blue-800">
          <a href="/" className="hover:text-red-500">
            Home
          </a>
          {/* <div className="relative group">
            <a href="/dich-vu" className="hover:text-red-500 flex items-center">
              DỊCH VỤ
              <span className="ml-1">▼</span>
            </a>
            
            <div className="absolute left-0 top-full hidden group-hover:block bg-white border mt-1 shadow-lg z-10">
              <a
                href="/dich-vu/1"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dịch Vụ 1
              </a>
              <a
                href="/dich-vu/2"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dịch Vụ 2
              </a>
            </div>
          </div> */}
          <a href="/courses" className="hover:text-red-500">
            Courses
          </a>
          <a href="/tutors" className="hover:text-red-500">
            Tutors
          </a>
          <a href="/blogs" className="hover:text-red-500 relative">
            Blogs
            <span className="absolute -top-1 -right-6 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              HOT
            </span>
          </a>
        </nav>

        <div className="flex gap-4">
          {userId && userRole === "Admin" ? (
            <button
              className="bg-blue-500 text-white px-4 py-2"
              onClick={() => navigate("/admin")}
            >
              Admin
            </button>
          ) : userRole === "Tutor" ? (
            <button
              className="bg-blue-500 text-white px-4 py-2"
              onClick={() => navigate("/tutor")}
            >
              Tutor
            </button>
          ) : userRole === "Student" ? (
            <button
              className="bg-blue-500 text-white px-4 py-2"
              onClick={() => navigate("/user")}
            >
              Student
            </button>
          ) : null}

          {userId ? (
            <button
              className="bg-red-500 text-white px-4 py-2"
              onClick={handleLogOut}
            >
              Log out
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-4 py-2"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
