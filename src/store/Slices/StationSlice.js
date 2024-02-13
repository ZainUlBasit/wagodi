import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStationApi } from "../../Https";

export const fetchStations = createAsyncThunk(
  "fetchStations",
  async (companyId, query = {}) => {
    try {
      let response = await GetStationApi({
        companyId: companyId._id,
      });
      let UpdatedReponse = response.data.data.payload.map((data) => {
        let minAge = 100;
        data.populatedFuels.map(({ value, max_value }) => {
          const currentAge = (value / max_value) * 100;
          if (currentAge < minAge) {
            minAge = currentAge;
          }
        });
        const current_status =
          minAge >= 1 && minAge <= 50
            ? "MakeOrder"
            : minAge > 50 && minAge <= 80
            ? "BeReady"
            : "Healthy";
        return {
          ...data,
          current_status,
        };
      });
      UpdatedReponse = UpdatedReponse.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
      
        // Compare timestamps for ascending order
        return dateA - dateB;
      });
      return UpdatedReponse === undefined ? [] : UpdatedReponse;
    } catch (error) {
      console.log(error);
    }
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
