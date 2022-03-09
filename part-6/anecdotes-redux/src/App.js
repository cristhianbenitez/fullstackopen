import { useEffect } from 'react';

import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { connect } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdotesReducer';

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

const connectedApp = connect(null, { initializeAnecdotes })(App);
export default connectedApp;
