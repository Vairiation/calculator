let input = '';
let operator;
let numbers = [];
// let operatorArray = [];
const readout = document.querySelector('.readout');
const history = document.querySelector('.history');
const clearBtn = document.querySelector('.clear');
const decimalBtn = document.querySelector('.decimal');

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (x === 0) {
    clear();
    return 'UNDEFINED';
  }
  return x / y;
}

function remove() {
  if (input) {
    let array = input.split('');
    if (array[array.length - 1] === '.') decimalBtn.disabled = false;
    array.pop();
    input = array.join('');
    readout.innerText = input;
  }
}

function clear() {
  input = '';
  ouput = '';
  numbers = [];
  readout.innerText = '';
  history.innerText = '';
  decimalBtn.disabled = false;
  clearBtn.innerText = 'AC';
}

function negative() {
  if (input) {
    tmp = normalizeInput(input);
    tmp *= -1;
    input = tmp;
    readout.innerText = input;
  } else if (output) {
    tmp = normalizeInput(input);
    tmp *= -1;
    input = tmp;
    readout.innerText = input;
  }
}

function percent(number) {
  let tmp = normalizeInput(number);
  if (tmp) {
    tmp /= 100;
    input = tmp;
    readout.innerText = input;
  }

  if (input % 1 !== 0) {
    decimalBtn.disabled = true;
  }

}

function operate(array, obj, key) {
  const firstNumber = normalizeInput(array[0]);
  const secondNumber = normalizeInput(array[1]);
  const operatorSymbols = {
    divide: '÷',
    multiply: '×',
    plus: '+',
    minus: '-',
  }

  history.innerText = firstNumber + ` ${operatorSymbols[operator]} ` + secondNumber;
  if (key === 'equals') {
    output = obj[`${operator}`](firstNumber, secondNumber);
  } else output = obj[`${key}`](firstNumber, secondNumber);
  numbers = [];
  numbers.push(output);
  input = '';
  readout.innerText = output;
  decimalBtn.disabled = false;
}

function normalizeInput(input) {
  let numberInput = Number(input);

  if (numberInput === 0) {
    return 0;
  }

  if (numberInput % 1 === 0) {
    decimalBtn.disabled = false;
  }

  if (numberInput && numberInput !== NaN) {
    return numberInput;
  }

  clear();
  readout.innerText = 'SYNTAX ERROR';
}

function createInputListeners() {
  const inputClasses = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'zero',
    'decimal',
  ];

  for (let inputClass of inputClasses) {
    const btn = document.querySelector('.' + inputClass);
    const value = btn.textContent;

    if (inputClass === 'decimal') {
      btn.addEventListener('click', () => {
        decimalBtn.disabled = true;
        if (!input && input !== 0) {
          input = value
        } else input += value;
        readout.innerText = input;
        if (clearBtn.innerText === 'AC') {
          clearBtn.innerText = 'C';
        }
      })
    } else {
      btn.addEventListener('click', () => {
        if (!input && input !== 0) {
          input = value
        } else input += value;
        readout.innerText = input;
        if (clearBtn.innerText === 'AC') {
          clearBtn.innerText = 'C';
        }
      })
    }
  }
}

function createoperatorListeners() {

  const operators = {
    remove: remove,
    clear: clear,
    percent: percent,
    divide: divide,
    multiply: multiply,
    minus: subtract,
    plus: add,
    negative: negative,
    equals: operate,
  }

  const operatorKeys = Object.keys(operators);

  for (let key of operatorKeys) {
    const btn = document.querySelector('.' + key);

    if (key == 'clear' || key === 'remove' || key === 'negative') {
      btn.addEventListener('click', () => operators[`${key}`]());
    } else if (key === 'percent') {
      btn.addEventListener('click', () => percent(input));
    } else if (key === 'equals') { // create equals operator event listener
      btn.addEventListener('click', () => {
        if ((numbers[0] || numbers[0] === 0) && input) {
          numbers.push(normalizeInput(input));
          operate(numbers, operators, 'equals');
        }
      })
    } else {
      btn.addEventListener('click', () => { //create event listeners for the rest of operators
        if ((numbers[0] || numbers[0] === 0) && input) {
          numbers.push(normalizeInput(input));
          operate(numbers, operators, operator);
        } else if (input) {
          numbers.push(normalizeInput(input));
          input = '';
        }
        decimalBtn.disabled = false;
        operator = key;
      })
    }
  }
}

function calculator() {
  createInputListeners();
  createoperatorListeners();
}

calculator();
// ToDo: 
// - refactor to use TheOdinProject recommended naming conventions
