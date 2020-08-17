import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectorCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce( (accumulate, item) => accumulate + item.quantity, 0
))