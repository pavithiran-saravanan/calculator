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
const display = document.querySelector('.display');
function populateDisplay(){
    if(!num1) display.textContent = "0";
    else display.textContent = displayValue;
};

// Adding evenlistener to all of the number buttons. On click event listener to populate display.
const numbers = document.querySelectorAll('.num');
numbers.forEach((number)=>{
    number.addEventListener('click', (e)=>{
        // Until operator is pressed, keep on adding selected numbers to num1
        if(!operator){
            if(+num1 || e.target.getAttribute('id') != '0') num1 = num1 + e.target.getAttribute('id');
        }
        // If operator has been recorded, start updaing num2
        else{
            num2 = num2 + e.target.getAttribute('id');
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
    console.log('clear clicked');

    // Reset our variables
    num1 = num2 = operator = "";

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
        if(num1){
            // When operator is pressed after num1 is populated
            if(!num2){
                operator = e.target.getAttribute('id');
                displayValue = num1+displayOperator(operator)+num2;
                console.log(num1, operator, num2);
                populateDisplay();
            }
            // When operator is pressed after num2
            else{
                num1 = operate(num1, operator, num2);
                operator = e.target.getAttribute('id');
                num2 = "";
                displayValue = num1 + displayOperator(operator);
                populateDisplay();
            }
        }
    })
}) 

// Equal To Operation
const equal = document.querySelector('#equal');
equal.addEventListener('click', (e)=>{
    if(num1 && operator && num2){
        num1 = operate(num1, operator, num2);
        operator = "";
        num2 = "";
        displayValue = num1;
        populateDisplay();
    }
})