const clear = document.querySelector('.ac');
const display = document.querySelector('.display');
const noFunc = document.querySelectorAll('[data-null="null"]');
const number = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const backSpace = document.querySelector('.backspace');
const dot = document.querySelector('.dot');
const addition = document.querySelector('[data-operand="add"]');
const subtraction = document.querySelector('[data-operand="subtract"]');
const multiplication = document.querySelector('[data-operand="multiply"]');
const division = document.querySelector('[data-operand="divide"]');

let numbers = [];
let firstNum, operand, result, secondNum;

const add = (num1, num2) => {
  return num1 + num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const operate = (operator, num1, num2) => {
  switch (operator) {
    case 'add':
      return add(num1, num2);
    case 'divide':
      return divide(num1, num2);
    case 'subtract':
      return subtract(num1, num2);
    case 'multiply':
      return multiply(num1, num2);
    default:
      break;
  }
};

function showNumbers() {
  numbers.push(this.textContent);
  display.value = numbers.join('');

  if (display.value.includes('.')) {
    this.classList.add('disabledbutton');
  }
}

function performOperation() {
  switch (this.textContent) {
    case '+':
      this.classList.add('disabledbutton');
      subtraction.classList.remove('disabledbutton');
      multiplication.classList.remove('disabledbutton');
      division.classList.remove('disabledbutton');

      if (firstNum === undefined) {
        firstNum = parseFloat(numbers.join('')) || firstNum;
      } else {
        secondNum = parseFloat(numbers.join(''));
        result = operate(operand, firstNum, secondNum);

        if (result === Infinity) {
          alert('Error!');
          display.value = '';
          numbers = [];
          firstNum = undefined;
          secondNum = undefined;
          result = undefined;
          return;
        }
        firstNum = result;
        display.value = Math.round((result + Number.EPSILON) * 100) / 100;
      }
      operand = 'add';
      numbers = [];
      break;
    case '−':
      this.classList.add('disabledbutton');
      division.classList.remove('disabledbutton');
      multiplication.classList.remove('disabledbutton');
      addition.classList.remove('disabledbutton');

      if (firstNum === undefined) {
        firstNum = parseFloat(numbers.join('')) || firstNum;
      } else {
        secondNum = parseFloat(numbers.join(''));
        result = operate(operand, firstNum, secondNum);
        if (result === Infinity) {
          alert('Error!');
          display.value = '';
          numbers = [];
          firstNum = undefined;
          secondNum = undefined;
          result = undefined;
          return;
        }
        firstNum = result;
        display.value = Math.round((result + Number.EPSILON) * 100) / 100;
      }
      operand = 'subtract';
      numbers = [];
      break;
    case '×':
      this.classList.add('disabledbutton');
      subtraction.classList.remove('disabledbutton');
      addition.classList.remove('disabledbutton');
      division.classList.remove('disabledbutton');
      if (firstNum === undefined) {
        firstNum = parseFloat(numbers.join('')) || firstNum;
      } else {
        secondNum = parseFloat(numbers.join(''));
        result = operate(operand, firstNum, secondNum);
        if (result === Infinity) {
          alert('Error!');
          display.value = '';
          numbers = [];
          firstNum = undefined;
          secondNum = undefined;
          result = undefined;
          return;
        }
        firstNum = result;
        display.value = Math.round((result + Number.EPSILON) * 100) / 100;
      }
      operand = 'multiply';
      numbers = [];
      break;
    case '÷':
      this.classList.add('disabledbutton');
      subtraction.classList.remove('disabledbutton');
      multiplication.classList.remove('disabledbutton');
      addition.classList.remove('disabledbutton');
      if (firstNum === undefined) {
        firstNum = parseFloat(numbers.join('')) || firstNum;
      } else {
        secondNum = parseFloat(numbers.join(''));
        if (secondNum === 0) {
          alert('Error!');
          display.value = '';
          numbers = [];
          firstNum = undefined;
          secondNum = undefined;
          result = undefined;
          return;
        }
        result = operate(operand, firstNum, secondNum);
        firstNum = result;
        display.value = Math.round((result + Number.EPSILON) * 100) / 100;
      }
      operand = 'divide';
      numbers = [];
      break;
    case '=':
      addition.classList.remove('disabledbutton');
      subtraction.classList.remove('disabledbutton');
      multiplication.classList.remove('disabledbutton');
      division.classList.remove('disabledbutton');
      if (firstNum === undefined) return;
      secondNum = parseFloat(numbers.join(''));
      if (secondNum === 0 && operand === 'divide') {
        alert('Error!');
        display.value = '';
        numbers = [];
        firstNum = undefined;
        secondNum = undefined;
        result = undefined;
        return;
      }
      result = operate(operand, firstNum, secondNum);
      display.value = Math.round((result + Number.EPSILON) * 100) / 100;
      // firstNum = result;
      // secondNum = undefined;
      numbers = [];
      break;
    default:
      break;
  }
}

noFunc.forEach((x) => {
  x.addEventListener('click', () => {
    alert('Functionality not added yet');
  });
});

clear.addEventListener('click', () => {
  display.value = '0';
  numbers = [];
  firstNum = undefined;
  secondNum = undefined;
  result = undefined;
  operand = '';
});

number.forEach((num) => num.addEventListener('click', showNumbers));

operators.forEach((operator) => {
  operator.addEventListener('click', performOperation);
});

backSpace.addEventListener('click', () => {
  numbers.pop();
  display.value = numbers.join('');

  if (!display.value.includes('.')) {
    dot.classList.remove('disabledbutton');
  }

  if (numbers.length === 0) {
    display.value = '0';
  }
});
