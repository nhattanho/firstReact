import React from 'react';
import './signin-signup.style.scss';
import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/sign-up/signup.component';

const SigninSignupPage = () => (
    <div className='sign-in-sign-up'>
        <SignIn/>
        <SignUp/>
    </div>
);

export default SigninSignupPage;