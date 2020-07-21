import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  //Using ES7 ==> It is shorter than using ES6. And props passed from file index.js will automatically be understood in this file
  // state = {
  //   number: 50
  // };

  //=> Come back to use ES6 with passing the props from the index.js
  // constructor(props){ 
  //   super(props);
  //   this.state = {
  //     number: 50
  //   };
  //   this.props = props;
  // }

  //=> Come back to use ES6, with don't need to pass props
  // constructor(){
  //   super();
  //   this.state = {
  //     //number: 50 + this.props.incre ==> wrong, even though the props will be automatically understood by this file, but if we want to use in the constructor
  //     //we have to pass it into the constructor function, like the code as below:
  //     number: 50
  //   };
  // }

  /* First way:*/
  // constructor(props){ 
  //   super(props); // when we call the props in super constructor, the command this.props = props will be conducted in the super function automatically
  //   this.state = {
  //     number: 50 + this.props.incre
  //   };
  // }

  /* Second way:*/
  // constructor(props){ 
  //   super(); // if we call super function without the arguments, so we just get all the component functions from the Components class
  //   this.props = props;// not for assigning props for this.props, so we have do it manually as this line
  //   this.state = {
  //     number: 50 + this.props.incre
  //   };
  // }

  //However, with ES7, we don't need to pass the props, it will handle all of things for us:
  state = {
    number: 50 + this.props.incre // props is equal level with state, and we are in the method of state object, so we need
    //to use "this" to point the props ==> make sense!
  };
  
  // handleChange = ()=>{
  //     this.setState({number: this.state.number + this.props.incre}, ()=> { // function setState work in background <=> asynchronous
  //     console.log(this.state.number);
  // })};

  // with setState,we can pass a function which likes a callback funtion, we can get an example as below:
  handleChange = ()=>{
    this.setState( (stateAr, propsAr) => { // stateAr <=> this.state, propsAr <=> this.props
      return {number: stateAr.number + propsAr.incre}; // have to return an object to update for the state
    }, () => {
      console.log(this.state.number);
    } );
  };
    
  //   /*
  //   this.setState({number: this.state.number+1});
  //   console.log(`this.state.number outside of setState: ${this.state.number}`);
  //   */
  // 
    

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>{this.state.number}</p>
          {/*tring(this.state.number)*/}
          <button onClick={this.handleChange}> Click Me </button>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
export default App;
