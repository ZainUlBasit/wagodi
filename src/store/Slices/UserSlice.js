import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStationApi, GetUserApi } from "../../Https";

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async ({ companyId, query = {} }) => {
    try {
      console.log(companyId);
      let response = await GetUserApi({ companyId: companyId._id });
      console.log(response.data.data);      
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
