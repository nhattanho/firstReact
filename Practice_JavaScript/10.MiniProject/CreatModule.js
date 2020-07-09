
/* Example of modules */
var budgetController = (function() {
    /* Private properties
    cannot be accessed from the outside, example: budgetController.add(3) ==> wrong */
    var x = 45;
    var add = function(a) {
        return x + a;
    }
    /**********************/

    /* Modules always return an object that can access by the outside function */
    return {
        publicTest: function(b) { //publicTest is a method of returned object
            return(add(b));// so, we can use like budgetController.publicTest(4)
        }
    }
})();

var UIController = (function() {

})();

var controller = (function(budgetCtrl, UICtrl) {
    var z = budgetCtrl.publicTest(5);
    return {
        anotherPublic: function() {
            console.log(z);
        }
    }
})(budgetController, UIController);
