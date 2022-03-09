import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdotesReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AnecdotesForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';

    props.createNewAnecdote(anecdote);
    const notification = `you created '${anecdote}'`;
    props.handleNotification(notification);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <br />
        <button>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = { createNewAnecdote, handleNotification };

const connectedAnecdotesForm = connect(null, mapDispatchToProps)(AnecdotesForm);
export default connectedAnecdotesForm;
