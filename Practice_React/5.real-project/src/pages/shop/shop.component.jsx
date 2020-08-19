import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview';
import './shop.style.css';
import {connect} from 'react-redux';
import {selectShopSections} from '../../redux/shop/shop.selector';
import {createStructuredSelector} from 'reselect';

const ShopPage = ({collection}) => {
    return (
        <div className='shop-page'>
        {
            collection.map( ({id, title, items}) => (
                <CollectionPreview key={id} title={title} items={items}></CollectionPreview>
            ))
        }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collection: selectShopSections
})

export default connect(mapStateToProps)(ShopPage);