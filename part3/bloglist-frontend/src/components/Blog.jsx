import { useState } from "react";

const Blog = ({ blog, incrementLike, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return !visible ? (
    <div style={blogStyle} className="blog">
      <span>{blog.title}</span> <span>{blog.author}</span>
      <button className="view" onClick={() => setVisible(!visible)}>
        view
      </button>
    </div>
  ) : (
    <div style={blogStyle} className="blog">
      <div>
        <span>{blog.title}</span> <span>{blog.author}</span>
        <button className="hide" onClick={() => setVisible(!visible)}>
          hide
        </button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button className="like" onClick={() => incrementLike(blog.id)}>
          like
        </button>
      </div>
      <div>{blog.author}</div>
      <button
        className="remove"
        onClick={() => deleteBlog(blog.id)}
        style={{
          display: blog.user.username === currentUser.username ? "" : "none",
        }}
      >
        remove
      </button>
    </div>
  );
};

export default Blog;
