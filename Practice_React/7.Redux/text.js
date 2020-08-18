const { default: store } = require("../5.real-project/src/redux/store")
const { default: CustomButton } = require("../5.real-project/src/components/custom-button/custom-button.component")

Why do we want to use Redux?
Assume we have a big application:

+ With normal architecture like MVC, the flow of data is bidirectional, that means one of change can affect to 
the other state of application in many places in the code ==> so hard to maintain and debug.

+ Besides, every child component usually get props from the root component. Just imagine there is one child component
that needs to have the root's props. However, this child component doesn't actually need it, instead of that is a child
of this component need it. This makes the performance isn't good because we have to pass the arguments through some unnecessary
components 

=> with Redux, we can overcome these problems by replacing the this.state by reducer 

Action ==> Root Reducer: contain all reducers of application ===> Store saved in Provider of index.js ===> DOM changes

====> single source of truth , root reducer just likes a big state for whole application. It responses for controlling all
actions happening in application.

+ The general graph:                      home reducer                   type: SET_CURRENT_USER
                                        /                              /
actions ==> middleware ==> root reducer --- user reducer + user actions ==================================> store as a props of Provider that contains all of action in applicaton ==> DOM change by react
                                        \                              \
                                          shop reducer                   payload: an object

+ The structure of Redux folder:



              cart-reducer(state, action) returns an cart object saved in root-reducer
             /
         cart---cart-action is a function returns an action object: type and payload 
        /    \
       /      cart-type: all type of posible action, example: TOGGLE_CART_HIDDEN, ADD_ITEM
      /
     /         user-reducer(state, action) returns an user object saved in root-reducer
    /         /
Redux --- user --- user-action returns an action object
    \         \ 
     \         user-type 
      \
       \
        \
         root-reducer contains all objects get from the all the actions and all these object was saved into store.js which called is state
         ==> example state will have: {cart, user} objects

+ The flow of process:
Action from CartIcon which calls the action, such as click button,(this component has to be add action.js file) 
==> call the action to return an action object: type and payload ==> passed in to reducer to return an final object ==> saved in to store by state object or updated for state object saved in store.js

+ mapDispatchToProps(plug the reducer in this component): call the action to set the value which will be used by the other child component ==> must import the action in its component
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)) //dispatch to pass an object into store by calling an action
})
export default connect(null, mapDispatchToProps)(Collection);

+ mapStateToProps: call to use the result of previous action happened in mapDispatchToProps by the state object of root reducer <=> pass the props to the component by Redux
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({  //state, object of root reducer
    currentUser: currentUser,
    hidden: hidden
})

+user and cart are state object's properties in root reducer

+ For generally, we can imagine:
Class component <=> function component + Hooks
Parent component pass props into the child component <=> Child component + Redux

+ const mapStateToProps = ({cart: {cartItems}}) => { // destructure of state object
    /*Note: console.log('I am being called');
    Because this component receives a root state as a props, so whenever the state changed
    always make this component re-render. However, the root state contains all the objects
    of all actions. So, if the other component calls its action that make the state change,
    also make this component re-render as well even it doesn't call any action or it is not
    actual mounted in the DOM==> it's not a good design for our system.  ==> we need to use
    the selector - reselect library to make sure it will be call or re-render for its action
    only and just only when it is mounted, and is not affected by the orther action.*/
    return ({
        number: cartItems.reduce( (accumulate, item) => accumulate + item.quantity, 0 
    )}
)}

==> New mapStateToProps:
// /* The first way to use mapStateToProps with reselect */
const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
    hidden: selectHidden(state)
})

/* The second way to use mapStateToProps with reselect */
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectHidden
})

==> New graph:
                cart.utility used for mapDispatchToProps and cart.selector.js which is used for mapStateToProps
               /
              cart-reducer(state, action) returns an cart object saved in root-reducer
             /
         cart---cart-action is a function returns an action object: type and payload 
        /    \
       /      cart-type: all type of posible action, example: TOGGLE_CART_HIDDEN, ADD_ITEM
      /
     /         user-reducer(state, action) returns an user object saved in root-reducer
    /         /
Redux --- user --- user-action returns an action object
    \         \ 
     \         user-type 
      \        \
       \        user.selector.js
        \
         root-reducer contains all objects get from the all the actions and all these object was saved into store.js which called is state
         ==> example state will have: {cart, user} objects

Example file selector:
import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectorCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce( (accumulate, item) => accumulate + item.quantity, 0
))

+ /*Note: if we use this way, so in the parent component of this component has to pass the props, just like
<CartDropDown ...props /> ==> in the CartDropDown component we can get the history or match props.
However, now we are using the Redux with getting the props by using mapStateToProps, so we can do like
this way, we have to use the withRouter to get the history and match from its parent. 
The normal way:
********************************************************
export default connect(mapStateToProps)(CartDropDown);
********************************************************

The Redux way:
/********************************************************************/
export default withRouter(connect(mapStateToProps)(CartDropDown));
//using withRouter can get history and match from the parent component
/* Note: if we have mapDispatchToProps() function, then we will export the function with 2 paramters like:
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
However, in this case we only passed one parameter which is mapStateToProps, so the rest parameter will
automatically pass, so in the CartDropDown component, it has a dispatch props already. So we just use 
directly this props instead of making the new mapDispatchToProps() function while the toogleHiddenCart
has been create by the other action. */