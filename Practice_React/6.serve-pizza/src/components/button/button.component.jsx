import React from 'react';
import './button.style.scss'
import { ReactComponent as Icon} from '../../assets/icon.svg';

const Button = ({children, ...otherProps}) => (
    <div className='buttonIcon'>
        <Icon className='icon'></Icon>

        <button className='button' {...otherProps}>
            {children}
        </button>
    </div>
    
);

export default Button;