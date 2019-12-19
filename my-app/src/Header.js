import React, { Component } from 'react';
import './Header.css';
import backgroundImage from './images/SAC_1.jpg';

const mystyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    height: '100vh'
};

//React.Component
class Header extends Component { 
    render() {
        return (
            <header style={mystyles}>
                
            </header>
        )
    }
}

export default Header;
