import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const ProtectedRoute = ({ children }) => {
  const tkn = localStorage.getItem("token");

  if (!tkn) {
    return <Navigate to="/" replace />;
  }
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
