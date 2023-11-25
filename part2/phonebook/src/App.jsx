import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAllPersons().then((response) => setPersons(response));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === "") {
      alert("Name cannot be empty");
      return;
    }
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (confirm(message)) {
        const oldPersonId = persons.find(
          (person) => person.name === newName
        ).id;
        const newPerson = {
          name: newName,
          number: newNumber,
          id: oldPersonId,
        };
        personService
          .replacePerson(oldPersonId, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPersonId ? person : newPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Updated ${newName}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((person) => person.id !== oldPersonId));
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      personService.addPerson(newPerson).then((response) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (event, personId) => {
    event.preventDefault();
    personService
      .deletePerson(personId)
      .then((response) => {
        setPersons(persons.filter((person) => person.id !== personId));
      })
      .catch((error) => {
        setErrorMessage(
          `Information of ${newName} has already been removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter((person) => person.id !== personId));
      });
  };

  const filterPersons = (searchName, persons) =>
    persons.filter((person) =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    );
  const filteredPersons = filterPersons(searchName, persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      <Filter
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <h2>add a new</h2>
      <PersonForm
        value={{
          name: newName,
          number: newNumber,
        }}
        onChange={{
          name: (e) => setNewName(e.target.value),
          number: (e) => setNewNumber(e.target.value),
        }}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;