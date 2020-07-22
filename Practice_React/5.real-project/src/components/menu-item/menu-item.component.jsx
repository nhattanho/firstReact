import React from 'react';
import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size}) => ( // object props now includes {title}
    <div  
         className={ `menu-item ${size}` } // <=> {size + 'menu-item'}
    > 
        <div 
            style={ // use for js
                { //use for object
                    backgroundImage: `url(${imageUrl})` // <=> 'url(' + imageUrl + ')'
                }
                }  
            className='background-image'
        />

        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default MenuItem;

