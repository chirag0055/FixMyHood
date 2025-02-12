import React from "react";
import { useAuth } from "../context/authProvider";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // Get the authenticated user from context
  const { user } = useAuth();

  // If user is authenticated, render the children components
  // Otherwise, redirect to the login page
  return user ? children : <Navigate to="/login" replace />;
}
