/* the function hoisting only works for function declaration, but not for function expression*/
/* Honestly, in JS, the program has two main phases:
1. Creation phase makes:
    a. Creation of Variable Object (VO) contains: all argument passed in to the function, function 
    declarations, and variable declaration. Both function and variable declarations has their
    properties saved in the VO, but for the function variable, all its properites point directly
    to the function while with variable declaration's properties was set to undefined. That's why
    we can call the function before or after the code that declare this function. Because call the
    function that means it will be on the rum-time process or execution phase, while all properties
    of the function declaration would be processed in creation phase that happens before the execution
    phase. Summary:
    + creation phase: function's properties saved in VO and point to its function ==> execution phase:
    call the function, it will base on the properties and use it to run program successfully.

    However, with the variable declaration in the creation phase, its properties was set to undefined,
    and not point to itself, so if we run execution phase before the declaration, it doesn't have any
    information of this variable, so it make the program fail. Therefore, we have to write the variable
    declaration before writing the code that call the variable. Summary:
    + creation phase: variable's properties saved in VO but not point to itself ==> execution phase:
      call the variable's declaration ==> using the variable
     /
    /
    \
     \
      using the variable ==> call the variable's declaration ==> false    
    b. Creation of Scop chain
    c. Determine value of this variable
2. Execution phase runs program */

// the declaration will be processed on compile time
console.log(calculate(1992)); // it still work, because the declaration of function
// has been processed in creation phase that created all properties poiting to the function
function calculate (birthYear){
    return 2020 - birthYear;
}
console.log(calculate(1992)); // it still work in execution process of program


//console.log(grade('A')); ==> it's wrong
/* with the express function <=> variable declaration, we have to call the function
after we declare function expression */
var grade = function(grade) {
    console.log(grade);
}
grade('A'); //==> it works successfully

/* Scope Chain */
 var a = 'number a';//global scope
 first();
 function first() {
     var b = 'number b';
     second();
     function second() {
        var c = 'number c';
        third();
     }
 }

function third() {
    var d = 'number d';
    //console.log(a + c); // ==> wrong, because c is variable of second function scope
    console.log(a + ' ' + d); // true, because a is global and d is its properties
}

// going to learn about this key word
console.log(this); // print out the window object

var nhat = {
    name: 'nhattan',
    birthYear: 1992,
    calAge: function () { // just like expression function <=> variable declaration
        console.log(this); // this now point to the oject "nhat"
        function innerCal() {
            /* in this case, this point to the default object which is window object.
            Though function innerCal is in the calAge function, it is not a method,
            it's just a regular function. There is only one function method that is 
            calAge function*/
            console.log(this);
        }
    }
};

nhat.calAge();

var ho = {
    name: 'honhat',
    birthYear: 1993
};
ho.calAge = nhat.calAge;
ho.calAge();