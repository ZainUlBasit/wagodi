import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import {
  GetComapanyDetails,
  GetEmployeeData,
  GetStationStats,
  GetTenStationStat,
} from "../../Https";

export const fetchTopTenStation = createAsyncThunk(
  "fetch/Station/TopTen",
  async (currentCompanyId) => {
    console.log(currentCompanyId);
    try {
      const response = await GetTenStationStat(currentCompanyId);
      console.log(response);
      // return [];
      return response.data.data || [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const TopTenStatsSlice = createSlice({
  name: "station-top-ten",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopTenStation.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTopTenStation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchTopTenStation.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default TopTenStatsSlice.reducer;
