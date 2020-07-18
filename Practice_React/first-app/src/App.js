import React, {Component} from 'react'; //it is library supporting to write the html in javascript <=> JSX
import logo from './logo.svg'; // logo just likes a variable
import './App.css';

//JSX
class App extends Component {
  state = {
    string: 'honhattan'
  };
  render() {
    return (
      <div className="App"> 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{this.state.string}<code>src/App.js</code> and save to reload.</p>
        <button onClick={()=>{ this.setState({string: 'My name is honhattan'})}}>Change</button>
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
    )
  }
}
export default App;
