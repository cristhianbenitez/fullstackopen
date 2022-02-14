import React, { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterInput, setFilterInput] = useState('');

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phone: newPhone
    };
    const hasDuplicates = persons.find((person) => newName === person.name);

    hasDuplicates
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));

    // I think the way that it's done in the two lines below it's more readable
    // if (hasDuplicates) return alert(`${newName} is already added to phonebook`);
    // setPersons(persons.concat(newPerson));
  };

  const handleFilter = (event) => {
    setFilterInput(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterInput.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input type="text" onChange={handleFilter} />
      </div>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handleNewPhone={handleNewPhone}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={filteredPersons} />
      </ul>
    </div>
  );
};

export default App;
