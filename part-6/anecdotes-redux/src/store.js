import { configureStore } from '@reduxjs/toolkit';

import anecdotesReducer from './reducers/anecdotesReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filterInput: filterReducer
  }
});

export default store;
