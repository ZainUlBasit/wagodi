import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import Home from "../../pages/Home/Home";
import OngoingOrder from "../../pages/OngoingOrder/OngoingOrder";
import OrderReports from "../../pages/OrderReports/OrderReports";
import Notification from "../../pages/Notification/Notification";
import Users from "../../pages/Users/Users";
import Stations from "../../pages/Station/Stations";
import Vendor from "../../pages/Vendor/Vendor";
import Statistics from "../../pages/Statistics/Statistics";
import Setting from "../../pages/Setting/Setting";
import ChangePassword from "../Setting/ChangePassword";
import CompanyDetails from "../Setting/CompanyDetails";
import Subscription from "../Setting/Subscription";
import CompanySubscription from "../Setting/CompanySubscription";
import AddReservation from "../../pages/AddReservation/AddReservation";
import OrderManagerOrderReports from "../../pages/OrderReports/OrderManagerOrderReports";
import OrderInfo from "../Cards/OrderInfo";

const RoleRouting = ({ role }) => {
  return role === 1 ? (
    <Routes>
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
  ) : role === 2 ? (
    <Routes>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
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
    </Routes>
  ) : (
    ""
  );
};

export default RoleRouting;
