import { useState } from "react";

const BlogForm = ({ onCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    await onCreateBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      title:
      <input
        className="title"
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      author:
      <input
        className="author"
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url:
      <input
        className="url"
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type="submit" className="send">
        create
      </button>
    </form>
  );
};

export default BlogForm;
