import React from 'react';

const Anecdote = ({ anecdote, vote }) => {
  const handleVote = () => {
    vote(anecdote.id);
  };
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <span>has {anecdote.votes} votes </span>
      <button onClick={handleVote}>Vote</button>
      <p>
        for more info see <a href={anecdote.info}> {anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
