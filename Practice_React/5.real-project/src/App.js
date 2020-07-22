import React, { Component } from 'react';
import './App.css';
import { HomePage } from './pages/homepage/homepage.component';
import {Route, Switch, Link} from 'react-router-dom';

const HatsPage = (props) => {
  console.log(props); // props is an object
  return (
  <div>
  {/*<Link to='/hats/hat'>Go to hat page</Link>*/}
  <button onClick={ () => { props.history.push('/hats/hat')} }>Go to the hat page</button>
  <h1>HATS PAGE</h1>
  </div>
)};

/* for testing */
const HatPage = (props) => {
  console.log(props);
  return (
    <div>
    {/* This is a way to pass an dynamic path */}
      <Link to={ `${props.match.url}/10` }>Go to 10</Link>
      <Link to={ `${props.match.url}/11` }>Go to 11</Link>
      <Link to={ `${props.match.url}/12` }>Go to 12</Link>
      <h1>HAT PAGE</h1>
    </div>
  );
}

const Hat1Page = (props) => (
  <div>
    <h1>HAT1 PAGE gets id is: {props.match.params.hatid}</h1>
  </div>
);

class App extends Component {
  render() {
    return (
      <div>
        {/* exact <=> exact={true} ==> help the router understand that the path has to be exactly
        equal slash to route the web to the Homepage. If the exact is false or even not declare 
        in the Route, the system will missunderstand about the path, for example, if the path is
        /hats/hat, and we type /hats/hat to go to the hat page. However, it still brings the system
        go to all the pages. Firstly, it goes into in the Homepage then go to the /hats page, and
        finally get in /hats/hat page==> That means it will run all web pages having the / at the first
        ==> really dangerous */}
        {/*
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/hats' component={HatsPage}></Route>
        <Route path='/hats/hat' component={HatPage}></Route>
        */}

        {/* With the Rout with out exact, it will run all the pages from the start to the end of the
          path, like /level1/level2/level3/ ==> go to home homepage first, and then level1 page, level2
          page, level3 page and so on. And now, with the Switch, if we use it to wrap all the Routes, so
          we will tell the system that it just only get the first matching in the path. For example,
          when using Switch, and we type /hats/hat that we want to hat page. However, it just capture
          the first / and just go directly the homepage no matter how many the page we added after the
          slash. Example /level1/level2/level3/.... ==> just go into the homepage and stop immediately
          Conclusion, we need to use exact to make sure getting the true path that we want to navigate.
          */}
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/hats' component={HatsPage}></Route>
          <Route exact path='/hats/hat' component={HatPage}></Route>
          <Route path='/hats/hat/:hatid' component={Hat1Page}></Route> {/* :hatid helps us to get id or parameter from the path */}
          {/* Example: http://localhost:3000/hats/hat/12 ==> HAT1 PAGE gets id is: 12 */}
        </Switch>

      </div>
    );
  }
};

export default App;
