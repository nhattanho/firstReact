import {createSelector} from 'reselect';

 const selectShop = state => state.shop;

 export const selectShopSections = createSelector(
    [selectShop],
    (shop) => shop.collections
);