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

function equals(a, b, obj, key) {
  const aNormal = normalizeInput(a);
  const bNormal = normalizeInput(b);
  if (showHistory) {
    history.innerText = output;
  }
  if (key === 'equals') {
    output = obj[`${operation}`](aNormal, bNormal);
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

let input = '';
let operation;
// let numArray = []; // try using array for nunmber inputs and operators
// let operatorArray = [];
let x;
let y;
const readout = document.querySelector('.readout');
const history = document.querySelector('.history');
const clearBtn = document.querySelector('.clear');
let showHistory = false;

function calculator() {
  createInputListeners();
  createOperationListeners();
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

function createOperationListeners() {

  const operations = {
    remove: remove,
    clear: clear,
    percent: percent,
    divide: divide,
    multiply: multiply,
    minus: subtract,
    plus: add,
    negative: negative,
    equals: equals,
  }

  const operationKeys = Object.keys(operations);
  // console.table(operationKeys);

  for (let key of operationKeys) {
    const btn = document.querySelector('.' + key);

    if (key == 'clear' || key === 'remove' || key === 'negative' || key === 'percent') {
      btn.addEventListener('click', () => operations[`${key}`]());
    } else if (key === 'equals') { // create equals operation event listener
      btn.addEventListener('click', () => {
        if ((x || x === 0) && input) {
          y = normalizeInput(input);
          console.log(equals(x, y, operations, 'equals'));
        }
      })
    } else btn.addEventListener('click', () => { //create event listeners for the rest of operations
      console.log(key);
      if ((x || x === 0) && input) {
        y = normalizeInput(input);
        equals(x, y, operations, operation);
      } else if (input) {
        x = normalizeInput(input);
        input = '';
      }
      operation = key;
    })
  }
}

calculator();
// ToDo: 
// - fix history to show last output or last operation
// - refactor to use TheOdinProject recommended naming conventions
// - rename operation to operator
