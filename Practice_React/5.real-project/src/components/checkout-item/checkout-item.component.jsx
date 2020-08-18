import React from 'react';
import './checkout-item.styles.scss';
// import {selectCartItems} from '../../redux/cart/cart.selector';
// import {connect} from 'reselect';

const CheckoutItem = ({item: {name, imageUrl, price, quantity}}) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item' />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>{quantity}</span>
        <span className='price'>{price}</span>
        <span className='remove-button'>&#10005;</span>
    </div>
)

export default CheckoutItem;
// const mapStateToProps = () => ({
//     cartItems: selectCartItems
// })

// export default connect(mapStateToProps)(CheckoutItem);