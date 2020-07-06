// creating the object
var nhat = {
    name: 'John',
    birthYear: 1990,
    job: 'student',
};

// Create a function constructor <=> function expression
var Person = function(name, birthYear, job) {
    this.name = name;
    this.birthYear = birthYear;
    this.job = job;
};
// by calling the constructor function, we created the new object
var nhat = new Person('nhat', 1990, 'student');
console.log(nhat);

var Person1 = function(name, birthYear, job) { // it is special function expression, called constructor function
    this.name = name;
    this.birthYear = birthYear;
    this.job = job;
    /*
    this.calAge = function() {
        console.log(2020-this.birthYear);
    };*/
};

//var nhat1 = Person1('nhat1', 1992, 'learner'); // wrong, because it's not return anything, it is constructor
//console.log(nhat1); // so we can not assignt it by any variable, we have to use new operator to create the new object
//==>
var nhat1 = new Person1('nhat1', 1992, 'learner');
//nhat1.calAge();

// Create Prototype outside of constructor function
Person1.prototype.calAge = function() {
    console.log(2020-this.birthYear);
}
Person1.prototype.lastname = 'ho';

/* Note: nhat1 is an object of Person1, so name, birthYear, job are also its properties
, however, the calAge function as well as lastname properties are properties just only of
Person1, they're not properties of nhat1 object. The reason nhat1 object can access to
these properties because it have a heritance from Person1. On the other hand, we can say
nhat1 is instance of Person1 */
console.log(nhat1.lastname);
console.log(nhat1.calAge);
console.log(nhat1.hasOwnProperty('job'));//==> true
console.log(nhat1.hasOwnProperty('calAge'));//false
console.log(nhat1.hasOwnProperty('lastname'));//==>false
console.log(nhat1 instanceof Person1);

// Now, we remind the function expression
var cal = function(number1, number2) {
    return number1 + number2;
}
var sum = cal(3,4);
console.log(sum);

//Show the Prototype Chain
var x = [1, 3, 5];
console.info(x);// show all information of x from elements as well as all its methods

// Continue to create an Object by using Object.create
var personProto = {
    calAge: function() {
        console.log(2020 - this.birthYear);
    }
};

var nhat = Object.create(personProto); // recall: var nhat = new Object();
nhat.name = 'nhatho';
nhat.birthYear = '1990';
nhat.job = 'tutor';
console.log(nhat.hasOwnProperty('calAge'));//==> false
console.log(nhat.hasOwnProperty('name')); // ==> true
console.log(nhat);// will show all prototype chain of nhat object ==>
// help us to inspect an object

//Primitives vs objects just like passing a value vs a refrences

/* 1.Primitive */
var a = 23;
var b = a; // ==> b = 23
a = 46;
console.log(a); //==> 46
console.log(b); //==> 23

/* 2.Object */
var obj1 = {
    name: 'nhattan',
    job: 'student'
};

var obj2 = obj1;
obj1.job = 'tutor';
console.log(obj1.job);//==>tutor
console.log(obj2.job);//==>tutor, because 2 objects point to the same memory <=> refrences in C++

// Passing primitives vs passing object into a function
var age = 29;
var tan = {
    name: 'tanho',
    birthYear: 1992
};

function change(a, b) {
    a = 30;
    b.name = 'nhattan';
}

change(age,tan);
//check the value of age and tan.name after calling the function
console.log(age);// age = 29 <=> pass value
console.log(tan.name);//tan.name = nhattan <=> pass reference

/*************************************************************************************/
// Dying in Function
var years = [1992, 2004, 2006, 1889];
function testCal(arr, func) {
    var temp = [];
    for(var i = 0; i < arr.length; i++) {
        temp.push(func(arr[i]));
    }
    return temp;
}

function calAge(year) {
    return 2020 - year;
}

function isfullAge(year){
    return year>=18;
}

var res = testCal(years, calAge);
console.log(res);

var res1 = testCal(res, isfullAge);
console.log(res1);

/*************************************************************************************/
//Funtion return function
function checkLevel(level) {
    if(level === 'A') {
        return function(name) {
            console.log('Hi ' + name + ', you are great candidate!');
        };
    } else if (level === 'B') {
        return function(name) {
            console.log('Hi ' + name + ', you\'re good now, but need to learn more.');
        }
    } else {
        return function(name) {
            console.log('We regret to inform you that you are not matching with our position!');
        }
    }

}

var getRes = checkLevel('A');
getRes('nhat');
checkLevel('B')('tan');

/*************************************************************************************/
//IIFE: Immediately invoked Function Expression
/* Recall: we've known already function declaration and function expression
And now, invoked function expression just likes a combination of them*/

(function(yourGrade) {
    var grade = Math.random()*11;
    console.log((grade + yourGrade)/2);
})(9);

/* it similar to:
1. Function Declaration */
function calGrade(yourGrade) {
    var grade = Math.random()*11;
    console.log((grade + yourGrade)/2);
}
calGrade(9);

/* 2.Function Expression*/
var calGrade = function(yourGrade) {
    var grade = Math.random()*11;
    console.log((grade + yourGrade)/2);
};
calGrade(9);

/*************************************************************************************/
/* Funtion into a function */

/*Note: function(birthYear) is a function expression, however, we can call it before we write
a function expression as following the code at line 198. But it not true when we say we have call
the function(birthYear) before we declare a function expression. Actually, yearToRetire(65)(1990)
<=> var getFunction =  yearToRetire(65);
    getFuntion(1990)
==> it is very clear that we declared a function expression before calling it*/
yearToRetire(65)(1990);

function yearToRetire(AgeRetire) {
    var message = ' years left';
    //console.log(message);
    /* Anonymous function or called inner funtion*/
    return function(birthYear) { //it is all a function expression
        var age = 2020 - birthYear;
        console.log(AgeRetire - age + message);// inner function can access the parental function's variable
    }
}

yearToRetire(65)(1992);

function sum1(num1, num2){
    console.log(num1+num2);
}
sum1(1,2);//just run only one time for function having the same parameters 
sum1(1,2);
/*************************************************************************************/


