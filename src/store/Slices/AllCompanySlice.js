import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllCompany, GetCompanySubscription } from "../../Https";

export const fetchAllCompany = createAsyncThunk(
  "fetchAllCompany",
  async (BodyData) => {
    try {
      let response = await GetAllCompany(BodyData);
      //   console.log(response.data.data);
      //   console.log(
      //     response.data.data.filter((data) => data.name === "test company")
      //   );

      return response.data.data.filter((data) => data.approved === false);
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const AllCompanySlice = createSlice({
  name: "all-company",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCompany.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCompany.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchAllCompany.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default AllCompanySlice.reducer;
