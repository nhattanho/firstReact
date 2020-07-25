import React, { Component } from 'react';
import './signin.style.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    };

    handleSubmit = event => {
        event.preventDefault();
    
        this.setState({ email: '', password: '' });
    };
    
    handleChange = event => {
        const { value, name } = event.target; // event.target will return an object
        /* Example: {
                        value: 'honhattan2411@gmail.com',
                        name: 'email'               
                    } 
            or
                    {
                        value: '12345',
                        name: 'password'
                    }

            ==> if name = 'email', then value = 'honhattan2411@gmail.com', and name = 'password'
            then value = '12345'
        */
        this.setState({ [name]: value }); // look back to the newscript.js in section 8.Advanced Object and Function
        /*Note
        this.setState({[name]: value}) <=> this.setState( () => {
            state[name] = value; 
            // because name is 'email' or 'password' ==> state[name] <=> state['email'] or state['password]
            //==> state['email'] = 'honhattan2411@gmail.com
            //==> state['password'] = '12345'
            //==> this is the way to set the value for properties of object when we don't know exactly
            //what properties we will set up, or the properties, which will be setup, was passed by users.
        })        
        */
    };
    
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label='email'
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='password'
                        required
                    />
                    <div className='buttons'> 
                        <CustomButton type='submit'> Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} type='submit' isGoogleSignIn> Sign in with Google </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
};
    
export default SignIn;