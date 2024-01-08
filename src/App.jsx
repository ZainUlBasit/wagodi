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
import ChangePassword from "./components/Setting/ChangePassword";
import CompanyDetails from "./components/Setting/CompanyDetails";
import MobNavbar from "./components/Navbar/MobNavbar";
import Subscription from "./components/Setting/Subscription";
import CompanySubscription from "./components/Setting/CompanySubscription";
import { useDispatch, useSelector } from "react-redux";
import { SetAuth, SetAuthNotFound } from "./store/Slices/AuthSlice";
import LoginProtectedRoute from "./components/ProtectedRoutes/LoginProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import LogoutComp from "./components/Logout/LogoutComp";
import OrderManagerNavbar from "./components/Navbar/OrderManagerNavbar";


// paypal front end component START ...
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
//     const CLIENT_ID = "AT_A12njaX8zunxdhVUtQyeikVjIYeoF1HrU27quJDkgMsyHXiUMkoDDvOeB8596_ahSHeoGt1X8csS6"
// const PaypalButton = () => {
//   const paypalOptions = {
//     "client-id": "AT_A12njaX8zunxdhVUtQyeikVjIYeoF1HrU27quJDkgMsyHXiUMkoDDvOeB8596_ahSHeoGt1X8csS6",
//   };

//   const handlePaymentSuccess = (details, data) => {
//     console.log("Payment was successful");
//     console.log("Payment details:", details);
//     console.log("Payment data:", data);
//     // Extract the payment method ID from the details or data object.
//     const paymentMethodID = details.purchase_units[0].payments.captures[0].id;
//     console.log("Payment Method ID:", paymentMethodID);
//   };

//   return (
//     <PayPalScriptProvider options={paypalOptions}>
//       <PayPalButtons
//         style={{ layout: "horizontal" }}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   value: "10.00",
//                 },
//               },
//             ],
//           });
//         }}
//         onApprove={(data, actions) => {
//           return actions.order.capture().then((details) => {
//             handlePaymentSuccess(details, data);
//           });
//         }}
//       />
//     </PayPalScriptProvider>
//   );
// };

// const SubscriptionPaypal = () => {
//   const paypalOptions = {
//     "client-id": CLIENT_ID,
//   };

//   const planId = "YOUR_PLAN_ID";

//   const handleSubscription = (data, actions) => {
//     return actions.subscription.create({
//       plan_id: planId,
//     });
//   };

//   const handleApprove = (data, actions) => {
//     // Handle a successful subscription here
//     console.log("Subscription was successful", data);
//   };

//   return (
//     <PayPalScriptProvider options={paypalOptions}>
//       <PayPalButtons
//         style={{ layout: "horizontal" }}
//         createSubscription={handleSubscription}
//         onApprove={handleApprove}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default function App() {
//     return (
//       <div className="App">
//         <h1>PayPal Payment Method ID Example</h1>
//         <SubscriptionPaypal />
//       </div>
//     );
// }
// paypal component ends

const App = () => {
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const CheckLocalStorage = () => {
    const isLoggedIn = localStorage.getItem("logged-in");
    if (isLoggedIn) {
      const user_data = localStorage.getItem("user-data");
      dispatch(SetAuth(JSON.parse(user_data)));
    } else {
      dispatch(SetAuthNotFound([]));
    }
  };
  useEffect(() => {
    CheckLocalStorage();
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
      {pathname !== "/" &&
        pathname !== "/onboarding" &&
        pathname !== "/auth" &&
        pathname !== "/forgot-password" &&
        pathname !== "/otp-verification" &&
        pathname !== "/logout" &&
        pathname !== "/set-new-password" &&
        auth.data.role === 1 && <Navbar />}
      {pathname !== "/" &&
        pathname !== "/onboarding" &&
        pathname !== "/auth" &&
        pathname !== "/forgot-password" &&
        pathname !== "/logout" &&
        pathname !== "/otp-verification" &&
        pathname !== "/set-new-password" &&
        auth.data.role === 1 && <MobNavbar />}
      {pathname !== "/" &&
        pathname !== "/onboarding" &&
        pathname !== "/auth" &&
        pathname !== "/forgot-password" &&
        pathname !== "/otp-verification" &&
        pathname !== "/logout" &&
        pathname !== "/set-new-password" &&
        auth.data.role === 2 && <OrderManagerNavbar />}

      <Routes>
        <Route
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
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ongoing-orders"
          element={
            <ProtectedRoute>
              <OngoingOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders-report"
          element={
            <ProtectedRoute>
              <OrderReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-manager-orders-report"
          element={
            <ProtectedRoute>
              <OrderManagerOrderReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders-report-info"
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stations"
          element={
            <ProtectedRoute>
              <Stations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor"
          element={
            <ProtectedRoute>
              <Vendor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-reservation"
          element={
            <ProtectedRoute>
              <AddReservation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-details"
          element={
            <ProtectedRoute>
              <CompanyDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/company-sub"
          element={
            <ProtectedRoute>
              <CompanySubscription />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
