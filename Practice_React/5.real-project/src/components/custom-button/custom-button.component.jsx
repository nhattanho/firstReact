import React from 'react';

import './custom-button.style.scss';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => ( //children is always a properties of props object, it between parent Tag
  <button 
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}

  >
    {children}
  </button>
);

export default CustomButton;