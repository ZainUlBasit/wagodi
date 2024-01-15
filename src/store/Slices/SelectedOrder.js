import { createSlice } from "@reduxjs/toolkit";

const SelectedOrderSlice = createSlice({
  name: "SelectedOrder",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {
    SetSelectedOrder: (state, action) => {
      state.auth = true;
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const { SetSelectedOrder } = SelectedOrderSlice.actions;
export default SelectedOrderSlice.reducer;
