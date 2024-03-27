import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import {
  GetComapanyDetails,
  GetEmployeeData,
  GetStationStats,
} from "../../Https";

export const fetchStationStats = createAsyncThunk(
  "fetch/StationStats",
  async (currentCompanyId) => {
    console.log(currentCompanyId);
    try {
      const response = await GetStationStats(currentCompanyId);
      console.log(response.data);
      return response.data.data || [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const StationStatsSlice = createSlice({
  name: "station-stats",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStationStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStationStats.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchStationStats.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default StationStatsSlice.reducer;
