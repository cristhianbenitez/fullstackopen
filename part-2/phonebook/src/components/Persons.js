import React from 'react';

const Persons = ({ persons, handleDelete }) =>
  persons.map(({ name, number, id }) => (
    <li key={name}>
      {name}
      &nbsp;
      {number}
      &nbsp;
      <button onClick={() => handleDelete(id)}>delete</button>
    </li>
  ));

export default Persons;
