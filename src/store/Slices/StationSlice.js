import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStationApi } from "../../Https";

export const fetchStations = createAsyncThunk(
  "fetchStations",
  async (companyId, query = {}) => {
    let response = await GetStationApi({
      companyId: companyId._id,
    });
    
    console.log(response.data.data);
    console.log(response.data.data.payload);
    // console.log(response.data.data.payload[0].stations);
    return response.data.data.payload;
  }
);

const stationSlice = createSlice({
  name: "stations",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStations.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStations.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchStations.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default stationSlice.reducer;
