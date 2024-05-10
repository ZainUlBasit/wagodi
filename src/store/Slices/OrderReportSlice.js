import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllOrderApi, GetOrderReports } from "../../Https";

export const fetchOrderReports = createAsyncThunk(
  "fetchOrderReports",
  async (CurrentCompanyId) => {
    try {
      let response = await GetOrderReports({ companyId: CurrentCompanyId });
      console.log(response.data.data);
      return response.data.data.map((dt) => {
        const differenceInMs =
          dt?.station?.deliveryTime * 1000 - dt?.createdAt * 1000;

        // Convert milliseconds to hours
        const differenceInHours = differenceInMs / (1000 * 60 * 60);

        console.log(
          dt?.station?.deliveryTime * 1000,
          dt?.createdAt * 1000,
          differenceInHours
        );

        return {
          ...dt,
          deliveryTimeInHr: differenceInHours,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
);

const orderReportSlice = createSlice({
  name: "order-report",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {
    FilterOrderReport: (state, action) => {
      const currentDate = new Date(action.payload);
      currentDate.setHours(0); // Set hours to 00:00 AM
      currentDate.setMinutes(0); // Set minutes to 00
      currentDate.setSeconds(0); // Set seconds to 00
      currentDate.setMilliseconds(0); // Set milliseconds to 00
      const timestamp = Math.floor(currentDate.getTime() / 1000);

      state.data = state.data.filter((dt) => {
        const CreatedDate = new Date(dt.createdAt * 1000);
        CreatedDate.setHours(0); // Set hours to 00:00 AM
        CreatedDate.setMinutes(0); // Set minutes to 00
        CreatedDate.setSeconds(0); // Set seconds to 00
        CreatedDate.setMilliseconds(0); // Set milliseconds to 00

        console.log(Math.floor(CreatedDate.getTime() / 1000) === timestamp);
        console.log(Math.floor(CreatedDate.getTime() / 1000), timestamp);
        return Math.floor(CreatedDate.getTime() / 1000) === timestamp;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderReports.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderReports.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchOrderReports.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export const { FilterOrderReport } = orderReportSlice.actions;

export default orderReportSlice.reducer;
