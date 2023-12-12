import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

const Blogs = ({
  user,
  blogs,
  incrementLike,
  handleCreateBlog,
  deleteBlog,
}) => {
  const blogFormRef = useRef(null); // blogFormRef is a reference to the Togglable component in the BlogForm component to be used to toggle the visibility of the BlogForm component
  const dispatch = useDispatch();

  return (
    <div>
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
  );
};

export default Blogs;
