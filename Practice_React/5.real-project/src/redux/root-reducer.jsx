import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

console.log('in root reducer');
export default combineReducers ({
    user: userReducer,
    cart: cartReducer
});