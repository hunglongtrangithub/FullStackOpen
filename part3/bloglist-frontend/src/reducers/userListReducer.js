import userService from "../services/users";
import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userList",
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload;
    },
  },
});

export const fetchUserList = () => {
  return async (dispatch) => {
    const userList = await userService.getAll();
    dispatch(setUserList(userList));
  };
};
export const { setUserList } = userListSlice.actions;
export default userListSlice.reducer;
