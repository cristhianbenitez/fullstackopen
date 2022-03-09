import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: ''
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification: (state, action) => {
      const newNotification = { text: action.payload.text };
      return (state = newNotification);
    },
    removeNotification: (state) => (state = initialState)
  }
});

export const handleNotification =
  (text, seconds = 5) =>
  (dispatch) => {
    const milliseconds = seconds * 1000;
    dispatch(createNotification({ text }));
    setTimeout(() => dispatch(removeNotification()), milliseconds);
  };

const { createNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
