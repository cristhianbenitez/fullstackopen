import { useEffect } from 'react';

import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdotes from './services/anecdotes';
import { useDispatch } from 'react-redux';
import { setAnecdotes } from './reducers/anecdotesReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllAnecdotes = async () => {
      const allAnecdotes = await anecdotes.getAll();
      dispatch(setAnecdotes(allAnecdotes));
    };
    getAllAnecdotes();
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

export default App;
