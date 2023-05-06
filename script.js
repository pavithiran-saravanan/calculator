const display = document.querySelector('.display');

// Add
function add(num1, num2){
    return num1+num2;
}

// Subtract
function subtract(num1, num2){
    return num1-num2;
}

// Multiply
function multiply(num1, num2){
    return num1*num2;
}

// Divide
function divide(num1, num2){
    if(num2 == 0) return "LMAO"
    return num1/num2;
}

// Variables required for an operation
let num1 = "", operator = "", num2 = "";

// Variable to store display value
let displayValue;

// Operate
function operate(num1, operator, num2){
    if(operator == '+') return add(+num1, +num2);
    if(operator == '-') return subtract(+num1, +num2);
    if(operator == '*') return multiply(+num1, +num2);
    if(operator == '/') return divide(+num1, +num2);
}

// Create a function to populate the display when number buttons are clicked
function populateDisplay(){
    if(!num1) display.textContent = "0";
    else display.textContent = displayValue;

    /* TO DO: ROUND LONG DECIMALS */
};

// Adding evenlistener to all of the number buttons. On click event listener to populate display.
const numbers = document.querySelectorAll('.num');
numbers.forEach((number)=>{
    number.addEventListener('click', (e)=>{
        // Until operator is pressed, keep on adding selected numbers to num1
        if(num1 == "0") num1 = "";
        if(num1 == "LMAO") {
            operations = [];
            num1 = num2 = operator = "";
        }
        if(!operator){
            if(num1 || e.target.getAttribute('id') != '0') {
                num1 = num1 + e.target.getAttribute('id');
                operations.push("num1");
            }
        }
        // If operator has been recorded, start updaing num2
        else{
            num2 = num2 + e.target.getAttribute('id');
            operations.push("num2");
        }
        // Update displayValue
        displayValue = num1 + displayOperator(operator) + num2;

        // Populate display
        populateDisplay(); 

    });
})

// Adding evetlistener to clear button to reset to default values
const clear = document.querySelector('.clear');
clear.addEventListener('click', (e)=>{
    // Reset our variables
    num1 = num2 = operator = "";
    operations = [];

    // Update display after variable refres
    populateDisplay();
});

function displayOperator(op){
    if(op == '*') return "×";
    if(op == '/') return "÷";
    else return op;
}

// Adding event listener to operators. If num2 is also populated, call operate and display output. Else, simply update operator var and display.
const operators = document.querySelectorAll('.op');
operators.forEach((op)=>{
    op.addEventListener('click', (e)=>{
        if(isDecimalPresentAtLast()) return;
        if(num1 == "LMAO") {
            operations = [];
            num1 = num2 = operator = "";
            populateDisplay();
        }
        if(num1){
            // When operator is pressed after num1 is populated
            if(!num2){
                operator = e.target.getAttribute('id');
                displayValue = num1+displayOperator(operator)+num2;
                populateDisplay();
                operations.push("operator");
            }
            // When operator is pressed after num2
            else{
                num1 = "" + operate(num1, operator, num2);
                if(num1 == "LMAO") {
                    operations = [];
                    // num1 = num2 = operator = "";
                    displayValue = num1;
                    populateDisplay();
                    return;
                }
                operator = e.target.getAttribute('id');
                num2 = "";
                displayValue = num1 + displayOperator(operator);
                
                // Resetting operations stack
                operations = [];
                for(let i = 0; i < num1.length; i++) operations.push("num1");
                operations.push("operator");

                populateDisplay();
            }
        }
    })
}) 

function isDecimalPresentAtLast(){
    if(num1 && num1[num1.length-1] == '.') return true;
    if(num2 && num2[num2.length-1] == '.') return true;
    else return false;
}

// Strip Num
function strip(number){
    return parseFloat(number).toPrecision(15);
}

// Equal To Operation
const equal = document.querySelector('#equal');
equal.addEventListener('click', (e)=>{
    if(!isDecimalPresentAtLast() && num1 && operator && num2){
        // num1 = "" + strip(operate(num1, operator, num2));
        num1 = "" + operate(num1, operator, num2);
        operator = "";
        num2 = "";
        displayValue = num1;
        populateDisplay();
        operations.push('equal');
    }
})

const dot = document.querySelector('.dot');
dot.addEventListener('click', (e)=>{
    // If num1 == "" dot should be appended to a zero making 0.1
    if(num1 == "LMAO") {
        operations = [];
        num1 = num2 = operator = "";
        populateDisplay();
    }
    if(!num1){
        num1 = "0.";
        operations.push('num1');
    }
    else if(!operator){
        if(!num1.includes(".")) num1 = num1 + ".";
        operations.push('num1');
    }
    else if(!num2){
        num2 = "0.";
        operations.push('num2');
    }
    else{
        if(!num2.includes(".")) {
            num2 = num2 + ".";
            operations.push('num2');
        }
    }
    displayValue = num1 + displayOperator(operator) + num2;
    populateDisplay();
})

// Operations
let operations = [];
const back = document.querySelector('.back');
back.addEventListener('click', (e)=>{
    if(num1 == "LMAO"){
        num1 = num2 = operator = "";
        displayValue = 0;
        populateDisplay();
        return;
    }
    if(operations.len == 0){
        num1 = num2 = operator = "";
        return;
    }
    let lastOperation = operations[operations.length - 1];
    if(lastOperation == 'equal'){
        operations = [];
        operator = num2 = '';
        for(let i = 0; i < num1.length; i++){
            operations.push("num1");
        }
        lastOperation = 'num1';
    }
    if(lastOperation == 'num1'){
        num1 = num1.substring(0, num1.length - 1);
    }
    else if(lastOperation == 'num2'){
        if(num2) num2 = num2.substring(0, num2.length - 1);
        else num2 = "";
    }
    else if(lastOperation == 'operator'){
        operator = "";
    }
    operations.pop();
    if(operations.leng == 0){
        num1 = num2 = operator = "";
    }
    displayValue = num1 + displayOperator(operator) + num2
    populateDisplay();
})

window.addEventListener('click', (e)=>{
    console.log(num1, operator, num2, operations);
})

// Add keyboard functionality