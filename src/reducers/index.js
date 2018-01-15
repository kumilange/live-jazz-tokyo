import { combineReducers } from 'redux';
import user from './user';
import event from './event';
import pay from './pay';

export default combineReducers({
  user,
  event,
  pay,
});
