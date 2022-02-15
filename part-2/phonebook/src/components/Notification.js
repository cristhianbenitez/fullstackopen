import React from 'react';

const Notification = ({ notification, hasError }) => {
  if (!notification) return <></>;
  const textStyle = hasError ? 'error' : 'success';
  return (
    <div className={`notification ${textStyle}`}>
      <span className="notification-text">{notification}</span>
    </div>
  );
};
export default Notification;
