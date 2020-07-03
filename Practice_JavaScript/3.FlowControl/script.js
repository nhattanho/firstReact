/* The difference between == and === 
Link reference:
https://www.java67.com/2013/07/difference-between-equality-strict-vs-operator-in-JavaScript-Interview-Question.html
When using the ==, the variable can have different data type, because the one variable will be
automatically converted to the data type of other, then the comparison happens with two variable
having the same data type.
However, with === comparison, the first requirement for a true result is two variables have to have
the same data type. So, if they are different type, the result has certainly wrong answer. Example:
0==false   // true, because false is equivalent of 0
0===false  // false, because both operands are of different type
2=="2"     // true, auto type coercion, string converted into number
2==="2"    // false, since both operands are not of same type */

var name = "honhattan";
var status = "single";

if (status === 'married') {
    console.log(name + ' is married!');
} else {
    console.log(name + ' is single!');
}

var user1Name = prompt('Enter the name of user1: ');
var user1Mass = prompt('Enter the mass of user1(kg): ');
var user1Height = prompt('Enter the height of user1(cm): ');
alert(user1Name + ' has the mass: ' + user1Mass + ' kg' + ' and the height: ' + user1Height + ' cm');
var BMIUser1 = user1Mass / (user1Height*user1Height);

var user2Name = prompt('Enter the name of user2: ');
var user2Mass = prompt('Enter the mass of user2(kg): ');
var user2Height = prompt('Enter the height of user2(cm): ');
alert(user2Name + ' has the mass: ' + user2Mass + ' kg' + ' and the height: ' + user2Height + ' cm');
var BMIUser2 = user2Mass / (user2Height*user2Height);

if (BMIUser1 > BMIUser2) {
    console.log('user1 has higher BMI than user2');
} else {
    console.log('user2 has higher BMI than user1');
}

//==> going to fix
if (BMIUser1 > BMIUser2) {
    console.log('user1 has higher BMI than user2');
} else if (BMIUser1 === BMIUser2) {
    console.log('They have the same BMI!');
} else {
    console.log('user2 has higher BMI than user1');
}

//==> going to more boolean logic with if else statement
var number = 11;
if (number < 11) {
    console.log('the number is less than 11');
} else if (number >= 11 && number <= 20) {    
    console.log('the number is in the range of [11,20]');
} else {
    console.log('the number is greater than 20');
}

// ==> ternary operator
number >= 11 ? console.log('the number is greater than or equal 11')
: console.log('the number is less than 11');

var test = number >=11 ? 'greater or equal' : 'less';
console.log(test);

// going to switch case
var job = 'student';
switch (job) {
    case 'teacher':
        console.log('the job is teacher');
        break;
    case 'engineering':
        console.log('the job is engineering');
        break;
    case 'student':
        console.log('the job is student');
        break;
    default:
        console.log('cannot realize the job');
}

// the second way to use switch case
var test = 'student';
switch (true) {
    case test === 'teacher':
        console.log('the job is teacher');
        break;
    case test === 'engineering':
        console.log('the job is engineering');
        break;
    case test === 'student':
        console.log('the job is student');
        break;
    default:
        console.log('cannot realize the job');
}