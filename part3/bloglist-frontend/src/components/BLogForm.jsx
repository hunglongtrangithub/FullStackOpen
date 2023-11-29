import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  noteFormRef,
  setErrorMessage,
  setSuccessMessage,
  addBlog,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleCreate = async (event) => {
    try {
      event.preventDefault();
      noteFormRef.current.toggleVisibility();
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      setSuccessMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      addBlog(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      title:
      <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      author:
      <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url:
      <input
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type="submit">create</button>
    </form>
  );
};
export default BlogForm;
