import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginProtectedRoute from "../ProtectedRoutes/LoginProtectedRoute";
import Splash from "../../pages/Splash/splash";
import Onbaording from "../Onboading/Onbaording";
import Auth from "../../pages/Auth/Auth";
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import OTP from "../../pages/Auth/OTP";
import SetNewPassword from "../../pages/Auth/SetNewPassword";

const LoginRoutes = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <LoginProtectedRoute>
            <Splash />
          </LoginProtectedRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <LoginProtectedRoute>
            <Onbaording />
          </LoginProtectedRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <LoginProtectedRoute>
            <Auth />
          </LoginProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <LoginProtectedRoute>
            <ForgotPassword />
          </LoginProtectedRoute>
        }
      />
      <Route
        path="/otp-verification"
        element={
          <LoginProtectedRoute>
            <OTP />
          </LoginProtectedRoute>
        }
      />
      <Route
        path="/set-new-password"
        element={
          <LoginProtectedRoute>
            <SetNewPassword />
          </LoginProtectedRoute>
        }
      />
    </Routes>
  );
};

export default LoginRoutes;
