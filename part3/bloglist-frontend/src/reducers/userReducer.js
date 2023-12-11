import loginService from "../services/login";
import blogService from "../services/blogs";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    logIn: (state, action) => {
      const user = action.payload;
      blogService.setToken(user.token);
      return user;
    },
    logOut: () => {
      blogService.setToken(null);
      return null;
    },
  },
});

export const signIn = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    dispatch(logIn(user));
  };
};

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
