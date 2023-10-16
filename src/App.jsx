import React, { useEffect, useState } from "react";
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
import PageLoader from "./components/Loaders/PageLoader";
import Vendor from "./pages/Vendor/Vendor";
import Statistics from "./pages/Statistics/Statistics";
import Setting from "./pages/Setting/Setting";
import AddReservation from "./pages/AddReservation/AddReservation";
import OrderManagerOrderReports from "./pages/OrderReports/OrderManagerOrderReports";
import OrderInfo from "./components/Cards/OrderInfo";

const App = () => {
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const pathname = location.pathname;
  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return Loading ? (
    <div className="flex h-screen w-full items-center justify-center">
      <PageLoader />
    </div>
  ) : (
    <>
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
        <Route path="/order-manager-orders-report" element={<OrderManagerOrderReports />} />
        <Route path="/orders-report-info" element={<OrderInfo />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/users" element={<Users />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/add-reservation" element={<AddReservation />} />
      </Routes>
    </>
  );
};

export default App;
