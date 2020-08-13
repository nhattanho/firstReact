import React, { Component } from 'react';
import './App.css';
import { HomePage } from './pages/homepage/homepage.component';
import {Route, Switch, Link} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SigninSignupPage from './pages/signin-signup/signin-signup.component';
import { auth, createUserProfileDocument } from '../src/firebase/firebase.utils';

// const HatsPage = (props) => {
//   console.log(props); // props is an object
//   console.log(props.match.url);
//   return (
//   <div>
//   {/*<Link to='/hats/hat'>Go to hat page</Link>*/}
//   {/*<button onClick={ () => { props.history.push('/hats/hat')} }>Go to the hat page</button>*/}
//   <button onClick={ () => { props.history.push(`${props.match.url}/hat`)} }>Go to the hat page</button>
//   <h1>HATS PAGE</h1>
//   </div>
// )};

// /* for testing */
// const HatPage = (props) => {
//   console.log(props);
//   return (
//     <div>
//     {/* This is a way to pass an dynamic path */}
//       <Link to={ `${props.match.url}/10` }>Go to 10</Link>
//       <Link to={ `${props.match.url}/11` }>Go to 11</Link>
//       <Link to={ `${props.match.url}/12` }>Go to 12</Link>
//       <h1>HAT PAGE</h1>
//     </div>
//   );
// }

// const Hat1Page = (props) => (
//   <div>
//     <h1>HAT1 PAGE gets id is: {props.match.params.hatid}</h1>
//   </div>
// );

class App extends Component {

  state = {
    currentUser: null
  }

  unsubscribeFromAuth = null;

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  // componentDidMount() {
  //   //user is a object returned by google's autho
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {// called whenever having something change on signin or out, or updated from user
  //     this.setState( {currentUser: user} ); // always open the gate to connect with firebase ==> we need to close to avoid memory leak
  //     console.log('didmount');
  //     console.log(user);
  //   });
  // }

  componentDidMount() { //Note: whenever we refresh the page, the mount process restarts, so after that the didmountComponent will be always called 
  /*Note
  Particularly, if we click the sign out button, the method auth.signOut() immediately, it remove the user to null <=> changed user already
  ==> caused the auth.onAuthStateChanged() function run.
  */  
    console.log('In did mount');
    // auth.onAuthStateChanged() ==> was triggered whenever anything change about the user paramater like they login with another account or refresh the page,
    // if they still login with the old account or old information, this function doesn't run.
    // And user is a object returned by google's auth whenever having something change on signin or out,
    // or updated from user. In the other word, the user was only returned when the function auth.onAuthStateChanged() was triggered
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => { 
      if (user) {
    //this.setState( {currentUser: user} ); // always open the gate to connect with firebase ==> we need to close to avoid memory leak
    // Besides, the user returned by auth contains too much information we don't need, so we used the function createProfileDocument 
    // to just get the neccessary or specific infor.

    //console.log(user);

    //*Note: console.log(createUserProfileDocument(user));==> Promise { <state>: "pending" }, because
    //in firebase.utils.js, the processing is running in the background, so at the time to return userRef
    // the process hasn't finished, so it hasn't updated for userRef ==> fix by using then and catch because 
    // the async function return a promise
        createUserProfileDocument(user).then( result => {
          const userRef = result;

          console.log(`testing for userRef in app.js: ${userRef}`);

          userRef.onSnapshot( snapShot => {
            this.setState({
              currentUser: { // Set up new information for current User
                id: snapShot.id,
                ...snapShot.data() //actual data located in snapShot.data
              }
            });
            console.log(this.state);
          });
        }).catch(error => {
            console.log(`Something error by ${error}`);
        });
      } else {
        this.setState( {currentUser: null } )
      }

    })
  }

  render() {
    console.log('we rendered');
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

        <Header currentUser={this.state.currentUser}></Header>
        <Switch>
          {/* Route default has 3 parameters: exact, path <=> url, and component */}
          <Route exact path='/' component={HomePage}></Route> 
          <Route exact path='/shop' component={ShopPage}></Route>
          <Route exact path='/signin' component={SigninSignupPage}></Route>
          {/* just for the testing
            <Route exact path='/hats' component={HatsPage}></Route>
            <Route exact path='/hats/hat' component={HatPage}></Route>
            <Route path='/hats/hat/:hatid' component={Hat1Page}></Route>
            { :hatid helps us to get id or parameter from the path }
            { Example: http://localhost:3000/hats/hat/12 ==> HAT1 PAGE gets id is: 12 }
          */}
          
        </Switch>

      </div>
    );
  }
};

export default App;
