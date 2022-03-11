import React from 'react';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

export const Notification = () => {
  const { message, status } = useSelector((state) => state.notification);
  const variantController = status === 'success' ? 'success' : 'danger';
  const hasMessage = message.length > 0;

  const styles = {
    notification: {
      display: hasMessage ? 'flex' : 'none',
      width: '100%',
      justifyContent: 'center',
      fontSize: '1.5rem',
      padding: '.5em',
    },
  };
  return (
    <Alert style={styles.notification} variant={variantController}>
      {message}
    </Alert>
  );
};
