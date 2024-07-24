import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import {
  GetComapanyDetails,
  GetEmployeeData,
  GetStationSaleStats,
  GetStationStats,
} from "../../Https";

export const fetchStationSalesStats = createAsyncThunk(
  "fetch/StationStats-Sales",
  async (payload) => {
    console.log(payload);
    try {
      const response = await GetStationSaleStats(payload);
      console.log(response.data);
      return response.data.data || [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const StationSaleStatsSlice = createSlice({
  name: "station-sale-stats",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStationSalesStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStationSalesStats.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchStationSalesStats.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default StationSaleStatsSlice.reducer;
