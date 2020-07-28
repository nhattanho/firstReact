import React from 'react';
import './form-input.style.scss'

const FormInput = ( {checkOnchange, ...otherProps} ) => (
    <div className='form-input'>
        {/*input is real DOM, so it have to take all the properties from the virtual DOM through ...otherProps*/}
        <input className='input' onChange={checkOnchange} {...otherProps}/>
    </div>
);

export default FormInput;

