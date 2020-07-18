import React, {Component} from 'react'; //it is library supporting to write the html in javascript <=> JSX
import logo from './logo.svg'; // logo just likes a variable
import './App.css';
import { CardList } from './components/card-list/cardlist'
//JSX
class App extends Component { // class App extends React.Component {}
/*
  state = {
    monsters: [
      {
        name: 'Number 1',
        id: 1
      },
      {
        name: 'Number 2',
        id: 2
      },
      {
        name: 'Number 3',
        id: 3
      }
    ]
  };
*/
  state = {
    monsters: []
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => {
      return res.json();
    })
    .then(users => {
      console.log(users); //user is an array of objects
      this.setState({monsters: users});
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App"> 
        <CardList name='NhatHo'>
        {
          this.state.monsters.map( monster => 
            (<h1 key={monster.id}> {monster.name} </h1>)
          )
        }
        </CardList>
        {/*
          this.state.monsters.map( monster => 
            (<h1 key={monster.id}> {monster.name} </h1>)
          )
          //this.state.monsters.map(curr => curr.name)
          */}
    </div>
    )
  }
}
export default App;
