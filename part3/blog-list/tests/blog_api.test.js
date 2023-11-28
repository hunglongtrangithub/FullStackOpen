const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    title: "First Blog",
    author: "Author 1",
    url: "http://blog1.com",
    likes: 10,
  },
  {
    title: "Second Blog",
    author: "Author 2",
    url: "http://blog2.com",
    likes: 20,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs.map((blog) => new Blog(blog)));
});

describe("GET", () => {
  test("returns the correct amount of blog posts in the JSON format", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
    expect(response.type).toBe("application/json");
  });

  test("verifies that the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
    expect(response.body[0].id).toBeDefined();
  });
});

describe("POST", () => {
  test("a valid blog post can be added ", async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://newblog.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length + 1);

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("New Blog");
  });

  test("if likes property is missing, it defaults to 0", async () => {
    const newBlogWithoutLikes = {
      title: "Blog Without Likes",
      author: "Author",
      url: "http://blogwithoutlikes.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const createdBlog = response.body.find(
      (blog) => blog.title === "Blog Without Likes"
    );

    expect(createdBlog.likes).toBe(0);
  });

  test("responds with 400 Bad Request if title is missing", async () => {
    const blogWithoutTitle = {
      author: "Author",
      url: "http://blogwithnotitle.com",
      likes: 5,
    };
    await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
  });

  test("responds with 400 Bad Request if url is missing", async () => {
    const blogWithoutUrl = {
      title: "Blog Without URL",
      author: "Author",
      likes: 5,
    };
    await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
  });
});

describe("DELETE", () => {
  test("a blog can be deleted", async () => {
    const blogsBeforeDelete = await Blog.find({});
    const blogToDelete = blogsBeforeDelete[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("PUT", () => {
  test("successfully updates a blog post", async () => {
    const initialBlog = await Blog.findOne({});

    const updatedData = {
      title: "Updated Blog",
      author: "Updated Author",
      url: "http://updatedblog.com",
      likes: 10,
    };

    await api
      .put(`/api/blogs/${initialBlog.id}`)
      .send(updatedData)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedBlog = await Blog.findById(initialBlog.id);

    expect(updatedBlog.title).toBe(updatedData.title);
    expect(updatedBlog.author).toBe(updatedData.author);
    expect(updatedBlog.url).toBe(updatedData.url);
    expect(updatedBlog.likes).toBe(updatedData.likes);
  });

  test("responds with 400 Bad Request if title is missing", async () => {
    const blogWithoutTitle = {
      author: "Updated Author",
      url: "http://updatedblog.com",
      likes: 10,
    };

    await api
      .put(`/api/blogs/${initialBlogs[0].id}`)
      .send(blogWithoutTitle)
      .expect(400);
  });

  test("responds with 400 Bad Request if title is missing", async () => {
    const blogWithoutUrl = {
      author: "Updated Author",
      title: "Updated Title",
      likes: 10,
    };

    await api
      .put(`/api/blogs/${initialBlogs[0].id}`)
      .send(blogWithoutUrl)
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
