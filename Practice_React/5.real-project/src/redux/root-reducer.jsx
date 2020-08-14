import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';

console.log('in root reducer');
export default combineReducers ({
    user: userReducer
});