import React from 'react';
import './checkout-item.styles.scss';
// import {selectCartItems} from '../../redux/cart/cart.selector';
// import {connect} from 'reselect';
import {clearItem} from '../../redux/cart/cart.actions';
import {removeItem, addItem} from '../../redux/cart/cart.actions';
import {connect} from 'react-redux';

const CheckoutItem = ({item, clearItem, removeItem, addItem}) => {
    const {name, imageUrl, price, quantity} = item;  
    console.log(`I am in CheckoutItem ${quantity}`);
    return(
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item' />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={() => removeItem(item) }>&#10094;</div>
            {quantity}
            <div className='arrow' onClick={() => addItem(item)}>&#10095;</div>
        </span>
        <span className='price'>{price}</span>
        {/* Using the arrow function as below just means we are referencing the function, not call directly this function */}
        <span onClick={() => clearItem(item)} className='remove-button'>&#10005;</span>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItem(item)),
    removeItem: item => dispatch(removeItem(item)),
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem); 
// const mapStateToProps = () => ({
//     cartItems: selectCartItems
// })

// export default connect(mapStateToProps)(CheckoutItem);