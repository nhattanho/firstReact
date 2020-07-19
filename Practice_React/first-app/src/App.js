import React, {Component} from 'react'; //it is library supporting to write the html in javascript <=> JSX
import logo from './logo.svg'; // logo just likes a variable
import './App.css';
import { CardList } from './components/card-list/cardlist'
import { SearchBox } from './components/search/searchbox'

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
    monsters: [],
    searchField: ''
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => {
      return res.json();
    })
    .then(users => {
      console.log(users); //user is an array of objects
      this.setState({monsters: users});//=> monsters is an array objects
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const {monsters, searchField } = this.state;
    const filterMonsters = monsters.filter( monster => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase()); // return an array contains all elements satisfying the include method 
    });//in the first time, the searchField = '', so the filterMonsters = this.state.monsters;
    return (
      <div className="App"> 

        <SearchBox 
          placeholder='search monster' 
          handleChange={ e => this.setState({searchField: e.target.value}) }
        />

        <CardList monsters={filterMonsters}></CardList>
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
