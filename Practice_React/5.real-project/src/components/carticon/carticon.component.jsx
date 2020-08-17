import React from 'react';
import { ReactComponent as ShoppingIcon} from '../../components/assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectorCartItemsCount} from '../../redux/cart/cart.selector';

const CartIcon = ({toggleCartHidden, number}) => {
    {console.log('I am being called')}
    return (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{number}</span>
    </div>)
};

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: ()=> dispatch(toggleCartHidden())
})

/* This is the first way to count the number of clothes 
const mapStateToProps = ({cart}) => {
    let cartItems = cart.cartItems;
    console.log(cartItems);
    let number = 0;
    cartItems.forEach(item => {
        number = number + item.quantity;
        console.log(number);
    });
    return {
        number: number
    }
}
*/

// /* The second way */
// const mapStateToProps = ({cart: {cartItems}}) => {
//     /*Note: console.log('I am being called');
//     Because this component receives a root state as a props, so whenever the state changed
//     always make this component re-render. However, the root state contains all the objects
//     of all actions. So, if the other component calls its action that make the state change,
//     also make this component re-render as well even it doesn't call any action ==> it's not
//     a good design for our system.  ==> we need to use the selector - reselect library to make
//     sure it will be call or re-render for its action only, and is not affected by the orther
//     action.

//     */
//     return ({
//         number: cartItems.reduce( (accumulate, item) => accumulate + item.quantity, 0 
//     )}
// )}

/* The third way is using the reselect library */
const mapStateToProps = (state) => {
    //console.log('I am being called');   
    return ({
    number: selectorCartItemsCount(state)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

