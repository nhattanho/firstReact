/************************************************************************************* */
/* Using Call feature of function */
var nhat = {
    name: 'tan',
    age: '25',
    job: 'tutor',
    getGrade: function(grade){
        console.log('Hi everyone, my name is ' + this.name);
        if (grade < 60) {
            console.log('Grade is F');
        } else if (grade >= 60 && grade < 70) {
            console.log('Grade is D');
        } else if (grade >= 70 && grade < 80) {
            console.log('Grade is C');
        } else if (grade >= 80 && grade < 90) {
            console.log('Grade is B');
        } else {
            console.log('Grade is A');
        }
    }
};

nhat.getGrade(90);

var davi = {
    name: 'davis',
    age: 26,
    job: 'student'
};
nhat.getGrade.call(davi, 89);//=> davi object borrows the method of nhat object
//nhat.getGrade.apply(davi, 89);//==> error
nhat.getGrade.apply(davi, [89]); // ==> true
/************************************************************************************* */
/* Using Apply feature of function */
var nhat1 = {
    name: 'tan',
    age: '25',
    job: 'tutor',
    getGrade: function(grade1, grade2){
        console.log('Hi everyone, my name is ' + this.name);
        var grade = (grade1+grade2)/2;
        if (grade < 60) {
            console.log('Grade is F');
        } else if (grade >= 60 && grade < 70) {
            console.log('Grade is D');
        } else if (grade >= 70 && grade < 80) {
            console.log('Grade is C');
        } else if (grade >= 80 && grade < 90) {
            console.log('Grade is B');
        } else {
            console.log('Grade is A');
        }
    }
};

nhat1.getGrade(89, 98);

var davi = {
    name: 'davis',
    age: 26,
    job: 'student'
};
/* Both call and apply feature have the same meaning, but they have slighly difference syntax.
With call featuer, parameters can be passed as normal function's arguments while the parameters
have to be put in [...] if we are using apply feature*/
nhat1.getGrade.call(davi, 80, 78);
nhat1.getGrade.apply(davi, [80, 78]);

/************************************************************************************* */
/* Using Bind, returning a function, feature of function to create a friendly function*/
console.log('Testing for Bind');
var nhatFriendly = nhat1.getGrade.bind(davi, 60);
nhatFriendly(89);

//==> the same as
var nhatFriendly = nhat1.getGrade.bind(davi, 60, 89);
nhatFriendly();

// Also the same as
nhat1.getGrade.call(davi, 60, 89);

/* However, with the bind feature, we can create a friendly function which allows
us do not need to reset all of arguments. */
console.log('test for creating a friendly function');
var nhatFriendly1 = nhat1.getGrade.bind(davi, 60);
nhatFriendly1(89); // <=> nhat.getGrade.call(davi, 60, 89);
nhatFriendly1(100); // <=> nhat.getGrade.call(davi, 60, 100);
nhatFriendly1(79); // <=> nhat.getGrade.call(davi, 60, 79);

/* Note: we can conclude that the function with call, apply, or bind has 2 parts of argument.
1: the object <=> likes davi
2: normal parameters <=> like 60, 89 */

// Continuing to use Bind feature
console.log('test for practicing more Bind feature');
var years = [1992, 2004, 2006, 1889];
function testCal(ages, checkAldult) {
    var temp = [];
    for(var i = 0; i < ages.length; i++) {
        temp.push(checkAldult(ages[i]));
    }
    return temp;
}

function calAge(year) {
    return 2020 - year;
}

function isfullAge(age){
    // we are using hard-code for this function with 18
    return age>=18; 
}

var ages = testCal(years, calAge); //[28, 16, 14, 131]
console.log(ages);

/*
var res1 = testCal(res, isfullAge);
console.log(res1); */

// Now we are using another function helping us escape
// isfullAge's strict problem.
function fullAge(adultRequire, age){
    return age >= adultRequire;
}

var ans = testCal(ages, fullAge.bind(this, 20));//adultRequire = 20
console.log(ans);//[true, false, false, true] <=> 28 > 20 ==> true, 16 < 20, 14 < 20, 131 > 20

/* Explain: as we know that the function testCal need to arguments. They include
one array and one function having one argument. Firstly, we can see ages is an
array. We just need to understand why "fullAge.bind(this, 20)" is satisfied the
requirements as a second parameters of testCal function. 

As what we've learned so far, we known calling the bind feature always return a function,
so we can write: var friendlyCheck = fullAge.bind(this, 20), and we agree that
friendlyCheck funtion is friend of fullAge function, and it have one argument which
is an age variable. */

