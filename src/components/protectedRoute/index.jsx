import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = useSelector((state) => state?.signup.states.accessToken);
  
  return token ? <Outlet /> : <Navigate to="/prototype/signup" exact />;
};

export default ProtectedRoute;
