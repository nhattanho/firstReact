/*******************************Asynchronous**************************/
const first = () => {
    console.log('Hello, I am number 1');
    second();
    console.log('Good bye');
};

const second = () => {
    setTimeout( ()=> {
        console.log('I am number 2');
    }, 2000);
};

first();

/* OUTPUT 
Hello, I am number 1 
Good bye //asynchronous.js:4:13
I am number 2
*/

/***********************Going to callback hell in JS*********************/
/**********Callback was called in a callback function, and so on************/
function getGrade() {
    setTimeout( () => {
        let grade = [56, 79, 78, 98];
        console.log(grade);

        setTimeout( (id) => {
            let obj = {name: 'nhatho', age: 29};
            console.log(`this character ${obj.name} has grade ${id}`);

            setTimeout(age => {
                console.log(`His age is ${age}`);
            }, 1000, obj.age);
        }, 1000, grade[1]); // grade[1] will be passed in to callback function as id
    }, 1500);
}
getGrade();
/*******************************************************************/

/*************************==> Using Promises to avoid Callback hell*******************************/
console.log('We are using promises');
let grades = new Promise( (resolve, reject) => {
    console.log('we are in grades promise'); // when grades was called, this line will be processed immediately
    setTimeout( () => { // just all of code in setTimeout will be forced to run in background
        resolve([100, 92, 89, 98]);// assume the promise successfully finish and using resolve to return the data
        // assume the promise was failed
        //reject();
    }, 5000);
});

let getGra = function(grade) {
    return new Promise( (resolve, reject) => {
        console.log('we are in getGra promise');
        setTimeout( (grade) => {
            let obj = {name: 'nhatho', age: 29};
            // this string will be returned when this promise finish
            resolve(`this character ${obj.name} has grade ${grade}`); 
        }, 5000, grade);
    });
};

// Calling a promist and it will run in background, and then, the other code still continue running
grades.
then(gras => { // argument grades is the result/array which was returned by its Promise function 
    // happen when the promise was successfully
    console.log(gras); //[100, 92, 89, 98]

    // getGra is a result of a function that return a Promise, so now getGra is a promise
    // <=> we are calling a promise at line 75, ==> we need to handle with then or catch
    //getGra(gras[1]); ==> we can handle like: getGra(gras[1]). then (arguments).catch(arguments) <=> just like
    // going to Promise Hell 
    /*
    getGra(gras[1])
    .then(result => {
        console.log(result); //this character nhatho has grade 92
    })
    .catch (err=>{
        console.log(err);
    })
    */
    //==> therefore, we solve this inconvinence by return this Promise
    // it self at here. Like:
    return getGra(gras[1]);
})
.then(result => {
    console.log(result);
})
//happen when the promise was rejected
.catch(error => {
    console.log('Error ' + error);
});
console.log('******************************************************************************');
/* Note: As we can see, if we have a lot of Promise event, but only have one even to catch the 
error
*/
// /*************==> Using Async/Await to consume promise ==> make programmer's life easier********/

console.log('We are using Async/Await');
let grades1 = new Promise( (resolve, reject) => {
    setTimeout( () => {
        resolve([1, 56, 74,90]);// assume the promise successfully finish and using resolve to return the data
        // assume the promise was failed
        //reject();
    }, 1000);
});

let getGra1 = function(grade) {
    return new Promise( (resolve, reject) => {
        setTimeout( (grade) => {
            let obj = {name: 'nhatho', age: 29};
            // this string will be returned when this promise finish
            resolve(`this character ${obj.name} has grade ${grade}`); 
        }, 8000, grade);
    });
};

// async function will handle all promises in background
async function getGrades() { // async returns a promise
    console.log('We are in async function');

    /* The part of code from line 126 to 138 will be put and forced to run in background <=> that means
    whenever program catches the await command, it will put all of code from its line to the end exept 
    returning command*/
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
    /************************************************************************************/

    return getGra;
}

/*
var str = getGrades(); // the result will be: Promise { <state>: "pending" }
console.log(str); // so we have to fix by using then method of async function
console.log('checking for waiting');
*/
//=> fix:
getGrades().then(result => { //result is getGra which was returned by getGrades() function
    console.log(result);
});
console.log('We are checking again!');
/* OUTPUT
We are using Async/Await asynchronous.js:98:9
We are in async function asynchronous.js:119:13
We are checking again! asynchronous.js:151:9
Array(4) [ 1, 56, 74, 90 ]
this character nhatho has grade 74 asynchronous.js:127:13
We are end-in async function asynchronous.js:133:13
11
Array(4) [ 1, 56, 74, 90 ] */
