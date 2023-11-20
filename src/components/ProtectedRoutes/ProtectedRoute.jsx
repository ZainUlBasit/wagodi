import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth.auth);
  if (!auth) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoute;
