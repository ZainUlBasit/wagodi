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
          companyId: current_user.companyId._id,
        });
      } else {
        response = await GetOrderManagerNotificationApi({
          accountId: current_user._id,
        });
      }
      const sortedNotifications =
        response?.data?.data?.payload?.notification.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
      console.log("sortedNotifications", sortedNotifications);
      console.log(response);
      return sortedNotifications || [];
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
  reducers: {
    FilterNotifications: (state, action) => {
      console.log(action);
      const fromDate = Math.floor(new Date(action.payload.FromDate) / 1000);
      const toDate = Math.floor(new Date(action.payload.ToDate) / 1000);

      const filteredData = state.data.filter((item) => {
        console.log(fromDate, toDate, item.createdAt);
        const createdAtTimestamp = item.createdAt;
        return createdAtTimestamp >= fromDate && createdAtTimestamp <= toDate;
      });

      state.data = filteredData;
    },
  },
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

export const { FilterNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
