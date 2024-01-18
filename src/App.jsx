import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
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
import ChangePassword from "./components/Setting/ChangePassword";
import CompanyDetails from "./components/Setting/CompanyDetails";
import MobNavbar from "./components/Navbar/MobNavbar";
import Subscription from "./components/Setting/Subscription";
import CompanySubscription from "./components/Setting/CompanySubscription";
import CompanyConfirmSubscription from "./components/Setting/CompanyConfirmSubscription";
import { useDispatch, useSelector } from "react-redux";
import { SetAuth, SetAuthNotFound } from "./store/Slices/AuthSlice";
import LoginProtectedRoute from "./components/ProtectedRoutes/LoginProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import LogoutComp from "./components/Logout/LogoutComp";
import OrderManagerNavbar from "./components/Navbar/OrderManagerNavbar";
import LoginRoutes from "./components/RoleRouting/LoginRoutes";
import RoleRouting from "./components/RoleRouting/RoleRouting";
import NavSelection from "./components/NavSelection/NavSelection";

const App = () => {
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const CheckLocalStorage = () => {
    const isLoggedIn = localStorage.getItem("logged-in");

    if (isLoggedIn) {
      const user_data = JSON.parse(localStorage.getItem("user-data"));
      const userToken = localStorage.getItem("userToken");

      if (userToken && userToken !== "undefined") {
        const userObj = { ...user_data, userToken };
        dispatch(SetAuth(userObj));
      } else {
        dispatch(SetAuthNotFound([]));
        navigate("/auth");
      }
    } else {
      dispatch(SetAuthNotFound([]));
      navigate("/auth");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    CheckLocalStorage();
  }, []);

  return Loading ? (
    <div className="flex h-screen w-full items-center justify-center">
      <PageLoader />
    </div>
  ) : (
    <>
      <NavSelection />
      {auth.data.length === 0 ? (
        <LoginRoutes />
      ) : (
        <RoleRouting role={auth.data.role} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
