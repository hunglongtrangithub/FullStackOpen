import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    type: null,
    message: null,
  },
  reducers: {
    displayNotification: (state, action) => action.payload,
    clearNotification: () => {
      return { type: null, message: null };
    },
  },
});

export const setNotification = (type, message, seconds) => {
  return async (dispatch) => {
    dispatch(displayNotification({ type, message }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export const { displayNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
