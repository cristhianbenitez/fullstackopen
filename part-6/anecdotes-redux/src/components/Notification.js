import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const visibility = notification.text ? 'block' : 'none';
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visibility
  };
  return <div style={style}>{notification.text}</div>;
};

export default Notification;
