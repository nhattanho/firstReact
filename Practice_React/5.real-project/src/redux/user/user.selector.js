import {createSelector} from 'reselect';

const selectUser = (state) => state.user;
const selectCart = state => state.cart;
export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)

export const selectHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)