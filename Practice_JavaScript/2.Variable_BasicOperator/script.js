/* Focus on how to using Variable in JS*/
/* Type of variable of JavaScript:
1. Number: Using floating numbers for decimal ans integers
2. String: Sequence of characters using for the text or string
3. Boolean: True of False for logical data type
4. Undefined: A variable does not need to have a data type because
data type will be automatically assigned to variables.
5. Null: Non-existent */


/******************************************Using in ES5*************************************************/
var firstName = "Nhat"; // As a string
console.log(firstName);

var lastName = "Ho";
var age = 28; // As a integer number

var check = true; // As a boolean 
console.log(check);

var job; // Undefined
console.log(job);

job = "Software Engineering";
console.log(job);

//var function = "Variable cannot have this special name";

console.log(firstName + ' ' + lastName + ' ' + age);

var job, id, isGood; // declare multiple variable on the same line
job = "student";
id = 123456;
isGood = true;
console.log("His job is: " + job + ", and his id is: " + id);

// we can re-declare the value for variable
id = '456789';
console.log('the new id: ' + id);

// We can use alert to popup the warning message for user
alert('His job is ' + job + ', and his new id is: ' + id);

// We can ask directly the user to enter their information
var name = prompt('What is his name?');
console.log(name);

/**************************************************************/
/* For cus on using Basic Operator in JS */
/* Math operator */
var year1 = 2020-1991;
var year2 = 2020-1998;
var year3 = 2020;
var year4 = year3-year2;
var year5 = year4-12;
console.log(year1);
console.log(year2);
console.log(year3);
console.log(year4);
console.log(year5);

console.log(year1*2);
console.log(year1/2);

/* Logical */
var check = year1 > year2;
console.log(check);

// uisng typeof to show the type of variable
console.log(typeof check);
console.log(typeof "honhattan");
console.log(typeof year1);

/**************************************************************/
/* For cus on priority of Operator in JS */
/* Link reference:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence */
var one = 10;
var two = 5;
var three = 6;
var priority = one-two >= three;
console.log(priority); // ==> - operator has higher priority than >=

var x, y;
x = y = (10+2) - 5 * 2;
console.log(x, y);

/******************************************Using in ES6*************************************************/
// Using let and const

// ES5
function introduction5(answer) {
    if (answer) {
        console.log(name);
        var name = 'honhattan';
        console.log('my name is ' + name); // work fine
    }
    console.log('my name is ' + name); // still work fine
}
introduction5(true);
// ES6
function introduction6(answer) {
    if (answer) {
        console.log(name);
        let name = 'honhattan'; // just exist in if block-scope, not in function block
        //const name = 'honhattan' // const declares a constant variable which cannot be changed
        console.log('my name is ' + name); // work fine
    }
    console.log('my name is ' + name); // but does't work here, because let and const declare a 
    //variable in a block scope that means the variable just exists in a block that was wrapped in if {}
}

// Continue to practicing let and const
let i = 8;
for (let i = 0; i < 15; i++) { // this let i just use for this for-block
    console.log(i); // 0->14 
}
console.log(i); // 8 ==> i of line 114

for (var a = 0; a < 10; a++) { // this var a for function scope
    console.log(a); // 0 -> 9
}
console.log(a); // 10

function calMyAge(birth) {
    return 2020 - birth;
}

let name1 = 'nhat tanho';
console.log(`My name is ${name1}, he was born in ${calMyAge(1992)}`);

console.log(name1.startsWith('n')); // true
console.log(name1.endsWith('ho')); // true
console.log(name1.includes(' ')); // true // checking in the middle
console.log(name1.includes('jo')); // false
console.log(name1.repeat(5)); //

let name2 = 'nhatho';
console.log(`${name2} `.repeat(2)); //nhatho nhatho


