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
let num1, operator, num2;

// Variable to store display value
let displayValue;

// Operate
function operate(num1, operator, num2){
    if(operator == '+') return add(num1, num2);
    if(operator == '-') return subtract(num1, num2);
    if(operator == '*') return multiply(num1, num2);
    if(operator == '/') return divide(num1, num2);
}

// Create a function to populate the display when number buttons are clicked
function populateDisplay(displayValue){
    
};