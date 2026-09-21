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

function negative(number) {
  if (number) {
    return number * -1;
  }
}

function percent(number) {
  if (number) {
    let tmp = number / 100;
    if (tmp % 1 !== 0) {
      decimalBtn.disabled = true;
    }
    return tmp;
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
  };
  numbers = [];
  input = '';
  history.innerText = firstNumber + ` ${operatorSymbols[operator]} ` + secondNumber;

  if (key === 'equals') {
    numbers.push(obj[`${operator}`](firstNumber, secondNumber));
  } else {
    numbers.push(obj[`${key}`](firstNumber, secondNumber));
  }

  readout.innerText = numbers[0];
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

    if (key == 'clear' || key === 'remove') {
      btn.addEventListener('click', () => operators[`${key}`]());
    } else if (key === 'negative' || key === 'percent') {
      btn.addEventListener('click', () => {
        input = operators[`${key}`](normalizeInput(input));
        readout.innerText = input;
      })
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
