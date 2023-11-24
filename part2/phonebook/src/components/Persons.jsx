const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <button onClick={(e) => onDelete(e, person.id)}>delete</button>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default Persons;
