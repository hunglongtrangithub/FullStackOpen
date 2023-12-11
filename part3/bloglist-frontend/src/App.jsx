import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  createBlog,
  likeBlog,
  removeBlog,
  initializeBlogs,
} from "./reducers/blogsReducer";
import { logIn, logOut, signIn } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";

const App = () => {
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blogFormRef = useRef(null); // blogFormRef is a reference to the Togglable component in the BlogForm component to be used to toggle the visibility of the BlogForm component

  // retrieve the blog list from the server
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(logIn(loggedUser));
      dispatch(initializeBlogs());
    }
  }, []);

  // add a new blog to the blog list
  const handleCreateBlog = async (blog) => {
    try {
      dispatch(createBlog(blog));
      dispatch(
        setNotification(
          "success",
          `a new blog ${blog.title} by ${blog.author} added`,
          5
        )
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(setNotification("error", error.response.data.error, 5));
    }
  };

  // retrieve the blog list from the server
  const handleLogin = async ({ username, password }) => {
    try {
      dispatch(signIn({ username, password }));
      dispatch(initializeBlogs());
    } catch (error) {
      dispatch(setNotification("error", error.response.data.error, 5));
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const incrementLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    try {
      dispatch(likeBlog(blog));
    } catch (error) {
      dispatch(setNotification("error", error.response.data.error, 5));
    }
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog));
      } catch (error) {
        dispatch(setNotification("error", error.response.data.error, 5));
      }
    }
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <h2>blogs</h2>
          {user.username} logged in
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          <div>
            {[...blogs]
              .sort((b1, b2) => b2.likes - b1.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  incrementLike={incrementLike}
                  deleteBlog={deleteBlog}
                  currentUser={user}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
