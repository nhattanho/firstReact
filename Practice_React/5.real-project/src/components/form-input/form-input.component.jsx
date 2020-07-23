import React, { Component } from 'react';
import './form-input.style.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => ( //props has handleChange, label and child prop: otherProps is also an object
    <div className='group'>
      <input className='form-input' onChange={handleChange} {...otherProps} />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
  
  export default FormInput;