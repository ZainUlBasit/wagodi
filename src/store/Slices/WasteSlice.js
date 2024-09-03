import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorToast from "../../components/Toast/ErrorToast";
import { GetComapanyDetails, GetEmployeeData } from "../../Https";

export const fetchWasteData = createAsyncThunk(
  "fetch/WasteData",
  async (CurrentData) => {
    return [
      {
        stationName: "test123",
        date: 1725367572,
        wasteFuel: 12.3,
        fuelType: 2,
      },
    ];
    let reqBody;
    if (CurrentData === "")
      reqBody = {
        companyId: CurrentData.id,
      };
    else
      reqBody = {
        companyId: CurrentData.id,
        date: CurrentData.CurDate,
      };

    try {
      const response = await GetEmployeeData(reqBody);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
);

const WasteSlice = createSlice({
  name: "waste",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWasteData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWasteData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchWasteData.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default WasteSlice.reducer;
