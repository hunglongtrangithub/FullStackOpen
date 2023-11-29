const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  const fav_blog = blogs.reduce(
    (max, blog) => (max.likes > blog.likes ? max : blog),
    0
  );
  return {
    author: fav_blog.author,
    likes: fav_blog.likes,
    title: fav_blog.title,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const dict = Object();
  blogs.forEach((blog) => {
    if (Object.keys(dict).includes(blog.author)) {
      dict[blog.author]++;
    } else {
      dict[blog.author] = 1;
    }
  });
  const most_blogs = Object.entries(dict).reduce((max, blog) =>
    max[1] > blog[1] ? max : blog
  );
  return {
    author: most_blogs[0],
    blogs: most_blogs[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length == 0) return null;
  const dict = Object();
  blogs.forEach((blog) => {
    if (Object.keys(dict).includes(blog.author)) {
      dict[blog.author] += blog.likes;
    } else {
      dict[blog.author] = blog.likes;
    }
  });
  const most_likes = Object.entries(dict).reduce((max, blog) =>
    max[1] > blog[1] ? max : blog
  );
  return {
    author: most_likes[0],
    likes: most_likes[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
