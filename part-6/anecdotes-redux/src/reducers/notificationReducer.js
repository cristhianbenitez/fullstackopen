import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  status: 'SUCCESS'
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification: (state, action) => {
      const newNotification = {
        text: action.payload.text,
        status: action.payload.status
      };
      return (state = newNotification);
    },
    removeNotification: (state) => (state = initialState)
  }
});

export const handleNotification =
  (text, status = initialState.status) =>
  (dispatch) => {
    dispatch(createNotification({ text, status }));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

const { createNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
