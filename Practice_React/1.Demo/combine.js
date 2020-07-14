/* React likes an external JS which using new features of JS 
   React-dom is a rendering to convert components in React to a real DOM
   Babel is a JS pre-processor to compile the code of React to code which
   can run successfully on Browser */

//HTML1
/*
<div class="person"
    <h1>Nhat</h1>
    <p>Your age: 28</p>
<div>
*/
<div id="p1"></div>

<div class="person"
    <h1>Tan</h1>
    <p>Your age: 29</p>
<div>

//JSX1
function Person() {
    // Babel preprocessor convert this part into JS code
    return (
       <div className="person"
            <h1>Nhat</h1>
            <p>Your age: 28</p>
        <div> 
    );
}

//Render the function Person in jsx to the real dom and display the element having
//id = p1 in html 
ReactDOM.render(<Person />, document.querySelector('#p1'));

//********************************==> going to optimal*****************************/

//HTML2
<div id="p1"></div>
<div id="p2"></div>

//JSX2
function Person(props) {
    // Babel preprocessor convert this part into JS code which work on browser
    return (
       <div className="person"
            <h1>{props.name}</h1>
            <p>Your age: {props.age}</p>
        <div> 
    );
}

//Render the function Person in jsx to the real dom and display the element having
//id = p1 in html 
ReactDOM.render(<Person name="Nhat" age="28"/>, document.querySelector('#p1'));
ReactDOM.render(<Person name="Tan" age="28"/>, document.querySelector('#p2'));


//********************************==> going to optimal*****************************/
//HTML3
<div id="app"></div>

//JSX3
function Person(props) {
    // Babel preprocessor convert this part into JS code which work on browser
    return (
       <div className="person"
            <h1>{props.name}</h1>
            <p>Your age: {props.age}</p>
        <div> 
    );
}

var app = (
    <Person name="Nhat" age="28"/>
    <Person name="Tan" age="28"/>
);

ReactDOM.render(app, document.querySelector('#app'));