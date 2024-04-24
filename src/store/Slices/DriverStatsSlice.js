import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import ErrorToast from "../../components/Toast/ErrorToast";
import { GetDriverStats } from "../../Https";

export const fetchDriverStats = createAsyncThunk(
  "fetch/DriverStats",
  async (currentCompanyId) => {
    console.log(currentCompanyId);
    try {
      const response = await GetDriverStats(currentCompanyId);
      console.log(response.data);
      return response.data.data || [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const DriverStatsSlice = createSlice({
  name: "driver-stats",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDriverStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDriverStats.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchDriverStats.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default DriverStatsSlice.reducer;
