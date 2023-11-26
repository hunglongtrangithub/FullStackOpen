const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

// test
const blog = new Blog({
  title: "Test",
  author: "Test",
  url: "Test",
  likes: 0,
});

console.log(blog.likes);
