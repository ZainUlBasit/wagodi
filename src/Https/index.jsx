import axios from "axios";
import { BASE_URL } from "../assets/config";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    // "Access-Control-Allow-Origin": "http://localhost:5173",
    "Content-type": "application/json",
    Accept: "application/json",
    "app_secret": "10ef42363582fd212242bf8da6598e6d15111a9a509c36242411d444e8c03728"
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
export const GetStationApi = (data) => api.post("/station/all", data);
export const UpdateStationApi = (data) => api.patch("/station/update", data);
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
// Station Manager Request
// *********************************************
export const CreateStationManagerApi = (data) =>
  api.post("/auth/sign-up", data);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Station Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// *********************************************
// Users Request
// *********************************************
export const GetUserApi = (data) =>
  api.post("/auth/list/", data);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Station Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
