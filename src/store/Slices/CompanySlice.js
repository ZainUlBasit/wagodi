import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import { GetComapanyDetails } from "../../Https";

export const fetchCompanyDetails = createAsyncThunk(
  "fetch/CompanyDetails",
  async (current_user) => {
    try {
      const response = await GetComapanyDetails(current_user.companyId._id);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

// export const fetchAdminNotification = createAsyncThunk(
//   "fetchAdminNotification",
//   async (query = {}) => {
//     let response;
//     try {
//       response = await GetAdminNotificationApi({});
//       console.log(response);
//       console.log(response.data.data);
//       console.log(response.data.data.payload);
//       return response?.data?.data?.payload || response.data.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const CompanySlice = createSlice({
  name: "company",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanyDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCompanyDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCompanyDetails.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CompanySlice.reducer;
