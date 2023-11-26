require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Note = require("./models/note");

const app = express();
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findById(id).then((note) => {
    response.json(note);
  });
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id).then((result) => {
    response.status(204).end();
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.put("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
  };

  Note.findByIdAndUpdate(id, note, { new: true }).then((updatedNote) => {
    response.json(updatedNote);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
