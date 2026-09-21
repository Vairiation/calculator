let input = '';
let operator;
// let numArray = []; // try using array for nunmber inputs and operators
// let operatorArray = [];
let x;
let y;
const readout = document.querySelector('.readout');
const history = document.querySelector('.history');
const clearBtn = document.querySelector('.clear');
let showHistory = false;

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
    array.pop();
    input = array.join('');
    readout.innerText = input;
  }
}

function clear() {
  input = '';
  ouput = '';
  x = '';
  y = '';
  readout.innerText = '';
  history.innerText = '';
  showHistory = false;
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

function percent() {
  if (input) {
    tmp = normalizeInput(input);
    tmp /= 100;
    input = tmp;
    readout.innerText = input;
  } else if (output) {
    tmp = normalizeInput(output);
    tmp /= 100;
    input = tmp;
    readout.innerText = output;
  }
}

function operate(a, b, obj, key) {
  const aNormal = normalizeInput(a);
  const bNormal = normalizeInput(b);
  if (showHistory) {
    history.innerText = output;
  }
  if (key === 'equals') {
    output = obj[`${operator}`](aNormal, bNormal);
  } else output = obj[`${key}`](aNormal, bNormal);
  x = output;
  input = '';
  readout.innerText = output;
  if (!showHistory) showHistory = true;
}

function normalizeInput(input) {
  let numberInput = Number(input);
  console.log(numberInput);

  if (numberInput === 0) {
    return 0;
  }

  if (numberInput && numberInput !== NaN) {
    return numberInput;
  }

  clear();
  readout.innerText = 'SYNTAX ERROR';
  console.log('cleared');
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

  for (let inputs of inputClasses) {
    const btn = document.querySelector('.' + inputs);
    const value = btn.textContent;

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
  // console.table(operatorKeys);

  for (let key of operatorKeys) {
    const btn = document.querySelector('.' + key);

    if (key == 'clear' || key === 'remove' || key === 'negative' || key === 'percent') {
      btn.addEventListener('click', () => operators[`${key}`]());
    } else if (key === 'equals') { // create equals operator event listener
      btn.addEventListener('click', () => {
        if ((x || x === 0) && input) {
          y = normalizeInput(input);
          console.log(operate(x, y, operators, 'equals'));
        }
      })
    } else btn.addEventListener('click', () => { //create event listeners for the rest of operators
      console.log(key);
      if ((x || x === 0) && input) {
        y = normalizeInput(input);
        operate(x, y, operators, operator);
      } else if (input) {
        x = normalizeInput(input);
        input = '';
      }
      operator = key;
    })
  }
}

function calculator() {
  createInputListeners();
  createoperatorListeners();
}

calculator();
// ToDo: 
// - refactor to use TheOdinProject recommended naming conventions
