// import {combineReducers} from 'redux-immutable';
import {combineReducers} from 'redux';
import {reducer as loginReducer} from '../page/login/store';

const reducer = combineReducers ({
  login: loginReducer,
});

export default reducer;
