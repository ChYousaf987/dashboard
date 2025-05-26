import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("ProtectedRoute: user state:", user);
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
