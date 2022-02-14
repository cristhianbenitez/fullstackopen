import React from 'react';

const Persons = ({ persons }) =>
  persons.map(({ name, phone }) => (
    <li key={name}>
      {name}
      &nbsp;
      {phone}
    </li>
  ));

export default Persons;
