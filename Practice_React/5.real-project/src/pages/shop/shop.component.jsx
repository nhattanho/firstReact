import React, {Component} from 'react';
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview';

class ShopPage extends Component {
    state = {
        collection: SHOP_DATA
    };

    render() {
        const {collection} = this.state;
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
}

export default ShopPage;