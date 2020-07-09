/* Recall: Function can return an object or function. An object's method can be a function
One function constructor can create some objects ==> function in JS likes class concept in 
other language programming */

/* Budget Controller: Handle main features in App */
var budgetController = (function() {
    // Function Constructor: multiple objects have the same properties ==> using function constructor <=> likes class concept
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {// type description value
            var newItem, ID;
            /*  position: 1   2   3   4   5   6
                ID      : 0   1   2   3   4   5
                ==> after removing the value 4 and 5:
                position: 1   2   3   4
                ID      : 0   1   2   5
                 ==> the position has been updated
                ==> assume adding the new value which has to be 7 (in order: 1 2 3 4 5 6 7, and so on)
                ==> has to get the last value + 1 <=> 7 = data[data.length - 1] + 1 */
            var currentLastPos = data.allItems[type].length -1;
            if (currentLastPos === -1) ID = 0;
            else {
                ID = data.allItems[type][currentLastPos].id + 1;
            }
            if (type === 'exp') {//expense
                newItem = new Expense(ID, des, val);
            } else { //income
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function() {
            console.log(newItem);
        }
    };

})();

/* UI Controller: Handle features relating to the input, output of GUI */
var UIController = (function() {
    // Created an object: an object was used by multiple functions
    var DOMstring = {
        inputType: '.add__type',
        inputDes: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDes).value,
                value: document.querySelector(DOMstring.inputValue).value
            }
        },

        getDOMstring: function() {
            return DOMstring;
        },

        addListItem: function() {
            
        }
    };
})();

/* Global App Controller: Where app calls and combines the function from Budget and UI controller */
var controller = (function(BudgetCtrl, UICtrl) {
    var input, newItem;
    var DOM = UICtrl.getDOMstring();
    var ctrlAddItem = function() {
        // Get the input data from the users
        input = UICtrl.getInput();
        //console.log(input);
        // Add the item to the budget controller
        newItem = BudgetCtrl.addItem(input.type, input.description, input.value);
        console.log(newItem);
        // Add the item to the UI

        // Calculate the budget

        // Display the budget on the UI
    };

    /* Handling for click button or press the key */
    var setupEventListener = function() {
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {//called by hitting the keypress
        //console.log(event); //testing for event
            if (event.keyCode === 13 || event.which === 13)  {
                //console.log('Enter was pressed.'); // just for testing
                ctrlAddItem();
            }
        });
    };    

    return {
        init: function() {
            console.log('Application has started!');
            setupEventListener();
        }
    };
    
})(budgetController, UIController);

controller.init();