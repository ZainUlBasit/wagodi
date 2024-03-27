import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllOrderApi } from "../../Https";

export const fetchOrders = createAsyncThunk(
  "fetchOrders",
  async (companyId) => {
    try {
      let response = await GetAllOrderApi(companyId);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default orderSlice.reducer;
