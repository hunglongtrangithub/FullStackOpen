import { useState } from "react";

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onCreateBlog = async (event) => {
    event.preventDefault();
    await handleCreateBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={onCreateBlog} className="blog-form">
      <h2>create new</h2>
      title:
      <input
        className="title"
        type="text"
        value={title}
        name="Title"
        placeholder="your blog title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      author:
      <input
        className="author"
        type="text"
        value={author}
        name="Author"
        placeholder="your name"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url:
      <input
        className="url"
        type="text"
        value={url}
        name="Url"
        placeholder="https://www.example.com"
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
