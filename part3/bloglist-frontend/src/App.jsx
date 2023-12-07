import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // user state is used to determine whether the user is logged in or not
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef(null); // blogFormRef is a reference to the Togglable component in the BlogForm component to be used to toggle the visibility of the BlogForm component
  // retrieve the blog list from the server
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  // add a new blog to the blog list
  const onCreateBlog = async (blog) => {
    try {
      await blogService.create(blog);
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error.response.data.error);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // retrieve the blog list from the server
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      // console.log(error.response.data.error);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const incrementLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      await blogService.update(id, updatedBlog);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(id);
        blogService.getAll().then((blogs) => setBlogs(blogs));
      } catch (error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          {user.username} logged in
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm onCreateBlog={onCreateBlog} />
          </Togglable>
          <div>
            {blogs
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
