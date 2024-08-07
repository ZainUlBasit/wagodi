import axios from "axios";
import { BASE_URL } from "../assets/config";

export const userToken = localStorage.getItem("userToken");
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    app_secret:
      "10ef42363582fd212242bf8da6598e6d15111a9a509c36242411d444e8c03728",
    usertoken: userToken,
  },
});

export const apiForImage = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    app_secret:
      "10ef42363582fd212242bf8da6598e6d15111a9a509c36242411d444e8c03728",
    userToken,
  },
});

// ================================================
// SUPER ADMIN
// ================================================
export const GetAllCompany = (data) => api.post("/company/all", data);

// *********************************************
// Auth Request
// *********************************************
export const SignInApi = (data) => api.post("/auth/sign-in", data);
export const SignUpApi = (data) => api.post("/auth/company/sign-up", data);
export const ForgetPasswordApi = (data) =>
  api.post("/auth/forget-password", data);
export const VerifyOtpApi = (data) => api.post("/auth/verify-forget-otp", data);
export const VerifySinginOtpApi = (data) =>
  api.post("/auth/verify-signin-otp", data);
export const UpdatePasswordApi = (data) =>
  api.patch("/auth/update-password", data);

export const GetComapanyDetails = (companyId) =>
  api.get("/company/" + companyId);
export const GetAllDrivers = (data) => api.post("/auth/getAllDrivers", data);

export const UpdateCompanyDuration = (payload) =>
  api.post("/company/duration/update", payload);
export const UpdateCompanyNoOfStationsAPI = (payload) =>
  api.post("/company/no_station/update", payload);
export const GetCompanyInfoAPI = (payload) =>
  api.get("/company/getinfo/" + payload);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Auth Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// *********************************************
// Station Request
// *********************************************
export const CreateStationApi = (data) => api.post("/station", data);
export const GetStationApi = (data) => api.post("/station/site/all", data);
export const GetCompanySubscription = (data) =>
  api.post("/subscription/company", data);
export const UpdateStationApi = (data) => api.patch("/station/update", data);
export const DeleteStationApi = (data) =>
  api.delete(
    `/station/?stationId=${data.stationId}&companyId=${data.companyId}`
  );

export const AddFuel = (data) => api.post("station/fuel/add", data);
export const UpdateFuel = (data) => api.patch("station/fuel/update", data);

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Station Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// *********************************************
// Vendor Request
// *********************************************
export const CreateVendorApi = (data) => api.post("/vendor/create", data);
export const GetVendorApi = (data) => api.post("/vendor/company", data);
export const UpdateVendorApi = (data) => api.patch("/vendor/update", data);
export const GetAllVendorApi = (data) => api.post("/vendor/all", data);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Vendor Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// *********************************************
// Create User Request
// *********************************************
export const CreateStationManagerApi = (data) =>
  api.post("/auth/sign-up", data);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Create User Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// *********************************************
// Users Request
// *********************************************
export const GetUserApi = (data) => api.post("/auth/list/", data);
export const UpdateUserApi = (data) => api.patch("/auth/update/", data);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Station Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// *********************************************
// Order Request
// *********************************************
export const GetAllOrderApi = (data) => api.post("/order/company", data);
export const GetOrderReports = (data) => api.post("/order/company", data);

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Order Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// *********************************************
// Notification Request
// *********************************************

export const GetCompanyNotificationApi = (data) =>
  api.post("/notification/company", data);
export const GetAdminNotificationApi = (data) =>
  api.post("/notification/admin", data);
export const GetOrderManagerNotificationApi = (data) =>
  api.post("/notification/order-manager", data);

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Notification Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// *********************************************
// Orders Request
// *********************************************
export const OrderCreateApi = (data) => apiForImage.post("/order/create", data);

// ------------------------------------------------- company
export const ApprovedCompany = (data) =>
  api.patch("/company/company-approved", data);
export const RejectCompany = (data) =>
  api.patch("/company/company-reject", data);
export const UpdateFuelCompany = (data) =>
  api.patch("/company/fuel/update", data);

export const ChangeCompanyStatusApi = (payload) =>
  api.patch("/company/change-status", payload);

// **************************************************************
// Statistics Requests
// **************************************************************
export const GetCompantStats = (data) => api.post("/statistics/company", data);
export const GetEmployeeData = (data) =>
  api.post("/statistics/sales-manager", data);
export const GetStationStats = (data) => api.post("/statistics/station", data);
export const GetStationSaleStats = (payload) =>
  api.post("/statistics/company-daysales", payload);
export const GetDriverStats = (data) => api.post("/statistics/driverAll", data);
export const GetTenStationStat = (data) =>
  api.post("/statistics/station/topten", data);

//  Error message requests
export const UpdateMessageErrorApi = (data) =>
  api.post("/contact/update", data);
export const GetMessageErrorApi = () => api.get("/contact/get");

// Control Subscriber Requests
export const GetAllControlSubscriberAPI = (requestBody) =>
  api.post("/company/all", requestBody);
