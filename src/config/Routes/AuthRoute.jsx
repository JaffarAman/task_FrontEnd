import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  return isAuth ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet to="/" replace={true} />
  );
};

export default AuthRoute;
