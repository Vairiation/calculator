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
}

function equals(x, y, obj, key) {
  output = (obj[`${key}`](x, y));
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
  createEventListeners();
}

function createEventListeners() {
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

  const readout = document.querySelector('.readout');

  for (let inputs of inputClasses) {
    const btn = document.querySelector('.' + inputs);
    const value = btn.textContent;

    btn.addEventListener('click', () => {
      input += value;
      readout.innerText = input;
      console.log(input);
      // return output += value;
    })
    console.log(input);
  }

  const operationKeys = Object.keys(operations);
  console.table(operationKeys);

  for (let key of operationKeys) {
    const btn = document.querySelector('.' + key);

    if (key === 'equals') {
      btn.addEventListener('click', () => {
        const output = equals(x, y, operations, 'plus');
        input = output;
        readout.innerText = output;
      })
    } else btn.addEventListener('click', () => {
      console.log(key);
      x = Number(input);
      input = '';
    })
  }
}

createEventListeners();
console.log(add(1, 3), subtract(1, 4), multiply(3.5, 3), divide(27, 2));
