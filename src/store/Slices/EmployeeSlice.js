import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import { GetComapanyDetails, GetEmployeeData } from "../../Https";

export const fetchEmployeeData = createAsyncThunk(
  "fetch/EmployeeData",
  async (CurrentData) => {
    console.log(CurrentData);
    try {
      const response = await GetEmployeeData({
        companyId: CurrentData.id,
        date: CurrentData.CurDate,
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const EmployeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployeeData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchEmployeeData.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default EmployeeSlice.reducer;
