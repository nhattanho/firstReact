import React from 'react';
import './homepage.styles.scss'
import Directory from '../../components/directory/directory.component';

export const HomePage = () => (
    <div className='homepage'>
    <h1>Welcome to my HomePage</h1>
    <Directory></Directory>  
    </div>
);
