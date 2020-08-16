import React from 'react';
import './collection-preview.style.scss';
import Collection from '../collection-item/collection-item.component';

const CollectionPreview = ({title, items}) => {
    return (
        <div className='collection-preview'>
            <h1 className='title'>{title.toUpperCase()} </h1>
            <div className='preview'>
                { 
                    items
                    .filter( (item,index) => index < 4 )
                    .map( item => (
                    <Collection key={item.id} item={item}></Collection>
                    )) 
                }

            </div>
        </div>
    )
}

export default CollectionPreview;