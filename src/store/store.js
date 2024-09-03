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
import CompanyStatsSlice from "./Slices/CompanyStatsSlice";
import EmployeeSlice from "./Slices/EmployeeSlice";
import WasteSlice from "./Slices/WasteSlice";
import NotifySlice from "./Slices/NotifySlice";
import DriverSlice from "./Slices/DriverSlice";
import AllCompanySlice from "./Slices/AllCompanySlice";
import StationStatsSlice from "./Slices/StationStatsSlice";
import DriverStatsSlice from "./Slices/DriverStatsSlice";
import TopTenStatsSlice from "./Slices/TopTenStatsSlice";
import OrderReportSlice from "./Slices/OrderReportSlice";
import StationSaleStatsSlice from "./Slices/StationSaleStatsSlice";
import ErrorMessageSlice from "./Slices/ErrorMessageSlice";
import ControlSubscribersSlice from "./Slices/ControlSubscribersSlice";

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
    CompanyStats: CompanyStatsSlice,
    EmployeeData: EmployeeSlice,
    WasteState: WasteSlice,
    Notify: NotifySlice,
    Drivers: DriverSlice,
    AllCompany: AllCompanySlice,
    StationStats: StationStatsSlice,
    DriverStatsState: DriverStatsSlice,
    TopTenStations: TopTenStatsSlice,
    OrderReportState: OrderReportSlice,
    StationSaleStatsState: StationSaleStatsSlice,
    ErrorMessageState: ErrorMessageSlice,
    ControlSubscribersState: ControlSubscribersSlice,
  },
});
