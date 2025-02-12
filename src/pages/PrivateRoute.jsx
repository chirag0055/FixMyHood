import React from "react";
import { useAuth } from "../context/authProvider";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
}
