import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdotesReducer';
import { handleNotification } from '../reducers/notificationReducer';
import anecdotes from '../services/anecdotes';

const AnecdotesForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';

    const newAnecdote = await anecdotes.createNew(anecdote);
    dispatch(createAnecdote(newAnecdote));

    const notification = `you created '${anecdote}'`;
    dispatch(handleNotification(notification));
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

export default AnecdotesForm;
