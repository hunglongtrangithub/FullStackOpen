import { useState } from "react";

const Blog = ({ blog, incrementLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return !visible ? (
    <div style={blogStyle}>
      <span>{blog.title}</span> <span>{blog.author}</span>
      <button onClick={() => setVisible(!visible)}>view</button>
    </div>
  ) : (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span> <span>{blog.author}</span>
        <button onClick={() => setVisible(!visible)}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={() => incrementLike(blog.id)}>like</button>
      </div>
      <div>{blog.author}</div>
      <button onClick={() => deleteBlog(blog.id)}>remove</button>
    </div>
  );
};

export default Blog;
