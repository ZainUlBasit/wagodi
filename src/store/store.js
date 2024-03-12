import OrderReducer from "./Slices/OrderSlice";
import NotificationsReducer from "./Slices/NotificationSlice";
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slices/AuthSlice";
import StationReducer from "./Slices/StationSlice";
import VendorReducer from "./Slices/VendorSlice";
import UserReducer from "./Slices/UserSlice";
import SubscriptionSlice from "./Slices/SubscriptionSlice";
import SelectedOrder from "./Slices/SelectedOrder";
import CompanyReducer from "./Slices/CompanySlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    subscription: SubscriptionSlice,
    StationReducer,
    Vendor: VendorReducer,
    Users: UserReducer,
    selectedOrder: SelectedOrder,
    Orders: OrderReducer,
    Notifications: NotificationsReducer,
    Company: CompanyReducer,
  },
});
