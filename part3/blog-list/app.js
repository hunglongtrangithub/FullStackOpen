require("express-async-errors");
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(config.mongoUrl);

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use("/api/blogs", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
