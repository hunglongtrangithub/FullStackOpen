require("dotenv").config();

const PORT = 3003;
const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : "mongodb://localhost/bloglist";

module.exports = {
  PORT,
  mongoUrl,
};
