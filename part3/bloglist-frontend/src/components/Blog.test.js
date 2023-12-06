import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe("<BLog />", () => {
  test("blog renders title and author, but not URL or number of likes by default", () => {
    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "http://www.testurl.com",
      likes: 0,
      id: "Test ID",
    };
    const incrementLike = jest.fn();
    const deleteBlog = jest.fn();

    render(
      <Blog blog={blog} incrementLike={incrementLike} deleteBlog={deleteBlog} />
    );

    const title = screen.getByText(blog.title);
    const author = screen.getByText(blog.author);
    const url = screen.queryByText(blog.url);
    const likes = screen.queryByText(`likes ${blog.likes}`);

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("blog renders title, author, URL and number of likes when view button is clicked", async () => {
    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "http://www.testurl.com",
      likes: 0,
      id: "Test ID",
    };
    const incrementLike = jest.fn();
    const deleteBlog = jest.fn();

    render(
      <Blog blog={blog} incrementLike={incrementLike} deleteBlog={deleteBlog} />
    );

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const url = screen.getByText(blog.url);
    const likes = screen.getByText(`likes ${blog.likes}`);

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  test("if like button is clicked twice, the event handler is called twice", async () => {
    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "http://www.testurl.com",
      likes: 0,
      id: "Test ID",
    };
    const incrementLike = jest.fn();
    const deleteBlog = jest.fn();

    render(
      <Blog blog={blog} incrementLike={incrementLike} deleteBlog={deleteBlog} />
    );

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(incrementLike.mock.calls).toHaveLength(2);
  });
});

describe("<BlogForm />", () => {
  test("new blog form calls the event handler with the right details", async () => {
    const blog = {
      title: "Test Title",
      author: "Test Author",
      url: "http://www.testurl.com",
      likes: 0,
      id: "Test ID",
    };
    const onCreateBlog = jest.fn();

    const container = render(
      <BlogForm onCreateBlog={onCreateBlog} />
    ).container;

    const titleInput = container.querySelector(".title");
    const authorInput = container.querySelector(".author");
    const urlInput = container.querySelector(".url");
    const sendButton = container.querySelector(".send");

    const user = userEvent.setup();
    await user.type(titleInput, blog.title);
    await user.type(authorInput, blog.author);
    await user.type(urlInput, blog.url);
    await user.click(sendButton);

    expect(onCreateBlog.mock.calls).toHaveLength(1);
    expect(onCreateBlog.mock.calls[0][0]).toEqual({
      title: blog.title,
      author: blog.author,
      url: blog.url,
    });
  });
});
