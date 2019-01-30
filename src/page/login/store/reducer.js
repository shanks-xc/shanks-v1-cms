import {
  fromJS
} from 'immutable';
import * as constants from './constants';
const isAuthen = sessionStorage.isAuthen ? JSON.parse(sessionStorage.isAuthen) : false
const defaultState = fromJS({
  isAuthen: isAuthen
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.LOGIN_IS_AUTHEN:
      sessionStorage.setItem('isAuthen', action.value)
      return state.set('isAuthen', action.value);
    default:
      return state;
  }
}
