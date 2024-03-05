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
    userToken,
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

// *********************************************
// Auth Request
// *********************************************
export const SignInApi = (data) => api.post("/auth/sign-in", data);
export const SignUpApi = (data) => api.post("/auth/company/sign-up", data);
export const ForgetPasswordApi = (data) =>
  api.post("/auth/forget-password", data);
export const VerifyOtpApi = (data) => api.post("/auth/verify-otp", data);
export const UpdatePasswordApi = (data) =>
  api.patch("/auth/update-password", data);
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
  api.patch("company/fuel/update", data);

// **************************************************************
// **************************************************************
// export const AddFuel = (data)=> api.post("/station/")
