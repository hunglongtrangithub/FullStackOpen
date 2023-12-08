import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    displayNotification: (state, action) => action.payload,
    clearNotification: () => "",
  },
});

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(displayNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
export const { displayNotification, clearNotification } =
  notificationSlice.actions;
