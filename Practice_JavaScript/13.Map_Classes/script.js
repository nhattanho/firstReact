/***********************************Using Map in JS*************************/
let question = new Map();
question.set('question', 'What is your favorite color?');
question.set(1, 'red');// key, value
question.set(2, 'blue');
question.set(3, 'yellow');
question.set(4, 'green');
question.set(true, 'correct answer!');
question.set(false, 'wrong, please try again!');

console.log(question.get('question'));
console.log(question.size);

if (question.has(4)) {
    //question.delete(4);//delete an element in map
    console.log('value of this key is ' + question.get(4));
}
// we also can erase the map by using
//question.clear();

// Map use the forEach method
question.forEach( (value, key) => {
    console.log(`This ${key} has the value is ${value}`);
});

//Using rest parameters
question.forEach( (...arguments)=> { //value, key
    let value = arguments[0];
    let key = arguments[1];
    console.log(`this ${key} has the value is ${value}`);
});

// Using destructure
for (let el of question) {
    console.log(`this key ${el[0]} has value is ${el[1]}`);
}

// Using question.entries() to return a pair of (key, value)
console.log('**********************************************************');
console.log(`${question.get('question')}`);
for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

/***********************************Using Classes in JS*************************/
//ES5
var Person5 = function(name, year, job) {
    this.name = name;
    this.year = year;
    this.job = job;
}

Person5.prototype.calAge = function() {
    var age = new Date().getFullYear() - this.year;
}

var nhat5 = new Person5('Nhat', 1991, 'tutor');

//ES6
/*
let agetest = new Date().getFullYear() -1992;
console.log(agetest);
*/
console.log('Testing for using classes in ES6');
class Person6 {
    constructor(name, year, job) {
        this.name = name;
        this.year = year;
        this.job = job;
    }

    // This is a method of class, can be accessed by an object of Class Person6
    calAge() {
        var age = new Date().getFullYear() - this.year;
        return age;
    }

    // static method only attach directly to the Person6, not for instance/object of class Person6
    static sayHello() {
        console.log('Nice to meet you!');
    }
}
let nhat6 = new Person6('Nhat', 1991, 'instructor');
console.log(nhat6);
console.log(nhat6.calAge());

Person6.sayHello();
//nhat6.sayHello(); //==> this have a error

/***********************************Using Subclasses in JS*************************/
//*******************************************ES5************************************/
console.log('Testing for using subclasses in JS');
var Person51 = function(name, year, job) {
    this.name = name;
    this.year = year;
    this.job = job;
}

Person51.prototype.calAge = function() {
    var age = new Date().getFullYear() - this.year;
    //console.log(age);
    return age;
}

var Student51 = function(name, year, job, vehicle, country) { // Person51 is supper function constructor
    Person51.call(this, name, year, job); // this now is point to the object of Student51 constructor
    this.vehicle = vehicle;
    this.country = country;
};

// Inheritance all prototypes of super class: Person51
Student51.prototype = Object.create(Person51.prototype); // Person51 is a parent/super class/Constructor of Students
// Its own prototype
Student51.prototype.changeCar = function(newVeh) {
    this.vehicle = newVeh;
};

var nhattan = new Student51('nhat', 1991, 'tutor', 'toyota', 'American');
console.log(nhattan.year);//1991
console.log(nhattan.calAge());//29
//nhattan.calAge();
nhattan.changeCar('Tesla');
console.log(nhattan.vehicle);

//***************************************ES6************************************//
console.log('Testing subclass for ES6');
class Person61 {
    constructor(name, year, job) {
        this.name = name;
        this.year = year;
        this.job = job;
    }

    // This is a method of class, can be accessed by an object of Class Person6
    calAge() {
        var age = new Date().getFullYear() - this.year;
        return age;
    }

    // static method only attach directly to the Person6, not for instance/object of class Person6
    static sayHello() {
        console.log('Nice to meet you!');
    }
}

class Student61 extends Person61 {
    constructor(name, year, job, vehicle, country){
        super(name, year, job);
        this.vehicle = vehicle;
        this.country = country;
    }

    changeCar(vehicle) {
        this.vehicle = vehicle;
    }
}

var nhat = new Student61('nhatho', 1990, 'player', 'honda', 'Canada');
console.log(nhat.calAge());// inherit form its parent class
nhat.changeCar('BMW'); // its own method
console.log(nhat.vehicle); 

