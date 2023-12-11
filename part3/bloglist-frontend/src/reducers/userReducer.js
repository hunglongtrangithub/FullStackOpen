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
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      return user;
    },
    logOut: () => {
      blogService.setToken(null);
      window.localStorage.removeItem("loggedBlogAppUser");
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
