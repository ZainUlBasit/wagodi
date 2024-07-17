import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserApi } from "../../Https";

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async ({ companyId, query = {} }) => {
    try {
      let response = await GetUserApi({ companyId: companyId._id });
      const sortedData = response.data.data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      console.log(sortedData);
      return sortedData.filter((dt) => dt.role !== 0);
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error to propagate it
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
  reducers: {
    FavouriteStation: (state, action) => {
      state.data = state.data.map((dt) => {
        if (action.id === dt._id) {
          return {
            ...dt,
            favourite: !dt.favourite,
          };
        }
        return dt;
      });
    },
  },
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

export const { FavouriteStation } = userSlice.actions;

export default userSlice.reducer;
