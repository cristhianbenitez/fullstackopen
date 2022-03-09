import { createSlice } from '@reduxjs/toolkit';


const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVote: (state, action) => {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      const updatedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
      return updatedState;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => action.payload
  }
});

export const { increaseVote, createAnecdote, setAnecdotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
