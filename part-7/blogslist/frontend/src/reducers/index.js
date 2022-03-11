import { combineReducers } from 'redux';
import blogReducer from './blogSlice';
import notificationReducer from './notificationSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
  users: usersReducer,
});

export default rootReducer;
