import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAdminNotificationApi,
  GetAllOrderApi,
  GetAllVendorApi,
  GetCompanyNotificationApi,
} from "../../Https";

export const fetchNotification = createAsyncThunk(
  "fetchNotification",
  async (companyId, query = {}, role) => {
    console.log(companyId);
    try {
      let response;
      if(role != 0){
        response = await GetCompanyNotificationApi({
          companyId: companyId._id,
        });
      } else {
        response = await GetAdminNotificationApi({})
      }
      console.log(response);
      console.log(response.data.data);
      console.log(response.data.data.payload);
      return response?.data?.data?.payload || response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
