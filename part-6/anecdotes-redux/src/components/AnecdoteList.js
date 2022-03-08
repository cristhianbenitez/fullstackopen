import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseVote } from '../reducers/anecdotesReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const { anecdotes, filterInput } = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(increaseVote(id));
    const notification = `you voted for '${content}'`;
    dispatch(handleNotification(notification));
  };

  const sortedAnecdotes = anecdotes.concat().sort((a, b) => b.votes - a.votes);

  const filteredAnecdotes = sortedAnecdotes.filter((a) =>
    a.content.toLowerCase().includes(filterInput.toLowerCase())
  );

  return (
    <>
      {filteredAnecdotes.map(({ id, content, votes }) => (
        <div key={id}>
          <div>{content}</div>
          <div>
            has {votes}
            <button onClick={() => vote(id, content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
