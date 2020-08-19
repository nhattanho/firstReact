import React from 'react'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import CollectionPreview from '../collection-preview/collection-preview';
import {selectShopSections} from '../../redux/shop/shop.selector';

const CollectionOverview = ({collections}) =>{
    return (
        <div className='collections-overview'>
        {
            collections.map( ({id, title, items}) => (
                <CollectionPreview key={id} title={title} items={items}></CollectionPreview>
            ))
        }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collections: selectShopSections
})

export default connect(mapStateToProps)(CollectionOverview);