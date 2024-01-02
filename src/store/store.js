import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slices/AuthSlice";
import StationReducer from "./Slices/StationSlice";
import VendorReducer from "./Slices/VendorSlice";
import UserReducer from "./Slices/UserSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    StationReducer,
    Vendor: VendorReducer,
    Users: UserReducer,
  },
});
