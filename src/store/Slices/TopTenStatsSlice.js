import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import {
  GetComapanyDetails,
  GetEmployeeData,
  GetStationStats,
  GetTenStationStat,
} from "../../Https";

export const fetchTopTenStation = createAsyncThunk(
  "fetch/Station/TopTen",
  async (Payload) => {
    console.log(Payload);
    let reqBody;
    if (Payload.type === 1) {
      reqBody = {
        companyId: Payload.companyId,
        day: Payload.value,
      };
    } else if (Payload.type === 2) {
      reqBody = {
        companyId: Payload.companyId,
        month: Payload.value,
      };
    } else if (Payload.type === 3) {
      reqBody = {
        companyId: Payload.companyId,
        year: Payload.value,
      };
    }
    try {
      const response = await GetTenStationStat(reqBody);
      const updatedResponse = response.data.data.map((dt) => {
        return {
          ...dt,
          salesVolume: parseFloat(dt.salesVolume).toFixed(2),
          salesAmount: parseFloat(dt.salesAmount).toFixed(2),
        };
      });
      // return [];
      return updatedResponse || [];
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const TopTenStatsSlice = createSlice({
  name: "station-top-ten",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopTenStation.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTopTenStation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchTopTenStation.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default TopTenStatsSlice.reducer;
