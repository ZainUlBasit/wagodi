import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth.auth);
  if (!auth) {
<<<<<<< Updated upstream
    return <Navigate to="/auth" replace />;
=======
    
    return <Navigate to="/" replace />;
>>>>>>> Stashed changes
  }
  return children;
}
export default ProtectedRoute;
