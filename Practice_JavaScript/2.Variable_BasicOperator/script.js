/* Focus on how to using Variable in JS*/
/* Type of variable of JavaScript:
1. Number: Using floating numbers for decimal ans integers
2. String: Sequence of characters using for the text or string
3. Boolean: True of False for logical data type
4. Undefined: A variable does not need to have a data type because
data type will be automatically assigned to variables.
5. Null: Non-existent */

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