import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import { GetAllDrivers, GetComapanyDetails } from "../../Https";

export const fetchDrivers = createAsyncThunk(
  "fetch/Drivers",
  async (CurrentUser) => {
    try {
      const response = await GetAllDrivers({ companyId: CurrentUser._id });
      console.log(response);
      if (response.data?.success) return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const DriverSlice = createSlice({
  name: "drivers",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDrivers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDrivers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchDrivers.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default DriverSlice.reducer;
