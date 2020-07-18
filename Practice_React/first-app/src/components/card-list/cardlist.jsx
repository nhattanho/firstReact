import React from 'react';
import './cardlist.style.css';

export const CardList = (props) => {
    console.log(props);
    return (<div className='cardlist'> {props.children} </div>); //props.name just print the props having name = Nhat Ho
    // but the props.children will print all infor of its props
}