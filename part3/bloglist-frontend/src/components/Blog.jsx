import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, incrementLike, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!visible) {
    return (
      <div style={blogStyle} className="blog">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <button className="view" onClick={() => setVisible(!visible)}>
          view
        </button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle} className="blog">
        <div>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
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
  }
};

export default Blog;
