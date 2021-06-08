import { useSelector } from 'react-redux';
import Toast from './Toast';

function NofiticationCenter () {
  const state = useSelector(state => state.notificationReducer);

  return (
    <div className='notification-container top-right'>
      {
      state.notifications.map((n) =>
        <Toast key={n.uuid} text={n.message} dismissTime={n.dismissTime} />
      )
    }
    </div>
  );
}

export default NofiticationCenter;
