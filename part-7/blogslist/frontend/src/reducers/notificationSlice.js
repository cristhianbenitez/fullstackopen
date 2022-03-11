import { createSlice } from '@reduxjs/toolkit';

const initialState = { message: '', status: '' };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => ({
      message: action.payload.message,
      status: action.payload.status || 'success',
    }),
  },
});

export const { setNotification } = notificationSlice.actions;

export const handleNotification = (message, status) => (dispatch) => {
  dispatch(setNotification({ message, status }));
  setTimeout(() => {
    dispatch(setNotification({ message: '', status: '' }));
  }, 5000);
};

export default notificationSlice.reducer;
