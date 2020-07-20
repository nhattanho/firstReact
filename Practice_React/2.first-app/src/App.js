import React, {Component} from 'react'; //it is library supporting to write the html in javascript <=> JSX
import logo from './logo.svg'; // logo just likes a variable
import './App.css';
import { CardList } from './components/card-list/cardlist'
import { SearchBox } from './components/search/searchbox'

/*******************************The first way to do App.js****************************************/
//JSX
// class App extends Component { // class App extends React.Component {}
// /*
//   state = {
//     monsters: [
//       {
//         name: 'Number 1',
//         id: 1
//       },
//       {
//         name: 'Number 2',
//         id: 2
//       },
//       {
//         name: 'Number 3',
//         id: 3
//       }
//     ]
//   };
// */
//   state = {
//     monsters: [],
//     searchField: ''
//   }

//   // life cycle component
//   componentDidMount() {
//     fetch('http://jsonplaceholder.typicode.com/users')
//     .then(res => {
//       return res.json();
//     })
//     .then(users => {
//       console.log(users); //user is an array of objects
//       this.setState({monsters: users});//=> monsters is an array objects
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }

//   render() {
//     const {monsters, searchField } = this.state;
//     const filterMonsters = monsters.filter( monster => {
//       return monster.name.toLowerCase().includes(searchField.toLowerCase()); // return an array contains all elements satisfying the include method 
//     });//in the first time, the searchField = '', so the filterMonsters = this.state.monsters;
//     return (
//       <div className="App"> 

//         <SearchBox 
//           placeholder='search monster' 
//           handleChange={ e => this.setState({searchField: e.target.value}) }
//         />

//         <CardList monsters={filterMonsters}></CardList>
//         {/*
//           this.state.monsters.map( monster => 
//             (<h1 key={monster.id}> {monster.name} </h1>)
//           )
//           //this.state.monsters.map(curr => curr.name)
//           */}
//     </div>
//     )
//   }
// }
// export default App;

/*******************************The second way to do App.js************************************/
class App extends Component { // class App extends React.Component {}

  state = {
    monsters: [],
    searchField: ''
  }

  // constructor() {
  //   super();
  //   this.state = {
  //     monsters: [],
  //     searchField: ''
  //   };
  // }
  
  //ES7 but don't use arrow function
  // handleChange = function(even) {
  //   return this.setState({searchField: even.target.value});
  // }.bind(this);

  //ES7 but don't use arrow function
  // handleChange = function(even) {
  //   console.log(this);
  //   return this.setState({searchField: even.target.value});
  // };
  
  // //ES7 and use arrow function
  // handleChange = even => {
  //     return this.setState({searchField: even.target.value});
  // }

  //ES6

  handleChange = this.handleChange.bind(this); //only add this line when we use: handleChange={this.handleChange}
  handleChange(even) {
    return this.setState({searchField: even.target.value});//this command works in background bc it is a asynchronous
  }

  // life cycle component
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
    // console.log('**********************start***************************');
    // console.log(this);
    // console.log('***********************end***************************');
    return (
      <div className="App"> 
        <h1> My First App </h1>
        <SearchBox 
          placeholder='search monster' 
          
          
          //handleChange={ e => this.handleChange(e) } //just only an assignment, not declaration or expression
         
          // handleChange={ e => {
          //   console.log(this);
          //   return this.handleChange(e);}}
          
          handleChange={this.handleChange}

          //if we don't want to use arrow function, we have to use bind method to pass exactly the this object, not for this<=>window object
          // handleChange={function(e){
          //   console.log('honhattan');
          //   return this.handleChange(e); // this is a object of function, and this function is not a method of class ==> it is window object
          // }.bind(this)}// bind to get this of an object of class 
        />

        <CardList monsters={filterMonsters}></CardList>
        {/* just save for reference
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

/*
1/////////////////////////////////////////////////////////////////
ES7 and use arrow function
handleChange = even => {
      return this.setState({searchField: even.target.value});
    }

handleChange={this.handleChange}
/////////////////////////////////////////////////////////////////

2/////////////////////////////////////////////////////////////////
  //ES7 but don't use arrow function
  handleChange = function(even) {
    return this.setState({searchField: even.target.value});
  }.bind(this);

  handleChange={this.handleChange}
/////////////////////////////////////////////////////////////////

3/////////////////////////////////////////////////////////////////
//ES7 but don't use arrow function
  handleChange = function(even) {
    return this.setState({searchField: even.target.value});
  }

  handleChange={ e => this.handleChange(e) }
/////////////////////////////////////////////////////////////////

4/////////////////////////////////////////////////////////////////
  //ES7 but don't use arrow function
  handleChange = function(even) {
    return this.setState({searchField: even.target.value});
  }

  handleChange={function(e){
    return this.handleChange(e); // this is a object of function, and this function is not a method of class ==> it is window object
  }.bind(this)}// bind to get this of an object of class 
/////////////////////////////////////////////////////////////////

5/////////////////////////////////////////////////////////////////
  handleChange = even => {
      return this.setState({searchField: even.target.value});
  }

  handleChange={function(e){
    return this.handleChange(e); // this is a object of function, and this function is not a method of class ==> it is window object
  }.bind(this)}
/////////////////////////////////////////////////////////////////

6/////////////////////////////////////////////////////////////////
  handleChange = even => {
      return this.setState({searchField: even.target.value});
  }

  handleChange={ e => this.handleChange(e) }
  /////////////////////////////////////////////////////////////////
*/
