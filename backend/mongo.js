const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const databaseName = "noteApp";
const url = `mongodb+srv://hunglongtran2004:${password}@cluster0.pme8x5t.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);
// Note.find({ important: { $ne: true } }).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

Note.insertMany(
  notes.map(
    (note) =>
      new Note({
        content: note.content,
        important: note.important,
      })
  )
).then((result) => {
  console.log(result);
  mongoose.connection.close();
});
