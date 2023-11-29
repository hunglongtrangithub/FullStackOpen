const createBlog = ({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  handleCreate,
}) => {
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
export default createBlog;
