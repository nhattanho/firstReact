/*+ Fix decimal number: a.toFixed(2) */

/*+ Jason mehtod also returns a promise*/

/*+ Passing Primitive vs Object <=> passing value vs reference into a function*/
/* Primitive: Numbers, strings, booleans, Undefined, Null
   Object: Arrays, Functions, Objects, Dates, Wrapper function for (Numbers, strings, booleans) */
   var arr = [1, 2, 3, 4];
    var newarr = arr;
    console.log(newarr);// [1, 2, 3, 4]
    arr[2] = 5;
    console.log(newarr);// [1, 2, 5, 4]

/*+ Closure when happing a function returns a function <=> static variable*/

/*+ Hoisting <=> function/variable declaration vs function expression*/

/*+ Call css class from js script by using classList method:*/

    document.querySelectorAll('.name_of_class_inHTML').classList.add('className_offCSS');
    document.querySelectorAll('.name_of_class_inHTML').classList.remove('className_offCSS');
    document.querySelectorAll('.name_of_class_inHTML').classList.toggle('className_offCSS');

/*+ Adding div section for HTML by using script js ==> using insertAdjacentHTML, example:*/

    document.querySelector(element).insertAdjacentHTML('beforeend', html);

/*+ Nodelist doesn't have forEach and map method while Array does ==> convert a Nodelist to an Array by using
slice and call method, example:*/

    fields = document.querySelectorAll(DOMstring.inputDes + ', ' + DOMstring.inputValue); // return a Nodelist
    fieldsArr = Array.prototype.slice.call(fields); // An array already
    fieldsArr.forEach(function(current, index, array) {
        current.value = "";
    }
    fieldsArr[0].focus();

//Or:
    1. var newfields = [h, ...fields]; // Spread Operator in ES6, garthering some nodelists into an array
       fieldsArr = Array.from(newfields);
    2. fieldsArr = Array.from(fields) // In ES6
Besides, in ES6, array also has some method like:

    console.log(ages.findIndex(cur => {
    return cur >= 18;
    }));

    console.log(ages.find(cur => cur >= 18)); // just show the first element in a array that satisfies the requirement

/*However, if we still handle directly on Nodelist, we can do:*/
    var fields = document.querySelectorAll(DOMstring.expPercentage);
    var nodelistForEach = function(list, callback) {
            for(var i = 0; i < list.length; i++) {
                callback(list[i], i);
            }
    };
    nodelistForEach(fields, function(current, index) {
        if (percentages[index] > 0) {
            // current  = document.querySelector(DOMstring.expPercentage)
            current.textContent = percentages[index] + '%'; 
        } else {
            current.textContent = '---';
        }
    });


/*+ The difference between var at ES5 and let/const at ES6:
    - var <=> function scope while let and const <=> block scope. Hoisting in variable expression <=> we have to
    declare before we call it. That means no matter we are using var or let/const, we need to declare before using
    it, but the difference is with var when we call the variable before we declare it, it just warning about this
    variable is undefined ==> it's really dangerous. Therefore, to prevent this happening, we can use let/const
    because, with the same case as using var, it would throw an error to the programmer.*/

/*+ Using backtick ` `  to combine the string and variable when we want to printOut, example:*/
    let name = 'nhat tanho';
    console.log('My name is ' + name + ', he is  ' + age); // ES5
    console.log(`My name is ${name}, he is ${age}`); //ES6
    console.log(name1.startsWith('n')); // true
    console.log(name1.endsWith('ho')); // true
    console.log(name1.includes(' ')); // true // checking in the middle
    console.log(name1.includes('jo')); // false
    console.log(name1.repeat(5)); //

    let name2 = 'nhatho';
    console.log(`${name2} `.repeat(2)); //nhatho nhatho

/*+ In method map or forEach of Array in JS, it has already setup the order for the arguments of the callback function,
for example:*/
    // ==> the cur is a current element in a array
    // ==> index is a position of this element
    // arr is itself 
    array.map( function(cur, index, arr){
        // do something here
    } );

/*+ Understanding about method filter of Array*/
    const newArr = [34, 67, 89, 40];
    const get = newArr.filter(el => el < 67);
    console.log(get); // 34, 40 ==> return an array which contains all elements satisfying the comparison

/*+ Note: we need to be careful when using the this keyword for an object that have many functions in its.
Example:*/
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
adding line: var self = this; */
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

/*2. Using arrow function in ES6*/
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

/*However , if we use:*/
var box6 = {
    color: 'green',
    position: 1,
    clickMe: ()=> {
        var node = document.querySelector('.blue');
        node.addEventListener('click', ()=> {
            console.log(`You have just clicked on the box number ${this.position} by using arrow function feature!s`);
        });
    }
};

/*We can see this keyword of click event function will be shared with the clickMe function, then it will continue 
sharing with the function in global that is outside of the object box6. Therefore, this keyword now doesn't point
to the box6 object. Instead of that, it is pointing to the window object.*/

/*+ Understanding about call, apply, and bind method (can use bind to pass object as an argument into callback function)*/

/*+ Understanding about Destructuring: for array, object, function
    - let anArray = Array.from(Nodelist)
    - for(let cur of anArray) {} or for (let cur of Nodelists) {}
    - let [name, age] = ['nhat', 28]; */

/*+ Using Map
    - let question = new Map();
    - question.set(1, 'red'); // key, value
    - question.get(1)
    - question.size ==> get the size of map
    - question.has(4) ==> check whether key 4 exist or not
    - Map can use method forEach like an array
        question.forEach( (value, key) => { // first: value, second: key
            console.log(`This ${key} has the value is ${value}`);
        });

        question.forEach( (...arguments)=> { //value, key, using rest parameters
            let value = arguments[0];
            let key = arguments[1];
            console.log(`this ${key} has the value is ${value}`);
        });

        // Using destructure
        for (let el of question) { // first: key, second: value
            console.log(`this key ${el[0]} has value is ${el[1]}`);
        }

        // Using question.entries() to return a pair of (key, value)
        console.log('**********************************************************');
        console.log(`${question.get('question')}`);
        for (let [key, value] of question.entries()) { // first: key, second: value
            if (typeof(key) === 'number') {
                console.log(`Answer ${key}: ${value}`);
            }
        } */

/*+ Classes in ES6*/
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

        // static method just only attach directly to the Person6, not for instance/object of class Person6
        static sayHello() {
            console.log('Nice to meet you!');
        }
    }
    let nhat6 = new Person6('Nhat', 1991, 'instructor');
    console.log(nhat6);
    console.log(nhat6.calAge());

    Person6.sayHello(); // this work fine
    nhat6.sayHello(); // so, this line will have the error

/*+ Pass a argument for a callback function which called by setTimeout function:*/
    setTimeout( (id) => {
        let obj = {name: 'nhatho', age: 29};
        console.log(`this character ${obj.name} has grade ${id}`);
    }, 1000, grade[1]); // grade[1] will be passed in to callback function as id
    /* Note: in above case, setTimeout has 3 arguments: callback function which has one parameter called id,
    time setting for timeout, and the last is grade[1]. In that, grade[1] was treated as id that is a argument
    of callback function */

/*+ if an object/function is a promise or return a promise or a async function ==> it can use the method then
and catch. However, if we want to await an object/function ==> this object/function has to be a promise or
return a promise. A async function cannot be awaited by the other which outside the async function. On the 
other word, await is only valid in async functions and async generators
Example: */
    let grades1 = new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve([1, 56, 74,90]);// assume the promise successfully finish and using resolve to return the data
            // assume the promise was failed
            //reject();
        }, 1000);
    });
    grades1.then().catch();
/*==> grades1 is a promise, so it can use then and catch method */
    let getGra1 = function(grade) {
        return new Promise( (resolve, reject) => {
            setTimeout( (grade) => {
                let obj = {name: 'nhatho', age: 29};
                // this string will be returned when this promise finish
                resolve(`this character ${obj.name} has grade ${grade}`); 
            }, 8000, grade);
        });
    };
    getGra1().then().catch();
/*==> getGra1 returns a promise, so it can use then and catch method as well */

    async function getGrades() { // async returns a promise
        try {
            console.log('We are in async function');
            const getGra = await grades1; // getGra will hold the array which was returned from grades1 promise
            console.log(getGra);
            const getInfo = await getGra1(getGra[2]); // getInfor now is a string returned by getGra1 function
            console.log(getInfo);
            /*If at here we return the getInfo like: "return getInfo;", and outside of function, we want to print
            this by using: "console.log(getGrades())" ==> it doesn't work correctly because all promises is running
            in the backgournd, and getInfo hasn't got the result already, so return command will return nothing,==>
            "console.log(getGrades())" can not print out the actual value. Therefore, we have to wait untill the getinfo
            receives the result from the promise. We can do by using getGrades().then() */
            console.log('We are end-in async function');
            let a = 5;
            let b = 6;
            console.log(a+b);

            return getGra;
        } catch(err){
            console.log(err);
        }
    }
    getGrades().then(result => { //result is getGra which was returned by getGrades() function
        console.log(result);
    });
/*==> getGrades is a async function, that will return a promise, so it also can use a then/catch method.
Besides, we can see that the await just appears in async function, and it has to be a promise or something
returns a promise*/


+ The Notice in Destructuring in JS about object

console.log('test for object');
let obj = {
    name1: 'tan',
    age1: 29,
    job1: 'tutor'
};

// Note: the {name1 and age1} has to be same as the name1 and age1 of obj
let {name1, age1} = obj;// name = obj.name and age = obj.age
console.log(name1 + ' ' + age1);

//we can let as below:
let {job1, age1, name1 } = obj; // doesn't matter the order of object's method(job1, name1, age1)
// The only thing we need to focus is the name of left object has to be same name as the right object
// and the JS will assign approriate value 
console.log(job1); // tutor
console.log(age1); // 29
console.log(name1); // tan

+ Format number in Link reference
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
