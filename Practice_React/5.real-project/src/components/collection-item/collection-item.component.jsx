import React from 'react';
import './collection-item.style.scss';
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';
import {addItem} from '../../redux/cart/cart.actions';

const Collection = ({item, addItem}) => {
    
    const { name, price, imageUrl} = item;
    return (
        <div className='collection-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{`${price}$`}</span>
            </div>
            <CustomButton onClick={()=> addItem(item)} className='custom-button' inverted> Add to cart</CustomButton>
        </div>
    )}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)) //dispatch to pass an object into store
})

export default connect(null, mapDispatchToProps)(Collection);