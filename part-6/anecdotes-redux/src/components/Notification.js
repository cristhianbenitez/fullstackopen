import { connect, useSelector } from 'react-redux';

const Notification = ({ text }) => {
  const visibility = text ? 'block' : 'none';
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visibility
  };
  return <div style={style}>{text}</div>;
};

const mapStateToProps = (state) => state.notification;
const connectedNotification = connect(mapStateToProps)(Notification);
export default connectedNotification;
