// src/routes/RequireAuth.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const userId = useSelector((state) => state.user.id);
  return userId ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
