import React from 'react';
import './item.style.scss';

const Item = ( {title, url, id, ...otherProps} ) => {
    return (
        <div className='item'>
            <figure className='results_fig'>
                <img src={url} alt={title}/>
            </figure>
            <div className='description'>
                <h4>{title}</h4>
                <p>{otherProps.publisher}</p>
            </div>
        </div>
    );
};

export default Item;