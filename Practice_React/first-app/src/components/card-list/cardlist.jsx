import React from 'react';
import './cardlist.style.css';
import { Card } from '../card/cardshow';

//props is an object containing all properties which was passed in the CardList function
//==> all properties are likely the methods of props object
export const CardList = (props) => {
    //console.log(props);
    return (
        <div className='cardlist'> 
            {props.monsters.map( monster => 
                (<Card key={`${monster.id}`} monster={monster}> </Card>)
            )} 
        </div>
    );
};

