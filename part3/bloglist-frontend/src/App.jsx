import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { fetchBlogs } from "./reducers/blogsReducer";
import { logIn, logOut, signIn } from "./reducers/userReducer";
import { createBlog, likeBlog, removeBlog } from "./reducers/blogsReducer";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Blogs from "./routes/Blogs";
import Users from "./routes/Users";
import UserDetail from "./routes/UserDetail";
import BlogDetail from "./routes/BlogDetail";

const App = () => {
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  // retrieve the blog list from the server
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(logIn(loggedUser));
      dispatch(fetchBlogs());
    }
  }, []);

  // retrieve the blog list from the server
  const handleLogin = async ({ username, password }) => {
    try {
      await dispatch(signIn({ username, password }));
      dispatch(fetchBlogs());
      navigate("/");
    } catch (error) {
      dispatch(setNotification("error", error.response.data.error, 5));
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
  };
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
          <nav style={{ backgroundColor: "#a0a0a0", padding: "10px" }}>
            <Link to="/" style={{ color: "#000000", marginRight: "10px" }}>
              Blogs
            </Link>
            <Link to="/users" style={{ color: "#000000", marginRight: "10px" }}>
              Users
            </Link>
            <span style={{ color: "#000000", marginRight: "10px" }}>
              {user.username} logged in
            </span>
            <button onClick={handleLogout} style={{ marginRight: "10px" }}>
              logout
            </button>
          </nav>
          <h2>blogs</h2>
          <Routes>
            <Route
              path="/"
              element={
                <Blogs
                  user={user}
                  blogs={blogs}
                  incrementLike={incrementLike}
                  deleteBlog={deleteBlog}
                  handleCreateBlog={handleCreateBlog}
                />
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route
              path="/blogs/:id"
              element={
                <BlogDetail
                  incrementLike={incrementLike}
                  deleteBlog={deleteBlog}
                  currentUser={user}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
