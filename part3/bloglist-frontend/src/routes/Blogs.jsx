import React, { useRef } from "react";
import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

const Blogs = ({
  user,
  blogs,
  incrementLike,
  handleCreateBlog,
  deleteBlog,
  blogFormRef,
}) => {
  return (
    <div>
      <Togglable
        buttonLabel="create new blog"
        ref={blogFormRef}
        className="border-spacing-10"
      >
        <BlogForm
          handleCreateBlog={handleCreateBlog}
          className="border-2 p-4 m-4 rounded"
        />
      </Togglable>
      <div className="blog-list">
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
