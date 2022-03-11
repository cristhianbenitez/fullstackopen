import { createSlice } from '@reduxjs/toolkit';
import { usersService } from '../services';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers: (state, action) => action.payload,
  },
});

export const { setAllUsers } = usersSlice.actions;

export const getAllUsers = () => async (dispatch) => {
  const allUsers = await usersService.getAll();
  dispatch(setAllUsers(allUsers));
};

export default usersSlice.reducer;
