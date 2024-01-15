import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slices/AuthSlice";
import StationReducer from "./Slices/StationSlice";
import VendorReducer from "./Slices/VendorSlice";
import UserReducer from "./Slices/UserSlice";
import OrderReducer from "./Slices/OrderSlice";
import NotificationsReducer from "./Slices/NotificationSlice";
import SubscriptionSlice from "./Slices/SubscriptionSlice";
import SelectedOrder from "./Slices/SelectedOrder";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    subscription: SubscriptionSlice,
    StationReducer,
    Vendor: VendorReducer,
    Users: UserReducer,
<<<<<<< HEAD
    Orders: OrderReducer,
    Notifications: NotificationsReducer,
=======
    selectedOrder: SelectedOrder
>>>>>>> e1770ec (hobab revamping order pages role routing login system)
  },
});
