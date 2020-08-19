import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview';
import './shop.style.css';
import CollectionOverview from '../../components/collections.overview/collections.overview.jsx';

const ShopPage = () => {
    return (
        <div className='shop-page'>
            <CollectionOverview/>
        </div>
    );
};

export default ShopPage;