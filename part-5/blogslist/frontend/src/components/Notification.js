import React from 'react';

const Notification = ({ message }) => {
  if (message.errorMessage)
    return (
      <span style={styles.errorMessage} id="error-message">
        {message.errorMessage}
      </span>
    );
  if (message.successMessage)
    return (
      <span style={styles.successMessage} id="success-message">
        {message.successMessage}
      </span>
    );
  return '';
};

const styles = {
  errorMessage: {
    display: 'block',
    color: 'red',
    fontSize: '1.5rem',
    padding: '.5em',
    border: '2px solid red'
  },
  successMessage: {
    display: 'block',
    color: 'green',
    fontSize: '1.5rem',
    padding: '.5em',
    border: '2px solid green'
  }
};
export default Notification;
