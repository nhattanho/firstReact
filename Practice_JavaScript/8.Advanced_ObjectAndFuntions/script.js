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
, however, the calAge function as well as lastname properties are prototype properties
just only of Person1, they're not properties of nhat1 object. The reason nhat1 object 
can access to these properties because it have a heritance from Person1. On the other hand,
we can say nhat1 is instance of Person1 */
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