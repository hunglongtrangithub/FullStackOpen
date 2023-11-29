const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);
const bcrypt = require("bcrypt");

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

let token;

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  // Create a user
  const passwordHash = await bcrypt.hash("testpassword", 10);
  const user = new User({
    name: "Test User",
    username: "testuser",
    passwordHash,
  });
  await user.save();

  // Log in to get a token
  const response = await api
    .post("/api/login")
    .send({ username: "testuser", password: "testpassword" });

  token = response.body.token;

  // Insert initial blogs with the user reference
  const blogObjects = initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user._id })
  );
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("/api/blogs GET", () => {
  test("returns the correct amount of blog posts in the JSON format", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveLength(initialBlogs.length);
    expect(response.type).toBe("application/json");
  });

  test("verifies that the unique identifier property of the blog posts is named id", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveLength(initialBlogs.length);
    expect(response.body[0].id).toBeDefined();
  });
});

describe("/api/blogs POST", () => {
  test("a valid blog post can be added ", async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://newblog.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).toContain("New Blog");
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
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await Blog.find({});
    const createdBlog = blogsAtEnd.find(
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
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400);
  });

  test("responds with 400 Bad Request if url is missing", async () => {
    const blogWithoutUrl = {
      title: "Blog Without URL",
      author: "Author",
      likes: 5,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogWithoutUrl)
      .expect(400);
  });

  test("blog cannot be added without a token", async () => {
    const newBlog = {
      title: "Unauthorized Blog",
      author: "No Author",
      url: "http://unauthorizedblog.com",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe("/api/blogs DELETE", () => {
  test("a blog can be deleted", async () => {
    const blogsBeforeDelete = await Blog.find({});
    const blogToDelete = blogsBeforeDelete[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("/api/blogs PUT", () => {
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
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer ${token}`)
      .send(blogWithoutUrl)
      .expect(400);
  });
});

describe("/api/users POST", () => {
  test("create & save user successfully, then tries to create a user with the same username which should fail", async () => {
    const user = new User({
      username: "test",
      name: "test",
      passwordHash: "test",
    });
    const savedUser = await user.save();

    const result = await api
      .post("/api/users")
      .send({
        username: "test",
        name: "test",
        password: "test",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain("validation failed: username: Error");
  });

  test("fails with status 400 and proper message if password is too short", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "testuser",
      name: "Test User",
      password: "pw", // intentionally short password
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must be at least 3 characters long"
    );

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("fails with status 400 and proper message if username is too short", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "tu", // intentionally short username
      name: "Test User",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username must be at least 3 characters long"
    );

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
