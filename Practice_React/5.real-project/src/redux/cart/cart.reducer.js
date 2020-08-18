import CartActionTypes from './cart.types';
import {addItemsToCart} from './cart.utils';
import {clearItemsToCart} from './cart.utils';
import {removeItem} from './cart.utils';

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
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: clearItemsToCart(state.cartItems, action.payload)
            }
            case CartActionTypes.REMOVE_ITEM:
                return {
                    ...state,
                    cartItems: removeItem(state.cartItems, action.payload)
                }
        default:
            return state;
    }
}
export default cartReducer;
