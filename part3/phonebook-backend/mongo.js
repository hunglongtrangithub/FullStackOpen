const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const databaseName = "phonebook";
const url = `mongodb+srv://hunglongtran2004:${password}@cluster0.pme8x5t.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url).then(() => {
  console.log("Successfully connected to MongoDB");
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    if (result.length > 0) {
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
    } else {
      console.log("No person found");
    }
    mongoose.connection.close();
  });
} else if (process.argv.length < 5) {
  console.log("Please provide both name and number");
  mongoose.connection.close();
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name,
    number,
  });
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
