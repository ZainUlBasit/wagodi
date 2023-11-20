import axios from "axios";
import { BASE_URL } from "../assets/config";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Content-type": "application/json",
    Accept: "application/json",
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
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Station Request
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
