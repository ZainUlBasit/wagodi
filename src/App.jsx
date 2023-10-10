import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Splash from "./pages/Splash/splash";
import Onbaording from "./components/Onboading/Onbaording";
import Auth from "./pages/Auth/Auth";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import OTP from "./pages/Auth/OTP";
import SetNewPassword from "./pages/Auth/SetNewPassword";
import Home from "./pages/Home/Home";
import OngoingOrder from "./pages/OngoingOrder/OngoingOrder";
import OrderReports from "./pages/OrderReports/OrderReports";
import Notification from "./pages/Notification/Notification";
import Users from "./pages/Users/Users";
import Stations from "./pages/Station/Stations";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const navigate = useNavigate();
  const pathname = location.pathname;
  return (
    <>
      {pathname !== "/" &&
        pathname !== "/onboarding" &&
        pathname !== "/auth" &&
        pathname !== "/forgot-password" &&
        pathname !== "/otp-verification" &&
        pathname !== "/set-new-password" && <Navbar />}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onbaording />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OTP />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ongoing-orders" element={<OngoingOrder />} />
        <Route path="/orders-report" element={<OrderReports />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/users" element={<Users />} />
        <Route path="/stations" element={<Stations />} />
      </Routes>
    </>
  );
};

export default App;
