import React from 'react';
import './list-items.style.scss';
import Item from '../item/items.component';

const ListItems = ( {items} ) => (
    <React.Fragment>
          {
              items.map( ({title, image_url,recipe_id, ...otherProps}) => (
                <Item key={recipe_id} title={title} url={image_url} id={recipe_id} {...otherProps}>
                </Item>
              ))
          }  
    </React.Fragment>
);

export default ListItems;