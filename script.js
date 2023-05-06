// Required Variables
let num1 = '0', operator = '', num2 = '';
let displayValue = '0';
const display = document.querySelector('.display');
let operations = [];
const clear = document.querySelector('.clear');
const dot = document.querySelector('.dot');
const operators = document.querySelectorAll('.op');
const equal = document.querySelector('#equal');
const back = document.querySelector('.back');

function add(num1, num2){
    return num1+num2;
}

function subtract(num1, num2){
    return num1-num2;
}

function multiply(num1, num2){
    return num1*num2;
}

function divide(num1, num2){
    if(num2 == 0) return "LMAO"
    return num1/num2;
}

function operate(num1, operator, num2){
    if(operator == '+') return add(+num1, +num2);
    if(operator == '-') return subtract(+num1, +num2);
    if(operator == '*') return multiply(+num1, +num2);
    if(operator == '/') return divide(+num1, +num2);
}

function populateDisplay(){
    if(displayValue.length > 14) display.style.fontSize = '30px';
    else if(displayValue.length > 9) display.style.fontSize = '40px';
    else if(displayValue.length <= 9) display.style.fontSize = '60px';

    if(num1 == '') display.textContent = '0';
    display.textContent = displayValue;
};

// Changes * to x and / to ÷ when outputting to display
function displayOperator(op){
    if(op == '*') return "×";
    if(op == '/') return "÷";
    else return op;
}

function isDecimalPresentAtLast(){
    if(num1 && num1[num1.length-1] == '.') return true;
    if(num2 && num2[num2.length-1] == '.') return true;
    else return false;
}

// Add event listeners to number buttons
const numbers = document.querySelectorAll('.num');
numbers.forEach((number)=>{
    number.addEventListener('click', numberHandler);
})

// Add event listener to dot button
dot.addEventListener('click', dotHandler);

// Adding event listeners to operators
operators.forEach((op)=>{
    op.addEventListener('click', operatorHandler);
}) 

// Add event listener to equal button
equal.addEventListener('click', equalHandler);

// Add event listener to back button
back.addEventListener('click', backHandler);

// Add event listener to clear button
clear.addEventListener('click', clearHandler);

// Strip Num
function strip(number){
    return parseFloat(number).toPrecision(10);
}

// Back Button Handler
function backHandler(e){
    let lastOperation = operations[operations.length - 1];

    if(num1 == "LMAO"){
        num1 = '0'; num2 = operator = "";
        displayValue = num1 + displayOperator(operator) + num2;
        populateDisplay();
        operations = [];
        return;
    }

    if(operations.length == 1){
        num1 ='0'; num2 = operator = "";
        displayValue = num1 + displayOperator(operator) + num2; populateDisplay();
        operations = [];
        return;
    }

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
        num1 = '0'; num2 = operator = "";
    }
    displayValue = num1 + displayOperator(operator) + num2
    populateDisplay();
}

// Dot Button Handler
function dotHandler(e){
    if(num1 == "LMAO") {
        operations = [];
        num1 = '0';
        num2 = operator = "";
        displayValue = num1 + displayOperator(operator) + num2;
        populateDisplay();
    }
    if(num1 == '0'){
        num1 = "0.";
        operations.push('num1');
    }
    else if(num1 == '-'){
        num1 = '-0.';
        operations.push('num1');
    }
    else if(!operator){
        if(!num1.includes(".")) num1 = num1 + ".";
        operations.push('num1');
    }
    else if(!num2){
        num2 = "0.";
        operations.push('num2');
        operations.push('num2');
    }
    else if(!num2.includes(".")) {
        num2 = num2 + ".";
        operations.push('num2');
    }
    displayValue = num1 + displayOperator(operator) + num2;
    populateDisplay();
}

// Equal Button Handler
function equalHandler(e){
    if(!isDecimalPresentAtLast() && num1 && operator && num2){
        num1 = "" + operate(num1, operator, num2);
        operator = "";
        num2 = "";
        displayValue = num1 + displayOperator(operator) + num2;
        populateDisplay();
        operations.push('equal');
    }
}

// Operator Button Handler
function operatorHandler(e){
    const operatorPressed = e.target.getAttribute('id');
    if(isDecimalPresentAtLast()) return;
    // if(num1 == "LMAO") {
    //     console.log('MY LMAO');
    //     operations = [];
    //     num1 = '0';
    //     num2 = operator = "";
    //     displayValue = num1 + displayOperator(operator) + num2;
    //     populateDisplay();
    //     return;
    // }
    if(num1 == '0' && operatorPressed == '-'){
        num1 = operatorPressed;
        displayValue = num1 + displayOperator(operator) + num2; populateDisplay();
        operations.push('num1');
    }
    else if(num1 != '0' && num1 != '' && num1 != '-'){
        // Operator pressed after num1 but num2 is empty
        if(!num2){
            operator = operatorPressed;
            displayValue = num1+displayOperator(operator)+num2;
            populateDisplay();
            operations.push("operator");
        }
        // When operator is pressed after num2
        else{
            num1 = "" + operate(num1, operator, num2);
            if(num1 == "LMAO") {
                operations = [];
                operator = num2 = '';
                displayValue = num1 + displayOperator(operator) + num2;
                populateDisplay();
                return;
            }
            operator = operatorPressed;
            num2 = "";
            operations = [];
            for(let i = 0; i < num1.length; i++) operations.push("num1");
            operations.push("operator");
            displayValue = num1 + displayOperator(operator) + num2; populateDisplay();
        }
    }
}

// Clear Button Handler
function clearHandler(e){
    num1 = '0';
    num2 = operator = "";
    operations = [];
    displayValue = num1 + displayOperator(operator) + num2;
    populateDisplay();
}

// Numbers Handler
function numberHandler(e){
    // Until operator is pressed, keep on adding selected numbers to num1
    const pressedNum = e.target.getAttribute('id');
    if(num1 == "LMAO") {
        operations = [];
        num1 = '0'; num2 = operator = "";
    }
    if(num1 == '0' && !operator){
        num1 = "" + pressedNum;
        if(pressedNum != '0') operations.push('num1');
    }
    else if(!operator){
        num1 = num1 + pressedNum;
        operations.push("num1");
    }
    // If operator has been recorded, start updaing num2
    else if(num2 == '0' && pressedNum == '0'){
        return;
    }
    else{
        num2 = num2 + pressedNum;
        operations.push("num2");
    }
    displayValue = num1 + displayOperator(operator) + num2;
    populateDisplay(); 
}

window.addEventListener('keydown', (e) => {
    const pressed = e.key;
    if(pressed == '0' || (+pressed >= 1 && +pressed <= 9)){
        document.getElementById(`${pressed}`).click();
    }
    if(pressed == '.'){
        document.getElementById('dot').click();
    }
    if(pressed == '+' || pressed == '-' || pressed == '*' || pressed == '/'){
        document.getElementById(`${pressed}`).click();
    }
    if(pressed == 'Backspace'){
        document.getElementById('back').click();
    }
    if(pressed == 'Delete'){
        document.getElementById('clear').click();
    }
    if(pressed == '=' || pressed == 'Enter'){
        document.getElementById('equal').click();
    }
})

// Debug
window.addEventListener('click', (e)=>{
    console.log("nums1:" + num1);
    console.log("operator:" + operator);
    console.log("nums2:" + num2);
    console.log(operations);
})

$( function() {
    $( ".draggable" ).draggable({
        containment: "parent"
    });
  } );

  
  