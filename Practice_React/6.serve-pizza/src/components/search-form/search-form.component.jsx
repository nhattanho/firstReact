import React from 'react';
import './search-form.style.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const SearchForm = ({handleInput, handleButton, typeButton, typeInput}) => (
    <div className='search-form'>
        <form onSubmit={handleButton}>
            <FormInput 
                type={typeInput}
                checkOnchange={handleInput}
                placeholder='Search' 
                required
            />
            <Button type={typeButton}> Search </Button>
        </form>
    </div>    
);
export default SearchForm;
