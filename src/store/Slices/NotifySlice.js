import { createSlice } from "@reduxjs/toolkit";

const NotifySlice = createSlice({
  name: "NotifySlice",
  initialState: {
    new: false,
  },
  reducers: {
    SetNotify: (state, action) => {
      state.new = true;
    },
    GetNotify: (state, action) => {
      state.new = false;
    },
  },
});

export const { SetNotify, GetNotify } = NotifySlice.actions;
export default NotifySlice.reducer;
