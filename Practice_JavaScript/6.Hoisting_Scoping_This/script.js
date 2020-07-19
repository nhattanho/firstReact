/* the function hoisting only works for function declaration, but not for function expression*/
/* Honestly, in JS, the program has two main phases:
1. Creation phase makes:
    a. Creation of Variable Object (VO) contains: all argument passed in to the function, function 
    declarations, and variable declaration. Both function and variable declarations has their
    properties saved in the VO, but for the function variable, all its properites point directly
    to the function while with variable declaration's properties was set to undefined. That's why
    we can call the function before or after the code that declare this function. Because call the
    function that means it will be on the rum-time process or execution phase, while all properties
    of the function declaration would be processed in creation phase that happens before the execution
    phase. Summary:
    + creation phase: function's properties saved in VO and point to its function ==> execution phase:
    call the function, it will base on the properties and use it to run program successfully.

    However, with the variable declaration in the creation phase, its properties was set to undefined,
    and not point to itself, so if we run execution phase before the declaration, it doesn't have any
    information of this variable, so it make the program fail. Therefore, we have to write the variable
    declaration before writing the code that call the variable. Summary:
    + creation phase: variable's properties saved in VO but not point to itself ==> execution phase:
      call the variable's declaration ==> using the variable
     /
    /
    \
     \
      using the variable ==> call the variable's declaration ==> false    
    b. Creation of Scop chain
    c. Determine value of this variable
2. Execution phase runs program */

// the declaration will be processed on compile time
console.log(calculate(1992)); // it still work, because the declaration of function
// has been processed in creation phase that created all properties poiting to the function
function calculate (birthYear){
    return 2020 - birthYear;
}
console.log(calculate(1992)); // it still work in execution process of program


//console.log(grade('A')); ==> it's wrong
/* with the express function <=> variable declaration, we have to call the function
after we declare function expression */
var grade = function(grade) {
    console.log(grade);
}
grade('A'); //==> it works successfully

/* Scope Chain */
 var a = 'number a';//global scope
 first();
 function first() {
     var b = 'number b';
     second();
     function second() {
        var c = 'number c';
        third();
     }
 }

function third() {
    var d = 'number d';
    //console.log(a + c); // ==> wrong, because c is variable of second function scope
    console.log(a + ' ' + d); // true, because a is global and d is its properties
}

/**********Example about this keyword - Lexical this keyword*****/
// *************************In Objects***********************/
console.log(this); // print out the window object

var nhat = {
    name: 'nhattan',
    birthYear: 1992,
    calAge: function () { // just like expression function <=> variable declaration
        //console.log(this); // this now point to the oject "nhat"
        function innerCal() {
            /* in this case, this point to the default object which is window object.
            Though function innerCal is in the calAge function, it is not a method,
            it's just a regular function. There is only one function method that is 
            calAge function*/
            console.log(this);
        }
    }
};

nhat.calAge();

var ho = {
    name: 'honhat',
    birthYear: 1993
};
ho.calAge = nhat.calAge;
ho.calAge();
/********************************************************************************************/

var nhat1 = {
    name: 'nhattan',
    birthYear: 1992,
    calAge: function () { // just like expression function <=> variable declaration
        console.log(this); // this now point to the oject "nhat"
        return function() {
            /* in this case, this point to the default object which is window object.
            Though function innerCal is in the calAge function, it is not a method,
            it's just a regular function. There is only one function method that is 
            calAge function*/
            console.log(this);
        };
    }
};

var res = nhat1.calAge(); // Object { name: "nhattan", birthYear: 1992, calAge: calAge()
res(); // Window file:///D:/sharefolder/project/firstReact/Practice_JavaScript/6.Hoisting_Scoping_This/index.html


// /*************************************How to fix for Object********************************/
// Example:
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var node = document.querySelector('.green');
        console.log(this.position); // it actually is pointing to the object box5
        node.addEventListener('click', function() {
            //console.log(this.position); ==> this now is pointing to the window object, bc it now is not
            // in a method clickMe of the box5 object, it is on the regular function that is a callback function
            console.log(`You have just clicked on the box number ${this.position}`); // it also points to window object
        });
    }
};
box5.clickMe();

/*==> We can fix in two ways:
1. Using hack or working around
adding line: var self = this or using bind method */
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var node = document.querySelector('.green');
        var self = this;
        // var pos = this.position; // because this in this line is a keyword of method of object box5
        node.addEventListener('click', function() {
            console.log(`You have just clicked on the box number ${self.position}`);
        });
    }
};

var box51 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var node = document.querySelector('.orange');
        node.addEventListener('click', function() {
            //console.log(this.position); ==> this now is pointing to the window object, bc it now is not
            // in a method clickMe of the box5 object, it is on the regular function that is callback function
            console.log(`In box 51, You have just clicked on the box number ${this.position}`);
        }.bind(this));
    }
};

// /*2. Using arrow function in ES6*/
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var node = document.querySelector('.blue');
        node.addEventListener('click', ()=> { // arrow function shares the this keyword with the parent function
        // in this case, it shares this keyword with the clickMe function that is a method of object box6, so this points to
        // the object box6
            console.log(`You have just clicked on the box number ${this.position} by using arrow function feature!s`);
        });
    }
};
box6.clickMe();

// /*However , if we use:*/
var box6 = {
    color: 'green',
    position: 1,
    //We cannot have
    //this: self,
    clickMe: ()=> {
        var node = document.querySelector('.blue');
        node.addEventListener('click', ()=> {
            console.log(`You have just clicked on the box number ${this.position} by using arrow function feature!s`);
        });
    }
};

// /*We can see this keyword of click event function will be shared with the clickMe function, then it will continue 
// sharing with the function in global that is outside of the object box6. Therefore, this keyword now doesn't point
// to the box6 object. Instead of that, it is pointing to the window object.*/

/***************************In Functions*******************************/
function Person(name) {
    this.name = name;
}
var friends = ['nhat', 'tan'];

Person.prototype.myFriends = function(friends) {
    let arr = friends.map(function(el) {
        return this.name; // this is an window object, not pointing for object of Person constructor
    });
    console.log(arr);
}

var test = new Person('tan');
test.myFriends(friends);//["",""] ==> error

// // ==> Fix 1:
Person.prototype.myFriends1 = function(friends) {
    var self = this;
    let arr = friends.map(function(el) {
        return self.name; // this is an window object, not pointing for object of Person constructor
    });
    console.log(arr);
}

var test1 = new Person('tan');
test1.myFriends1(friends);

// // Fix 2
Person.prototype.myFriends2 = function(friends) {
    let arr = friends.map(function(el) {
        return this.name; // this is an window object, not pointing for object of Person constructor
    }.bind(this));
    console.log(arr);
}
var test2 = new Person('tan');
test2.myFriends2(friends);

//Fix 3
Person.prototype.myFriends3 = function(friends) {
    let arr = friends.map(el => {
        return this.name; // this is an window object, not pointing for object of Person constructor
    });
    console.log(arr);
}
var test3 = new Person('tan');
test3.myFriends3(friends);

/******************************In Classes*****************************************/
class App extends Component { // class App extends React.Component {}
  state = {
    monsters: [],
    searchField: ''
  }
  /////////////////////////////////////////////////////////////////
  //ES7 and use arrow function
  handleChange = even => {
      return this.setState({searchField: even.target.value});
  }
  /////////////////////////////////////////////////////////////////

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
    return (
      <div className="App"> 
        <SearchBox 
          placeholder='search monster' 
          /////////////////////////////////////////////////////////////////
          handleChange={this.handleChange} />
          /////////////////////////////////////////////////////////////////

        <CardList monsters={filterMonsters}></CardList>
       </div>
    )
  }
}
export default App;

// Explanation
1/////////////////////////////////////////////////////////////////
//ES7 and use arrow function
handleChange = even => {
      return this.setState({searchField: even.target.value});
    }

//The different thing is now we don't call directly the handleChange function "this.handleChange()",
//instead of that, we just use handleChange to refer a method. And now, this.handleChange will look
//back to the method and see the method handleChange are assigning to the other function. So, right now
// we are having two different functions. That's why, the "this" object of the right function will be 
// not sure a "this" object of the class. However, in this case, the right function is a arrow function,
//==> its "this" object will be shared with the "this" object of the left that means it is also the
//"this" object of class. We also see the second way to make the "this" object of the right function
// be equal the "this" object of class by using bind method in number 2.
handleChange={this.handleChange}
/////////////////////////////////////////////////////////////////

2/////////////////////////////////////////////////////////////////
  //ES7 but don't use arrow function
  handleChange = function(even) {
    return this.setState({searchField: even.target.value});
  }.bind(this);//instead of using arrow function, this case use bind method

  handleChange={this.handleChange} // same explanation as 1
/////////////////////////////////////////////////////////////////

3/////////////////////////////////////////////////////////////////
//This object is also pointing the this object of class because this.handleChange(e) is a
//method of class
//ES7 but don't use arrow function
  handleChange = function(even) {
    return this.setState({searchField: even.target.value}); 
  }

  //In this case, we can see the handleChange is pointing to a arrow function. 
  //Besides, in this arrow function call directly a handleChange function (this.handleChange(e)). 
  //The this in this.hanleChange() is also the this object of the class because it was called by
  //arrow function ==> handleChange now is pointing to the method of a class
  handleChange={ e => this.handleChange(e) }
/////////////////////////////////////////////////////////////////

4/////////////////////////////////////////////////////////////////
  //"This" object is also a object of class, because the handleChange(even) is a method of class
  //ES7 but don't use arrow function
  handleChange = function(even) {
    return this.setState({searchField: even.target.value});
  }

  //this is a object of function, and this function is not a method of class ==> it is window object
  //so we have to use bind to get this of an object of class. And then, the function will return the
  //method of class or handleChange now is pointing to the method of the class
  handleChange={function(e){
    return this.handleChange(e); 
  }.bind(this)}
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

