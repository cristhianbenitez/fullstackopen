import { createSlice } from '@reduxjs/toolkit';
import anecdotes from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVote: (state, action) => {
      const updatedAnecdote = action.payload;
      const updatedState = state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
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

export const initializeAnecdotes = () => async (dispatch) => {
  const allAnecdotes = await anecdotes.getAll();
  dispatch(setAnecdotes(allAnecdotes));
};

export const createNewAnecdote = (anecdote) => async (dispatch) => {
  const newAnecdote = await anecdotes.createNew(anecdote);
  dispatch(createAnecdote(newAnecdote));
};
export const handleVoteIncrease = (anecdote) => async (dispatch) => {
  const id = anecdote.id;
  const newAnecdote = await anecdotes.update(id, anecdote);
  dispatch(increaseVote(newAnecdote));
};

export default anecdotesSlice.reducer;
