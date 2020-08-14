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