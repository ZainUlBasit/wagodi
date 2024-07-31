import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import ErrorToast from "../../components/Toast/ErrorToast";
import { GetAllControlSubscriberAPI, GetDriverStats } from "../../Https";

export const fetchControlSubscibers = createAsyncThunk(
  "fetch/ControlSubscribers",
  async () => {
    try {
      const response = await GetAllControlSubscriberAPI({});
      console.log(response.data);
      if (response.data.success) return response.data.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const ControlSubscribersSlice = createSlice({
  name: "ControlSubscribers",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchControlSubscibers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchControlSubscibers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchControlSubscibers.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ControlSubscribersSlice.reducer;
