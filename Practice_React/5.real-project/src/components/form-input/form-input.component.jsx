import React, { Component } from 'react';
import './form-input.style.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => ( //props has handleChange, label and child prop: otherProps is also an object , now otherProps includes name, type, value, label
  <div className='group'>
      <input className='form-input' onChange={handleChange} {...otherProps} />
      {/*
        console.log(otherProps)
        Object { name: "email", type: "email", value: "", required: true }
        Object { name: "password", type: "password", value: "", required: true }
      */}
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