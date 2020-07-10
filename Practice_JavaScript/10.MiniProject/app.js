/* Recall: Function can return an object or function. An object's method can be a function
One function constructor can create some objects ==> function in JS likes class concept in 
other language programming.

+ UIController: handling the input and output, interface of APP

+ AppNameController: handling the functions supporting the UIController.
  It just likes settling everything what happens behind the scenes
*/

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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current){
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [], // each element which is an item contains id, description, and value
            inc: [] // or it is an object created by Expense or Income function constructor
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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

        calculateBudget: function() {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget = income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage
            if (data.totals.inc > 0) {
                data.percentage = Math.round( (data.totals.exp/data.totals.inc)*100 );
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function() {
            console.log(newItem);
        }
    };

})();

/* UI Controller: Handle features relating to the input, output of GUI */
var UIController = (function() {
    // Created an object: an object was used by multiple functions
    var DOMstring = { // contains all necessary classes or ids
        inputType: '.add__type',
        inputDes: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        budgetIncome: '.budget__income--value',
        budgetExpense: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    };
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDes).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value)
            }
        },

        getDOMstring: function() {
            return DOMstring;
        },

        clearField: function() {
            var fields, fieldsArr;
            /* fields is a NodeList [ input.add__description, , input.add__value] */
            fields = document.querySelectorAll(DOMstring.inputDes + ', ' + DOMstring.inputValue);
            //console.log(fields);

            /* fieldsArr is an array has 2 element [ input.add__description, input.add__value ] */
            fieldsArr = Array.prototype.slice.call(fields); // slice is a method of array
            //console.log(fieldsArr);

            /* go through the fields array and set its value is empty */
            fieldsArr.forEach(function(current, index, array) { // array argument is fieldsArr in this case
                current.value = ""; // is pointing to the element of this array: input.add__value and input.add__description
                /* line above is equal:
                document.querySelectorAll(DOMstring.inputValue).value = '';
                document.querySelectorAll(DOMstring.inputDes).value = ''; */
            });
            fieldsArr[0].focus();//first element is class .add__description
        },

        displayBudget: function(obj) {
            document.querySelector(DOMstring.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstring.budgetIncome).textContent = obj.totalInc;
            document.querySelector(DOMstring.budgetExpense).textContent = obj.totalExp;
            if (obj.percentage > 0) {
                document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstring.percentageLabel).textContent = '---';
            }
        },

        addListItem: function(obj, type) {
            // Create HTML string with placeholder text
            var html, element;
            if (type === 'inc') {
                element = DOMstring.incomeContainer;
                html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%'
                + '</div><div class="right clearfix"><div class="item__value">%value%</div>'
                + '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close'
                + '-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = DOMstring.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%'
                + '</div><div class="right clearfix"><div class="item__value">%value%</div><div class='
                + '"item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">'
                + '<i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Replace the placeholder text with some actual data
            html = html.replace('%id%', obj.id);
            html = html.replace('%description%', obj.description);
            //console.log(obj.description);
            html = html.replace('%value%', obj.value);
            /********Checking for output html**************/
            //console.log(html);
            /**********************************************/
            
            /**************************************************************************
             * Explanation for: element.insertAdjacentHTML(position, text)
             * Link reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
             * 1. This is a method helps developer can expand the snippet html, which can
             * be repeated, by using script
             * 2. element can be a class or id appreared in html
             * 3. position is where we are pointing to check for appending
             * a. 'beforebegin' ==> apend before the element's scope
             * 
             * b. 'afterend' ==> apend after the element's scope
             * 
             * c. 'afterbegin' ==> Just inside the element's scope, before its first child
             * <=> adding from the top <=> the new adding element always next to the begin position
             * 
             * d. 'beforeend': Just inside the element's scope, after its last child.
             * <=> adding from the bottom <=> the new adding element always next to the end position
             * 
             * Visualization of position names:
             * <!-- beforebegin --> 
                <p class='' id=''> // ==> this is beginning position of element we're checking for appending
                    <!-- afterbegin --> //third adding     ^
                    <!-- afterbegin --> //second adding    |
                    <!-- afterbegin --> //first adding     |

                    foo // this is an example for the first child

                    <!-- beforeend --> // first adding     |
                    <!-- beforeend --> // second adding    |
                    <!-- beforeend --> // third adding     v
                </p> // ==> this is ending position
               <!-- afterend -->
             *****************************************************************************/
            //Insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
            //document.querySelector(element).insertAdjacentHTML('afterbegin', html);
        }
    };
})();

/* Global App Controller: Where app calls and combines the function from Budget and UI controller */
var controller = (function(BudgetCtrl, UICtrl) {
    var input, newItem;
    var DOM = UICtrl.getDOMstring();

    var updateBudget = function() {
        // Calculate the Budget
        BudgetCtrl.calculateBudget();
        // Return the budget
        var budget = BudgetCtrl.getBudget();// an object
        /*  budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage 
        */

        // Display the budget on the UI
        //console.log(budget);
        UICtrl.displayBudget(budget);

    };

    var ctrlAddItem = function() {
        // Get the input data from the users
        input = UICtrl.getInput(); //type, description, value from user
        /****************Testing for input*********************/
        //console.log(input);
        /******************************************************/

        // Validate inputs
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // Add the item to the budget controller
            newItem = BudgetCtrl.addItem(input.type, input.description, input.value);//==>id, des, val
            /****************Testing for newItem***************** */
            //console.log(newItem);
            /******************************************************/

            // Add the item to the UI
            UICtrl.addListItem(newItem,input.type);

            // Clear the fields
            UICtrl.clearField();

            // Calculate the budget
            updateBudget();
        }
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
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1 
            });
            setupEventListener();
        }
    };
    
})(budgetController, UIController);

controller.init();