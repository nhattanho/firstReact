import React, { Component } from 'react';
import './App.css';
import { HomePage } from './pages/homepage/homepage.component';
import {Route, Switch, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SigninSignupPage from './pages/signin-signup/signin-signup.component';
import { auth, createUserProfileDocument } from '../src/firebase/firebase.utils';
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import {selectCurrentUser} from '../src/redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';

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
  unsubscribeFromAuth = null;

  /* When calling the onAuthStateChanged or onSnapshot methods from auth library
  <=> we subcribed the listener that always listening from database ==> to unscribe
  this lentener to avoid memory leak in our application when the component has already
  umounted, we get back a function as below implementation */
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

    /*We don't need it because we will use redux
    state = {
      currentUser: null
    }
    */
   const {setCurrentUser} = this.props; // destructure to get a function setCurrentUser

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

          userRef.onSnapshot( snapShot => {
            /*Replace by using redux
            // Set up new information for current User
            this.setState({
              currentUser: { // Set up new information for current User
                id: snapShot.id,
                ...snapShot.data() //actual data located in snapShot.data
              }
            });
            console.log('done update the currentUser');
            console.log(this.state);
            */
           setCurrentUser({ // will call the dispatch(setCurrentUser(...))
             id: snapShot.id,
             ...snapShot.data()
           });
            console.log('done update the currentUser');
          });
        }).catch(error => {
            console.log(`Something error by ${error}`);
        });
      } else {
        setCurrentUser(null)
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

        <Header></Header>
        <Switch>
          {/* Route default has 3 parameters: exact, path <=> url, and component */}
          <Route exact path='/' component={HomePage}></Route> 
          <Route exact path='/shop' component={ShopPage}></Route>
          <Route exact path='/checkout' component={CheckoutPage}></Route>
          {/*<Route exact path='/signin' component={SigninSignupPage}/>*/}
          <Route 
            exact path='/signin' 
            render={()=>{
              return this.props.currentUser ? (<Redirect to='/'/>) : (<SigninSignupPage/>)
            }}/>
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

// const mapStateToProps = ({user}) => ({ // the way to get the currentUser
//   currentUser: user.currentUser
// })

// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state)
// })

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))// return an action object has type: 'SET_CURRENT_USER' and payload: user
});

export default connect(mapStateToProps, mapDispatchToProps)(App); // App doesn't need the currentUser now
// ==> the first argument is null. And now, null and mapDispatchToProps is a props of App. Also, mapDispatchToProps
// is a function that return an object having a property as a function, setCurrentUser
// connect called higher component that means it receives a component as a parameter

// Now, null become to mapStateToProps because we want to get the CurrentUser to update for other component

/* The process: Whenever having something change on the user, such as sign-in/out, refesh page ==> calling the onAuthStateChanged
==> setCurrentUser ==> rerender the Header component ==> check render for SignInSignOut page */