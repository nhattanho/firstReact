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
==> call the action to return an action object: type and payload ==> passed in to reducer to return an final object ==> saved in to store by state object

+ mapDispatchToProps(plug the reducer in this component): call the action to set the value which will be used by the other child component
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)) //dispatch to pass an object into store by calling an action
})
export default connect(null, mapDispatchToProps)(Collection);

+ mapStateToProps: call to use the result of previous action happened in mapDispatchToProps
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({  //state, object of root reducer
    currentUser: currentUser,
    hidden: hidden
})

+user and cart are state object's properties in root reducer