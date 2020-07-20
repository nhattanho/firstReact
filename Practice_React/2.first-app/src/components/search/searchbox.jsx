import React from 'react';
import './searchbox.style.css'

//props is an object so if we pass directly the argument into module likes below, we have to put them
// inside {}
export const SearchBox = ({ placeholder, handleChange }) => (
  
    <input 
        className='search' 
        type='search' 
        placeholder={placeholder} 
        onChange={handleChange}/>
);

/* the same code as below
export const SearchBox = ({ placeholder, handleChange }) => {
    return (
        <input 
        className='search' 
        type='search' 
        placeholder={placeholder} 
        onChange={handleChange}/>
    )
};
*/
/* The code below also the same as above
export const SearchBox = (props) => (
  
    <input 
        className='search' 
        type='search' 
        placeholder={props.placeholder} 
        onChange={props.handleChange}/>
);
*/
    

