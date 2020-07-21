import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Lifecycles from './lifecycles'


class App extends Component {

  textApp = console.log('constructor app');
  state = {
    showChild: true,
    text: '',
    message: ''
  };

  changeMess = () => {
    return this.setState ({message: this.state.message + ' +'});
  };

  toggleLife = () => {
    this.setState( (state) =>{
      return {showChild: state.showChild};
    } );
  };

  updatedText = () => {
    this.setState( (state) =>{
      return {text: state.text + '_hello'};
    } );
  } ; 


  render() {
    console.log('render App');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
  
          <button onClick={this.changeMess}>Change Message</button>

          <button onClick={this.toggleLife}>Toggle Life</button>
  
          <button onClick={this.updatedText}>Update Text</button>

          {this.state.showChild ? (<Lifecycles text={this.state.text}/>) : null}
  
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
  

export default App;

/* Explanation */
/* Firstly, we can see the App class imported the lifecycle class.
App class will handle click button event and update the sate while the 
lifecycle class will manage the change in the system, and make the decision
whether they need to update the website or not.

By the way, we need to understand some components in life cycles of React Components:

+ componentDidMount() ==> it does something in the first time that create the successful interface of 
application, we can fetch or request some information from the other API/website to update for its website

+ componentDidUpdate() ==> that makes sure everything has updated already on its website.

+ shouldComponentUpdate() ==> whenever the change of original state happening will call this function. This 
function is the key point to make the decesion whether this change need to be applied or not. If it
returns true, that means the change affects to the system and it has to be updated or render for the
next step. And in inverse, nothing happens.

+ componentWillUnmount() ==> when something happening that is not sure what exactly next step, or just like
yes/no question the system need to do, this function will be asked. Then, if the answer is yes, it will be
refresh the application <=> all components will do again.

1. The first time the application running, the orther of processes will be:
constructor app ==> render app => constructor lifecycles ==> render lifecycles ==> DidMount
==> that makes sense because the app have to be processed earlier than lifecycles, but the
key thing is the constructor and render do before the DidMount. It really make sense, because
we don't now how much time and how long the DidMount finishs its processing, so we need to update 
everything we already have, and then, when the didMount done, it will update later.
So the output are:
constructor app 2 App.js:7
render App 2 App.js:29
constructor lifecycles 2 lifecycles.jsx:3
render lifecycles 2 lifecycles.jsx:36
DidMount

2. When we click the Toggle Life button, it will call the toggleLife function, and this function will
update the variable showChild of app's state. Now, the showChild will be false, because it was set true
as original. Besides, because the state of app changes ==> it make the React system on app class re-render. 
In re-render process, it continues checking the line:
{this.state.showChild ? (<Lifecycles text={this.state.text}/>) : null}, and it will be processed null <=> do
nothing, or we can say now the system doesn't need the lifecycles anymore ==> the componentWillUnmount() component
will be called to unmount the lifecycles class.
The output:
render App 2 App.js:29
WillUnmount

3. If we continue clicking the Toggle Life button again, the showChild will be true now, and then app class still
re-render because its state has changed. However, the true of showChild will make the system check for the Lifecycles
class because it meets the line: {this.state.showChild ? (<Lifecycles text={this.state.text}/>) : null}. That's why 
the lifecycles will be call along its props that is text=this.state.text, which is state of class's props. Going to
the lifecycles class, because at the previous time, the lifecycles had unmounted, so at this time, the process will
do everything again by calling constructor lifecycles, ==> render lifecycles ==> DidMount. We can confuse because why 
the process didn't call the shouldComponentUpdate(nextProps, nextState) component even though the properties of original
state had changed. And the answer is because right now it is updating/mounting all things agains, so we don't need to check
for updating. Absoulutely, do every thing again makes sure it has to be updated. That's it.
The output:
render App 2 App.js:29
constructor lifecycles 2 lifecycles.jsx:3
render lifecycles 2 lifecycles.jsx:36
DidMount

4. And now, we will make something different by clicking update text in the app class to change the value of text. In other 
words, we change the state's value of app class. After clicking the Update text button, the value of text updated, and it 
makes the app class re-render. Do the same job as before, the line {this.state.showChild ? (<Lifecycles text={this.state.text}/>)
will be checked again, but right now, the showChild is true(we did at previous jobs), so the lifecycles will be called with
the new text value. And now, we focus on two things:
First thing is because the lifecycles class was mounted at the step 3, so in the step 4, it doesn't need to mount or do all things 
again by calling the constructor lifecycles. Instead of that, we just need to check if we need to update or not. That we will talk
in the second thing as below.

Second thing is the state of orginal class has been changed ==> the shouldComponentUpdate(nextProps, nextState)
component will be called. Now, if the shouldComponentUpdate returns true, the processing will be contined for next steps which 
are render lifecycles ==> DidUpdate. However, if it returns false, that means even though the props of lifecycles has changed, it
doesn't enough condition to update all system => don't do anything

The output if shouldComponentUpdate return true:
render App 2 App.js:29
shouldComponentUpdate 
render lifecycles 2 lifecycles.jsx:36
DidUpdate

The output if shouldComponentUpdate return false:
render App 2 App.js:29
shouldComponentUpdate 

**Note: As we know the original state has 3 methods: showChild, text, and message. But the Lifecycles class just get one
of them as its props. In other words, we can say the lifecycle just focus on the text. However, whenever the original
state change for whatever showChild, text, or message, the lifecycle always affected, the shouldComponentUpdate will be called
and re-render after that. It should not be fair for lifecycles class because it should only have responsibility for only
text as its props. That's why we have to prevent it by checking whether the change happening on exactly for text props
or not before deciding re-render. And we do that by an update for shouldComponentUpdate component with the new code as below:

shouldComponentUpdate(nextProps, nextState) { //nextProps is the state it got from the app class
        //console.log(this.props.text); just checking original text props of lifecycle class, in the first time when lifecycle was mounted
        // the original text of app class wil be '' ==> the original text of lifecycles class also be assigned to ''  when the contructor finishes
        //but after mounting finished, the text of lifecycles class was only updated when shouldComponentUpdate() component returns true.
        console.log('shouldComponentUpdate', nextProps);//console.log('shouldComponentUpdate' + nextProps.text);
        if (nextProps.text !== this.props.text) return true;
        else return false;
}


These above steps help us understand the conceptual life cycle processes in React. It can have a lot of scenarios or 
the order of steps can be different, but if we get the root of each component as well as the flow of the chart, we can
explain every case we meet in the React situation. */