const blogsRouter = require("express").Router();
jwt = require("jsonwebtoken");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  await savedBlog.populate("user", { username: 1, name: 1 });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = request.user;
  const userid = user._id;

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== userid.toString()) {
    return response
      .status(401)
      .json({ error: "user must be the creator of the blog to delete it" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  const updatedblog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", { username: 1, name: 1 });

  response.json(updatedblog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const { comment } = request.body;

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  blog.comments = blog.comments.concat(comment);

  const updatedBlog = await blog.save();

  response.json(updatedBlog);
});

module.exports = blogsRouter;
