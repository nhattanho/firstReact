import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import {connect} from 'react-redux';
import {selectCartItems} from '../../redux/cart/cart.selector';
import {withRouter} from 'react-router-dom';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

const CartDropDown = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'> 
            {
                cartItems.length ?
                cartItems.map( item => (
                    <CartItem key={item.id} item={item}/>
                )) :
                (<span className='empty-message'>Your cart is empty</span>)
            }
        </div>
        <CustomButton onClick={ ()=> {
            history.push('/checkout');
            dispatch(toggleCartHidden())}   
        }>GO TO CHECKOUT</CustomButton>
    </div>
);



// const mapStateToProps = ({cart: {cartItems} }) => ({cartItems: cartItems})
const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})

/*Note: if we use this way, so in the parent component of this component has to pass the props, just like
<CartDropDown ...props /> ==> in the CartDropDown component we can get the history or match props.
However, now we are using the Redux with getting the props by using mapStateToProps, so we can do like
this way, we have to use the withRouter to get the history and match from its parent. 
The normal way:
********************************************************
export default connect(mapStateToProps)(CartDropDown);
********************************************************

The Redux way:
/********************************************************************/
export default withRouter(connect(mapStateToProps)(CartDropDown));
//using withRouter can get history and match from the parent component
/* Note: if we have mapDispatchToProps() function, then we will export the function with 2 paramters like:
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
However, in this case we only passed one parameter which is mapStateToProps, so the rest parameter will
automatically pass, so in the CartDropDown component, it has a dispatch props already. So we just use 
directly this props instead of making the new mapDispatchToProps() function while the toogleHiddenCart
has been create by the other action. */
