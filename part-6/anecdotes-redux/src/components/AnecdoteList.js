import React from 'react';
import { connect } from 'react-redux';
import AnecdoteItem from './AnecdoteItem';

const AnecdoteList = (props) => {
  return (
    <>
      {props.sortedAndFilteredAnecdotes.map(({ id, content, votes }) => (
        <AnecdoteItem key={id} id={id} content={content} votes={votes} />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  const regex = new RegExp(`^${state.filterInput}`, 'i');
  const sortedAndFilteredAnecdotes = [...state.anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .filter((a) => regex.test(a.content));
  return { sortedAndFilteredAnecdotes };
};

const connectedAnecdoteList = connect(mapStateToProps)(AnecdoteList);

export default connectedAnecdoteList;
