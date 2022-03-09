import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { handleVoteIncrease } from '../reducers/anecdotesReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AnecdoteItem = ({
  id,
  content,
  votes,
  handleVoteIncrease,
  handleNotification
}) => {
  const handleVote = () => {
    const updatedAnecdote = { id, content, votes: votes + 1 };
    handleVoteIncrease(updatedAnecdote);
    const notification = `you voted for '${content}'`;
    handleNotification(notification, 10);
  };
  return (
    <div>
      <div key={id}>
        <div>{content}</div>
        <div>
          has {votes}
          <button onClick={handleVote}>vote</button>
        </div>
      </div>
    </div>
  );
};

const mapsDispatchToProps = {
  handleVoteIncrease,
  handleNotification
};

const connectedAnecdoteItem = connect(null, mapsDispatchToProps)(AnecdoteItem);
export default connectedAnecdoteItem;
