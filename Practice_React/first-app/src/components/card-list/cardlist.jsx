import React from 'react';
import './cardlist.style.css';
import { Card } from '../card/cardshow';

export const CardList = (props) => {//props is all properties which was passed in the CardList function
    //console.log(props);
    return (
        <div className='cardlist'> 
            {props.monsters.map( monster => 
                (<Card key={`${monster.id}`} monster={monster}> </Card>)
            )} 
        </div>
    );
};

