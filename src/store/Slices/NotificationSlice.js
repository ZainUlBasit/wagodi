import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAdminNotificationApi,
  GetAllOrderApi,
  GetAllVendorApi,
  GetCompanyNotificationApi,
  GetOrderManagerNotificationApi,
} from "../../Https";
import ErrorToast from "../../components/Toast/ErrorToast";

export const fetchNotification = createAsyncThunk(
  "fetchNotification",
  async (current_user, role, query = {}) => {
    console.log(current_user);
    console.log(role);
    try {
      let response;
      if (current_user.role == undefined) {
        ErrorToast("role should be define!");
        return [];
      } else if (current_user.role === 0) {
        response = await GetAdminNotificationApi({
          companyId: current_user.companyId._id,
        });
      } else if (current_user.role === 1) {
        response = await GetCompanyNotificationApi({
          companyId: current_user._id,
        });
      } else {
        response = await GetOrderManagerNotificationApi({
          accountId: current_user._id,
        });
      }
      return response?.data?.data?.payload || response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const fetchAdminNotification = createAsyncThunk(
//   "fetchAdminNotification",
//   async (query = {}) => {
//     let response;
//     try {
//       response = await GetAdminNotificationApi({});
//       console.log(response);
//       console.log(response.data.data);
//       console.log(response.data.data.payload);
//       return response?.data?.data?.payload || response.data.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotification.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      console.log("notification fulfilled payload : ", action.payload);
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchNotification.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default notificationSlice.reducer;
