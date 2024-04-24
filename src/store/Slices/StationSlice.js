import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStationApi } from "../../Https";

export const fetchStations = createAsyncThunk(
  "fetchStations",
  async (companyId, query = {}) => {
    try {
      let response = await GetStationApi({
        companyId: companyId._id,
      });
      let UpdatedReponse = response.data.data.map((data) => {
        let minAge = 100;
        data.populatedFuels.map(({ value, max_value }) => {
          const currentAge = (value / max_value) * 100;
          if (currentAge < minAge) {
            minAge = currentAge;
          }
        });
        const current_status =
          minAge >= 0 && minAge <= 30
            ? "MakeOrder"
            : minAge > 30 && minAge <= 70
            ? "BeReady"
            : minAge > 70 && minAge <= 100
            ? "Healthy"
            : "";
        return {
          ...data,
          current_status,
        };
      });
      console.log(UpdatedReponse);
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
    return [];
  }
);

const stationSlice = createSlice({
  name: "stations",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {
    MakeFav: (state, action) => {
      state.data = state.data.map((dt) => {
        if (dt._id === action.payload.id) {
          return {
            ...dt,
            favorite: action.payload.status,
          };
        } else {
          return {
            ...dt,
          };
        }
      });
    },
  },
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

export const { MakeFav } = stationSlice.actions;

export default stationSlice.reducer;
