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
  tmp = Number(input);
  tmp *= -1;
  input = tmp;
  readout.innerText = input;
}

function equals(x, y, obj, key) {
  if (showHistory) {
    history.innerText = readout.innerText;
  }
  if (key === 'equals') {
    output = obj[`${operation}`](x, y);
  } else output = (obj[`${key}`](x, y));
  console.log(x, y, key);
  x = output;
  y = '';
  input = '';
  readout.innerText = output;
  if (!showHistory) showHistory = true;
  return output;
}

let input = '';
let operation;
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
    'percent',
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

    if (key == 'clear' || key === 'remove' || key === 'negative') {
      btn.addEventListener('click', () => operations[`${key}`]());
    } else if (key === 'equals') { // create equals operation event listener
      btn.addEventListener('click', () => {
        if (x) {
          y = Number(input);
          console.log(equals(x, y, operations, 'equals'));
        }
      })
    } else btn.addEventListener('click', () => { //create event listeners for the rest of operations
      console.log(key);
      operation = key;
      if (x) {
        y = Number(input);
        equals(x, y, operations, operation);
      } else {
        x = Number(input);
        input = '';
      }
    })
  }
}

calculator();
// console.log(add(1, 3), subtract(1, 4), multiply(3.5, 3), divide(27, 2));
