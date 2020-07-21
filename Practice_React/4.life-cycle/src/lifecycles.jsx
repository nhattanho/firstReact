import React, {Component} from 'react';

class Lifecycle extends Component {
    // constructor() {
    //   super();
    //   console.log(constructor); // run in the first time
    // }
    text1 = console.log('constructor lifecycles'); // run in the first time
    state = {
        
    };

    // this component will be called when the everything mounted
    componentDidMount() { 
      console.log('DidMount'); // third time
    }
  
    // the udating finish
    componentDidUpdate() { // 4th time => re-render
      console.log('DidUpdate');
    }
  
    //Will call when react doesn't what exactly going on
    componentWillUnmount() {
      console.log('WillUnmount');
    }
  
    // Will be called whenever having props lifecycle's change, the props of lifecycle is a text of app class
    shouldComponentUpdate(nextProps, nextState) { //nextProps is the state it got from the app class
        console.log('shouldComponentUpdate', nextProps);//console.log('shouldComponentUpdate' + nextProps.text);
        return true;
    }

    // shouldComponentUpdate(nextProps, nextState) { //nextProps is the state it got from the app class
    //     console.log('shouldComponentUpdate');
    //     console.log(this.props.text); //just checking original text props of lifecycle class, in the first time when lifecycle was mounted
    //     console.log(nextProps.text);
    //     // the original text of app class wil be '' ==> the original text of lifecycles class also be equal ''
    //    //console.log('shouldComponentUpdate' + nextProps.text);
    //     if (nextProps.text !== this.props.text) return true;
    //     else return false;
    // }
  
    //Whenver having a change
    render () {
        console.log('render lifecycles'); // second time
        return (
            <div className='lifecycles'>
                <h3>LIFE CYCLE COMPONENTS</h3>
                {this.props.text}
            </div>
        )
    }
}

export default Lifecycle;