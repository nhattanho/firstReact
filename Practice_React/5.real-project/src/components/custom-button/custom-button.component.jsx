import React from 'react';

import './custom-button.style.scss';

const CustomButton = ({ children, ...otherProps }) => ( //children is always a properties of props object
  <button className='custom-button' {...otherProps}>
    {children}
  </button>
);

export default CustomButton;