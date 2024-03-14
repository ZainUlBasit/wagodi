import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import { GetCompantStats } from "../../Https";

export const fetchCompanyStats = createAsyncThunk(
  "fetch/CompanyStats",
  async (current_user) => {
    try {
      const response = await GetCompantStats(current_user.companyId._id);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const CompanyStatsSlice = createSlice({
  name: "companyStats",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanyStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCompanyStats.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCompanyStats.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CompanyStatsSlice.reducer;
