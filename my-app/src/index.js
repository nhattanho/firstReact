import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import Navigation from './Components/Navigation'; // Same thing to ./Navigation.js
import Header from './Components/Header';
import Clock from './Components/Clock';
import Services from './Components/Services';
import * as serviceWorker from './Components/serviceWorker';

class App extends Component {
    render(){
        return(
            <div>
                <Navigation logoTitle="CS Community"/>
                <Header title="This is website for computer science students at SAC"/>
                <Clock />
                <Services />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
