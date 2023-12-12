import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchBlogs } from "../reducers/blogsReducer";
import { addComment } from "../reducers/blogsReducer";

const BlogDetail = ({ incrementLike, deleteBlog, currentUser }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleAddComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment("");
  };

  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button className="like" onClick={() => incrementLike(blog.id)}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <button
        className="remove"
        onClick={() => deleteBlog(blog.id)}
        style={{
          display: blog.user.username === currentUser.username ? "" : "none",
        }}
      >
        remove
      </button>
      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetail;
