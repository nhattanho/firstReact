import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default storage

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']// because the user was handled by authoStateChange by firebase, so we don't need use persist to storage it
}

// console.log('in root reducer');
// export default combineReducers ({
//     user: userReducer,
//     cart: cartReducer
// });

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);