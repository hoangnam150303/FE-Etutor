import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";
const RequireRole = ({ role, children }) => {
  const userId = useSelector((state) => state.user.id);
  const userRole = useSelector((state) => state.user.role);

  if (!userId) return <Navigate to="/login" replace />;
  if (userRole !== role) return <Navigate to="/NotFound" replace />;

  return children;
};
export default RequireRole;
