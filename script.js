function add (a, b=0) {
  return a + b;
}

function subtract (a, b=0) {
  return a - b;
}

function multiply (a, b=1) {
  return a * b;
}

function divide (a, b=1) {
  if (b == 0) {
    return "No dividing by zero";
  }
  else {
    return a / b;
  }
}

function percent(a, b=1) {
  return (a / 100) * b;
}

const operationFunctions = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "%": percent,
}

function operate () {
  firstOperand = firstOperand || "0";
  secondOperand = workingEntry ? +workingEntry : undefined;
  let result = operationFunctions[operator](+firstOperand, secondOperand);
  firstOperand = String(result);
  workingEntry = undefined;
  secondOperand = undefined;
  operator = undefined;
  display.textContent = firstOperand;
}


const buttons = document.querySelectorAll("button");
buttons.forEach( button => 
  button.addEventListener("click", () => 
    newInput(button.textContent))
);


const display = document.querySelector("#display");

display.textContent = "0";
let workingEntry = undefined;
let firstOperand = undefined;
let secondOperand = undefined;
let operator = undefined;

function newInput(input){
  switch (input) {
    case (!isNaN(+input) ? input : null):
      workingEntry ? workingEntry += input : workingEntry = input;
      display.textContent = workingEntry;
      break;
    case "/": 
    case "*": 
    case "-": 
    case "+":  
    case "%": 
      if (operator) {
        operate();
      }
      else {
        if (workingEntry) {
          firstOperand = workingEntry;
          workingEntry = undefined;
        }
      }
      display.textContent += input;
      operator = input;
      break;
    case ".":
      if (!workingEntry) {
        workingEntry = "0.";
        display.textContent = workingEntry;
      }
      else if (!workingEntry.includes(".")) {
        workingEntry += ".";
        display.textContent = workingEntry;
      }
      break;
    case "+/-":
      if (workingEntry) {
        workingEntry = String(+workingEntry * -1);
        display.textContent = workingEntry;
      }
      else if (firstOperand) {
        firstOperand = String(+firstOperand * -1);
        display.textContent = firstOperand;
      }
      break;
    case "=":
      if (operator) {
        operate();
      }
      else {
        firstOperand = workingEntry;
        workingEntry = undefined;
      }
      break;
    case "Clear":
      display.textContent = firstOperand || "0";
      workingEntry = undefined;
      break;
    case "Clear All":
      display.textContent = "0"
      workingEntry = undefined;
      firstOperand = undefined;
      secondOperand = undefined;
      operator = undefined;
      break;
    default:
      console.log("Something went wrong");
  }
}
