describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      username: "abcdef",
      password: "123456",
    };
    cy.request({
      url: "http://localhost:3003/api/users",
      method: "POST",
      body: user,
    });

    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.get(".login");
    cy.get(".username");
    cy.get(".password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get(".username").type("abcdef");
      cy.get(".password").type("123456");
      cy.get(".login").click();
    });

    it("fails with wrong credentials", function () {
      cy.get(".username").type("abcdef");
      cy.get(".password").type("wrong");
      cy.get(".login").click();

      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      const user = {
        username: "abcdef",
        password: "123456",
      };
      cy.login(user);
    });

    it("A blog can be created", function () {
      const newBlog = {
        title: "A new blog",
        author: "New Author",
        url: "http://url.com",
      };
      cy.contains("new note").click();
      cy.get(".title").type(newBlog.title);
      cy.get(".author").type(newBlog.author);
      cy.get(".url").type(newBlog.url);
      cy.get(".send").click();

      cy.contains(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      cy.contains(newBlog.title);
      cy.contains(newBlog.author);
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        const blog = {
          title: "Blog 0",
          author: "Author 0",
          url: "http://url0.com",
        };
        cy.createBlog(blog);
      });

      it("Users can like a blog", function () {
        cy.get(".view").click();
        cy.get(".like").click();
        cy.contains("likes 1");
      });

      it("The user who created a blog can delete it", function () {
        cy.get(".view").click();
        cy.get(".remove").click();
      });

      it("only the creator can see the delete button of a blog, not anyone else", function () {
        const user = {
          username: "anotheruser",
          password: "anotherpassword",
        };
        cy.request({
          url: "http://localhost:3003/api/users",
          method: "POST",
          body: user,
        });
        cy.login(user);

        cy.get(".view").click();
        cy.get(".remove").should("not.visible");
      });

      it("the blogs are ordered according to likes with the blog with the most likes being first", function () {
        const blogs = [
          {
            title: "Blog 1",
            author: "Author 1",
            url: "http://blog1.com",
            likes: 1,
          },
          {
            title: "Blog 2",
            author: "Author 2",
            url: "http://blog2.com",
            likes: 2,
          },
          {
            title: "Blog 3",
            author: "Author 3",
            url: "http://blog3.com",
            likes: 3,
          },
        ];
        cy.createBlog(blogs[0]);
        cy.createBlog(blogs[1]);
        cy.createBlog(blogs[2]);

        cy.get(".blog").eq(0).should("contain", "Blog 3");
        cy.get(".blog").eq(1).should("contain", "Blog 2");
        cy.get(".blog").eq(2).should("contain", "Blog 1");
        cy.get(".blog").eq(3).should("contain", "Blog 0");
      });
    });
  });
});
