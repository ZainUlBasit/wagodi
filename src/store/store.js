import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slices/AuthSlice";
import StationReducer from "./Slices/StationSlice";
import VendorReducer from "./Slices/VendorSlice";
import UserReducer from "./Slices/UserSlice";
import OrderReducer from "./Slices/OrderSlice";
import NotificationsReducer from "./Slices/NotificationSlice";
import SubscriptionSlice from "./Slices/SubscriptionSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    subscription: SubscriptionSlice,
    StationReducer,
    Vendor: VendorReducer,
    Users: UserReducer,
    Orders: OrderReducer,
    Notifications: NotificationsReducer,
  },
});
