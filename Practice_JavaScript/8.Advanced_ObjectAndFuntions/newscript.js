// Uderstanding arrow function in ES6
const grades = [100, 45, 89];

// Function in ES5
var grade5 = grades.map(function(el){
    return 100 - el;
});
//console.log(grade5);

//// Function in ES6
const grade6 = grades.map( (el) => {
    return 100 - el;
});
//console.log(grade6);
/*
const grade6 = grades.map(el =>  100 - el); // because just having one argument
console.log(grade6);
*/

// grade is a current element, index is its position, arr1 is itself
let grade6_2 = grades.map( (grade, index, arr1) => {
    let arr = [];
    arr[index] = 100 - grade;
    return arr[index];
});
console.log(grade6_2);

// Continue Arrow Function
/****************************Interaction between arrow function and this keyword in Object**************************/
// in ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var node = document.querySelector('.green');
        var self = this;
        node.addEventListener('click', function() {
            //console.log(this.position); ==> this now is pointing to the window object, bc it now is not
            // in a method clickMe of the box5 object, it is on the regular function that is callback function
            console.log(`You have just clicked on the box number ${self.position}`);
        });
    }
};
box5.clickMe();

console.log('Another problem in box52');
var box52 = {
    color: 'green',
    position: 1,
    clickMe: ()=> { // it does not work because this keyword was shared with the global object 
        var node = document.querySelector('.green');
        var self = this;
        node.addEventListener('click', function() {
            //console.log(this.position); ==> this now is pointing to the window object, bc it now is not
            // in a method clickMe of the box5 object, it is on the regular function that is callback function
            console.log(`In box52, You have just clicked on the box number ${self.position}`);
        });
    }
};
box52.clickMe();

// Another way to fix above error in ES5
console.log('Another way to fix above error in ES5');
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
box51.clickMe();
console.log('*******************************************************************************');

// Fixing by using arrow function in ES6
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var node = document.querySelector('.blue');
        node.addEventListener('click', ()=> { // this keyword will be shared with 'this' object in clickMe function
            console.log(`You have just clicked on the box number ${this.position} by using arrow function feature!s`);
        });
    }
};
box6.clickMe();



//***********************Interaction between arrow function and this keyword in Function***************************/
function Person(name) {
    this.name = name;
}

//ES5
Person.prototype.myFriend5 = function() { // because this function is a property of Person constructor
    return this.name; // so this is pointing to the Person's objects
}
var person = new Person('Nhat');
console.log(person.myFriend5()); // Nhat


/********************************************************************/
console.log('Testing for ES5');
Person.prototype.myFriend51 = function(grades) {
    var arr = grades.map(function(grade, index) {
        console.log(this.name); // this still points to object of Person constructor
        //console.log(`${this.name} has grade[${index}] is ${grade}`);
        return 100-grade;
    });
    /* we can do as below:
    var arr = grades.map(function(grade, index) {
        console.log(`${this.name} has grade[${index}] is ${grade}`);
        return 100-grade;
    }.bind(this)); //the myFriend51 function pass its 'this' object into callback function in map method
    */
    return arr;
}
var grades5_3 = [100, 90, 87];
var person1  = new Person('Tan');
console.log(person1.myFriend51(grades5_3)); // 0 10 13

/*
Person.prototype.myFriend51 = function(friends) { // it works
    var arr = friends.map(function(el){
        console.log(this.name);
        return el;
    });
    console.log(arr);
}
var friends = [78, 80, 70];
var person1  = new Person('Tan');
person1.myFriend51(friends);
*/

/********************************************************************/
/*
console.log('Testing for ES6');
Person.prototype.myFriend52 = function(friends) {
    var arr = friends.map(el => {
        console.log(this.name);
        return el;
    });
    console.log(arr);
}
var friends = [78, 80, 70];
var person2  = new Person('Tan');
person2.myFriend52(friends); // 78 80 70
*/

console.log('Testing for ES6');
Person.prototype.myFriend52 = friends => { // still working, but not work in Object 
    var arr = friends.map(el => {
        console.log(this.name);
        return el;
    });
    console.log(arr);
}
var friends = [78, 80, 70];
var person2  = new Person('Tan');
person2.myFriend52(friends); // 78 80 70