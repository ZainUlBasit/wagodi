import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import {
  GetComapanyDetails,
  GetEmployeeData,
  GetMessageErrorApi,
  GetStationSaleStats,
  GetStationStats,
} from "../../Https";

export const fecthMessageError = createAsyncThunk(
  "fetch/ErrorMessageDetail",
  async () => {
    try {
      const response = await GetMessageErrorApi();
      console.log(response.data);
      return response.data.contactInfo[0] || {};
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const ErrorMessageSlice = createSlice({
  name: "ErrorMessageDetail",
  initialState: {
    loading: true,
    data: {},
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fecthMessageError.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fecthMessageError.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fecthMessageError.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ErrorMessageSlice.reducer;
