class Calculator {
    constructor() {
      this.currentInput = '0';
      this.previousInput = '';
      this.operation = null;
      this.display = document.getElementById('result');
      this.updateDisplay();
    }
  
    updateDisplay() {
      this.display.value = this.currentInput;
    }
  
    calcNumber(number) {
      if (this.resetInput) {
        this.currentInput = number.toString();
        this.resetInput = false;
      } else {
        if (this.currentInput === '0') {
          this.currentInput = number.toString();
        } else {
          this.currentInput += number.toString();
        }
      }
      this.updateDisplay();
    }
  
    calcDecimal() {
      if (this.resetInput) {
        this.currentInput = '0.';
        this.resetInput = false;
      } else {
        if (!this.currentInput.includes('.')) {
          this.currentInput += '.';
        }
      }
      this.updateDisplay();
    }
  
    Operator(operation) {
      if (this.previousInput !== '') {
        this.calculate();
      }
      this.operation = operation;
      this.previousInput = this.currentInput;
      this.resetInput = true;
    }
  
    calculate() {
      let result;
      const num1 = parseFloat(this.previousInput);
      const num2 = parseFloat(this.currentInput);
            
      if (this.operation === '+') {
        result = num1 + num2;
      } else if (this.operation === '-') {
        result = num1 - num2;
      } else if (this.operation === '*') {
        result = num1 * num2;
      } else if (this.operation === '/') {

        if (num2 === 0) {
          this.currentInput = 'Error';
          this.operation = null;
          this.previousInput = '';
          this.updateDisplay();
          return;
        }
        result = num1 / num2;
      } else {
        return;
      }
      
      this.currentInput = result.toString();
      this.operation = null;
      this.previousInput = '';
      this.updateDisplay();
    }
  
    clear() {
      this.currentInput = '0';
      this.previousInput = '';
      this.operation = null;
      this.resetInput = false;
      this.updateDisplay();
    }
  }
  
  const calculator = new Calculator();
  