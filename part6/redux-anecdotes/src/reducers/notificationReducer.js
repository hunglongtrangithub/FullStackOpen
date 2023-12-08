import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    displayNotification: (state, action) => action.payload,
    clearNotification: () => "",
  },
});

export default notificationSlice.reducer;
export const { displayNotification, clearNotification } =
  notificationSlice.actions;
