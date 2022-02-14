import React from 'react';

const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <h2>Add a new</h2>
    <div>
      name:
      <input
        type="text"
        values={props.newName}
        onChange={props.handleNewName}
      />
      phone:
      <input
        type="text"
        values={props.newPhone}
        onChange={props.handleNewPhone}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
