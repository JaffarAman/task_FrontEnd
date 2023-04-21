import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default ProtectedRoute;
