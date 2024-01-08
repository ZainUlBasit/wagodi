import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCompanySubscription } from "../../Https";

export const fetchSubscription = createAsyncThunk(
  "fetchSubscription",
  async (companyId, query = {}) => {
    let response = await GetCompanySubscription({
      companyId: companyId._id,
    });
    
    console.log(response.data.data.payload);
    // console.log(response.data.data.payload[0].stations);
    return response.data.data.payload;
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubscription.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSubscription.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action)
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchSubscription.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default subscriptionSlice.reducer;
