Link reference:
https://blog.pusher.com/beginners-guide-react-component-lifecycle/
https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d

In section 4, we have already talked about the life cycle in React, and now we are going to dive
into this topic as well as the new way to deal with its problem. As we know, every component follows
its life cycle, including created=>mounted to the DOM==>unmounted and then be destroyed. We call this
process a Component life cycle. 

We are beginning with the Mounting methods. Whenever a component is created and inserted into the DOM,and then it is rendered, it is called a mounting process. Generally, some process will happen in this mounting are constructor =>  componentWillMount() => render => componentDidMount(). 

We can see the method componentWillMount() is between the constructor and render process. Initially, it used to set the default configuration for a component, but now, all of this work should be set up in the constructor. Besides, we shouldn't use it to call API because the API called almost in asynchronous process, so the data can be returned after the render called. This means the component may render with empty data at least once time. 

Next is the componentDidMount(). In fact that this component is called after the component mount to the DOM in the first time ==> It is the best place to call API because the component has been mounted already and is available to the DOM as well as we can do something without using the DOM, such as:
+ Connect a React app to external applications, such as web APIs or JavaScript frameworks.
+ Set Timers using setTimeout or setInterval.
+ Add event listeners.
+ Draw on an element you just rendered.
Example:
class Example extends React.Component {
        componentDidMount() {
            fetch(url).then(results => {
                // Do something with the results
            })
        }
    }

After the first time of mounting and rendering, the props of the component could change, and it makes the component has to be re-rendered. Now, the life cycle of this component will have some new processes. 

componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
render
componentDidUpdate

+ componentWillReceiveProps is a method called before a component does anything with new props. In other words, this is the first gate the new props have to pass to make a new cycle except for the first cycle. In this method, it will compare the new props with the previous ones. Having anything difference causes the component change. So if we want to involve the process to check and allow the component to receive these props or not, we can go into this method.

class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {number: this.props.number};
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.number !== nextProps.number) { // the component only receives an actually new props
        this.setState({number: nextProps.number});// then, it will update for its state
      }
    }

    render() {
      return (
        <h1>{this.state.number}</h1>
      )
    }
  }

  + After going through the first gate, the new props were continued checking whether its change affects the output of the component. Generally, the first gate - componentWillReceiveProps checks the props is actually changed or not, and the second phase - shouldComponentUpdate checks the output if it is affected by these changes or not.

  class Example extends React.Component {
    [...]

    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.input == nextState.input) {
        return false;
      }
    }

    [...]
  }

  + Next is componentWillUpdate method. This can be treated as preparation for the render. Everything we want to do in this phase should be done to support or improve the performance of rendering. We shouldn't change anything of state or props in this time.

  + After this is componentDidUpdate method. This will be called after the rendering HTML finishes. So, we can do any interaction without React environment such as making an HTTP request

  + The componentWillUnmount() method. This is the only unmounting method. componentWillUnmount is called right before a component is removed from the DOM. This is where you can perform any cleanups that should be done such as invalidating timers, canceling network requests, removing event listeners or canceling any subscriptions made in componentDidMount.

  + In addition to the above methods, we need to talk one more that called componentDidCatch. Normally, the component can be rerendered for some reasons, for instances: 
  - Component creation in the first time
  - Component re-rendering due to re-rendering of the parent component
  - Component re-rendering due to internal change (e.g. a call to this.setState(), its props changes)
  - Component re-rendering due to call to this.forceUpdate

  However, the special case we want to focus on that is Component re-rendering due to catching an error. So if we don't handle for error cases, the rendering process will be repeated over time, which makes leak memory happen, or even crash our system/application. So with this method, we can catch and handle these errors by ourselves.