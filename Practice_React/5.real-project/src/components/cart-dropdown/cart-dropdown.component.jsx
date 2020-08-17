import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import {connect} from 'react-redux';
import {selectCartItems} from '../../redux/cart/cart.selector';

const CartDropDown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'> 
            {
                cartItems.map( item => (
                    <CartItem key={item.id} item={item}/>
                ))
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

// const mapStateToProps = ({cart: {cartItems} }) => ({cartItems: cartItems})
const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})



export default connect(mapStateToProps)(CartDropDown);

