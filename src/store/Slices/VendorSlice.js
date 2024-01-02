import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllVendorApi, GetVendorApi } from "../../Https";
import toast from "react-hot-toast";
import LoggingOut from "../../components/Modals/LoggingOut";

const LogginOut = () => {
  localStorage.removeItem("user-data");
  localStorage.removeItem("logged-in");
  window.location.reload();
};

export const fetchVendors = createAsyncThunk(
  "fetchVendors",
  async (companyId, query = {}) => {
    try {
      let response = await GetVendorApi({
        companyId:companyId._id,
      });
      console.log(response);
      return response.data.data;
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error.msg);
      // LogginOut();
    }
  }
);

const VendorSlice = createSlice({
  name: "vendors",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVendors.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchVendors.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchVendors.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default VendorSlice.reducer;
