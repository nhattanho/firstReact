import React from 'react';
import './menu-item.styles.scss';
import {withRouter} from 'react-router-dom';

//props now is {title, imageUrl, size, history}, history is a default property of this component
const MenuItem = ({title, imageUrl, size, linkUrl, history, match}) => {
    return ( // object props now includes {title}
    <div  
        className={ `menu-item ${size}` } // <=> {size + 'menu-item'}
        onClick={ () => history.push(`${match.url}${linkUrl}`)} ////url is a original path was passed into previous components
        // <=> onCick={history.push('./hat')} 
    > 
        <div 
            style={ // use for js
                { //use for object
                    backgroundImage: `url(${imageUrl})` // <=> 'url(' + imageUrl + ')'
                }
                }  
            className='background-image'
        />

        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
    );
}

export default withRouter(MenuItem);//return a super power component with the same name MenuItem and its neccessary properties

