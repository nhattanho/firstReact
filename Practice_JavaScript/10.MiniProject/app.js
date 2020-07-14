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
        this.percentage = -1; // percentage for each expense
    };

    Expense.prototype.calculatePercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome)*100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
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
        percentage: -1 // percentage for label
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

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(curr) {
                curr.calculatePercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPer = data.allItems.exp.map(function(curr){ // map method can return an array while forEach doesn't
                return curr.getPercentage();
            });
            return allPer;
        },

        deleteItem: function(type, id) {
            //console.log(id);
            var index;
            var ids = data.allItems[type].map(function(current){ // return an array contains all ids of each item in data structure.
                return current.id;
            });
            //console.log(ids);
            index = ids.indexOf(id);
            //console.log(index);
            if(index !== -1){ // the id have to be existed in the array
                data.allItems[type].splice(index, 1);//position, number of elements will be deleted
            }
        },

        testing: function() {
            console.log(data);
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
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expPercentage: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatNumber = function(num, type) {
        if (num === 0) return num.toFixed(2);
        num = num.toFixed(2);
        var splitNum = num.split('.'); // 12345678.00
        var temp, i;
        var partInt = splitNum[0]; // 12345678
        if (partInt.length > 3) {
            var module = partInt.length % 3;
            temp = partInt.substr(0, module) + ',';
            for (i = module; i < partInt.length - 3; i+=3) {
                temp = partInt.substr(i, 3) + ','; // i: position, 3 is number of elements
            }
            temp += partInt.substr(i, partInt.length - i);
        } else {
            temp = partInt;
        }
        temp =  temp + '.' + splitNum[1];
        if (type === 'inc') temp = '+' + temp;
        else if (type === 'exp') temp = '-' + temp;
        return temp;
    };

    var nodelistForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
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
            fieldsArr = Array.prototype.slice.call(fields); // slice is a method of array, slice method convert the Nodelist to an array
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
            var type = '';
            if (obj.budget > 0) {
                type = 'inc';
            } else if (obj.budget < 0) {
                type = 'exp';
            }
            document.querySelector(DOMstring.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstring.budgetIncome).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstring.budgetExpense).textContent = formatNumber(obj.totalExp, 'exp');
            
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
                html ='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%'
                + '</div><div class="right clearfix"><div class="item__value">%value%</div>'
                + '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close'
                + '-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = DOMstring.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%'
                + '</div><div class="right clearfix"><div class="item__value">%value%</div><div class='
                + '"item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">'
                + '<i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Replace the placeholder text with some actual data
            html = html.replace('%id%', obj.id);
            html = html.replace('%description%', obj.description);
            //console.log(obj.description);
            html = html.replace('%value%', formatNumber(obj.value, type));
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
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID); // get child
            el.parentNode.removeChild(el); // get the parent, and using the parent to remove this child
        },

        displayMonth: function() {
            var today, year;
            today = new Date();
            year = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            document.querySelector(DOMstring.dateLabel).textContent = year;
            //console.log(year);
        },

        changeType: function() {
            var fields = document.querySelectorAll(DOMstring.inputType + ',' 
                                                + DOMstring.inputDes + ',' 
                                                + DOMstring.inputValue + ','
                                                + DOMstring.inputBtn); // RETURN A NODEList
            var checkChange = 0;
            nodelistForEach(fields, function(cur, index) {
                if (index == 0) {
                    if (cur.value == 'exp') checkChange = 1;
                }
                if (cur.type !== 'submit') {
                    if (checkChange === 1)
                        cur.classList.add('red-focus');
                    else
                        cur.classList.remove('red-focus');
                }
                else {
                    if (checkChange === 1)
                        cur.classList.add('red');
                    else
                        cur.classList.remove('red');
                }
            });
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstring.expPercentage); // A Nodelist, selectAll because we don't know
            //many class expPercentage will be on the App 

            /*
            //fieldsArr = Array.prototype.slice.call(fields); // we can do this way, or as below:
            var nodelistForEach = function(list, callback) {
                for(var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            }; */

            nodelistForEach(fields, function(current, index) { //current = list[i] and index = i
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%'; // current  = document.querySelector(DOMstring.expPercentage)
                } else {
                    current.textContent = '---';
                }
            });
        },

        setInputType: function() {
            document.querySelector(DOMstring.inputType).value = 'inc';
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

    var updatePercentages = function() {
        // Calculate percentages
        BudgetCtrl.calculatePercentages();
        // Read percentages from the budget controller
        UICtrl.displayPercentages(BudgetCtrl.getPercentages());
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

            // Calculate and update percentages
            updatePercentages();
        }
    };

    var ctrDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        //console.log(event.target); // =>pointing directly to the specific element
        /*
        console.log(event.target.parentNode); // =>pointing to the parent level 1 of this choosed target
        console.log(event.target.parentNode.parentNode); // parent level 2
        */
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; // parent level 3, and so on
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            //console.log('type: ' + type);
            //console.log('id: ' + ID);

            // Delete the item from the data structure
            BudgetCtrl.deleteItem(type, ID);
            // Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            // Update and show the new budget
            updateBudget();
            // Calculate and update percentages
            updatePercentages();
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
        document.querySelector(DOM.container).addEventListener('click', ctrDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };    

    return {
        init: function() {
            console.log('Application has started!');
            UICtrl.setInputType();
            UICtrl.displayMonth();
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