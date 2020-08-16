import CartActionTypes from './cart.types';
import {addItemsToCart} from './cart.utils';

const INITIAL_STATE = { //state of each reducer
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    console.log('In cart reducer');
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemsToCart(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}
export default cartReducer;
