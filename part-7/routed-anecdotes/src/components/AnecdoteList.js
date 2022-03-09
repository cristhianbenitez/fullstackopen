import React from 'react';
import { Link } from 'react-router-dom';

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(({ content, id }) => (
        <li key={id}>
          <Link to={`/anecdotes/${id}`}>{content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
