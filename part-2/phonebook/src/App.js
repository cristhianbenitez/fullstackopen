import React, { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import phonebookService from './services/phonebookService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [notification, setNotification] = useState('');
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    phonebookService.getAll().then((persons) => setPersons(persons));
  }, []);

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
      number: newPhone
    };
    const hasDuplicateName = persons.find((p) => newPerson.name === p.name);

    if (hasDuplicateName) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook,replace the old number with a new one ?`
        )
      ) {
        const id = hasDuplicateName.id;
        const updatedPerson = { ...hasDuplicateName, number: newPerson.number };
        return phonebookService
          .updatePerson(id, updatedPerson)
          .then((updatedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : updatedPerson
              )
            )
          )
          .catch((err) => {
            setHasError(true);
            setNotification(
              `Information of  ${newPerson.name} has already been removed from server`
            );
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      } else {
        return;
      }
    }

    phonebookService
      .createPerson(newPerson)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNotification(`Added ${newPerson.name}`);
        setHasError(false);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        setHasError(true);
        setNotification(error.response.data.error);
      });
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      phonebookService
        .deletePerson(id)
        .then(setPersons(persons.filter((p) => p.id !== id)));
    }
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
      <Notification notification={notification} hasError={hasError} />
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
        <Persons persons={filteredPersons} handleDelete={handleDelete} />
      </ul>
    </div>
  );
};

export default App;
