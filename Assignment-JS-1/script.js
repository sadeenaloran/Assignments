let result = document.getElementById("result");
let currentInput = "";

function calcNumber(number) {
  currentInput += number;
  result.value = currentInput;
}

function theOperator(operator) {
  currentInput += operator;
  result.value = currentInput;
}

function calculate() {
  try {
    currentInput += operator;
    result.value = currentInput;
  } catch (E) {
    result.value = "Error";
  }
}

function clear() {
  currentInput = "";
  result.value = currentInput;
}
