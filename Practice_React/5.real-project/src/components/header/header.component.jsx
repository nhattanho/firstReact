import React from 'react';
import './header.style.scss';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import {connect} from 'react-redux';

const Header = ({currentUser}) => ( // using destructure to get an object CurrentUser which was updated from App state
   <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'></Logo>
        </Link>

        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
            {console.log(`We are in header file ${currentUser}`)}
            {
                
                currentUser ?
                (<div className='option' onClick={ () => auth.signOut()}> SIGN OUT </div>)
                :
                (<Link className='option' to='/signin'>SIGN IN</Link>)
            }
        </div>

   </div> 
)
// access to the state
const mapStateToProps = state => ({ //state is a object of root reducer, which will call the userReducer to get an CurrentUser which was updated from App state
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(Header); // mapStateToProps is a props of Header, and it returns an object CurrentUser