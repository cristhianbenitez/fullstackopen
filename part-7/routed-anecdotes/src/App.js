import { useState } from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';

import About from './components/About';
import Anecdote from './components/Anecdote';
import AnecdoteList from './components/AnecdoteList';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Menu from './components/Menu';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);
    console.log(id);
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>
        <Link to="/">Software anecdotes</Link>
      </h1>
      <Menu />
      <p>{notification}</p>
      <Routes>
        <Route path="/" element={<h1>Hello! check this app </h1>} />
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} vote={vote} />}
        />
        <Route path="about" element={<About />} />
        <Route
          path="create"
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
