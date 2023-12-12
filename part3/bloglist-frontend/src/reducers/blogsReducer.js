import blogService from "../services/blogs";
import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      return [...state, action.payload];
    },
    updateBlog: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(addBlog(newBlog));
    } catch (error) {
      throw error;
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      throw error;
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch(deleteBlog(blog.id));
    } catch (error) {
      throw error;
    }
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment);
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      throw error;
    }
  };
};

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
