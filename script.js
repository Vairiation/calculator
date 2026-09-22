let input = [];
let operator;
let numbers = [];
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
  let tmp;
  if (input.length === 0 && numbers.length > 0) {
    tmp = numbers[0];
    numbers = [];
    history.innerText = '';
  } else tmp = input; //convert input to string as edge case for a negative number
  if (!tmp && tmp !== 0) return;
  tmp.pop();
  input = tmp;
  if (input.length === 1 && input[0] === '-') input = []; //clears input if only '-' is left over
  readoutInput(input);
  if (input.length === 0) clearBtn.innerText = 'AC';
  if (tmp.includes('.')) decimalBtn.disabled = true;
  else decimalBtn.disabled = false;
}

function clear() {
  input = [];
  numbers = [];
  readout.innerText = '';
  history.innerText = '';
  decimalBtn.disabled = false;
  clearBtn.innerText = 'AC';
}

function negative(number) {
  if (number) {
    if (number % 1 !== 0) decimalBtn.disabled = true;
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
  if (key === '' || operator == '') return;
  const firstNumber = Number(array[0].join(''));
  const secondNumber = Number(array[1].join(''));
  const operatorSymbols = {
    divide: '÷',
    multiply: '×',
    plus: '+',
    minus: '-',
  };
  numbers = [];
  input = [];
  history.innerText = firstNumber + ` ${operatorSymbols[operator]} ` + secondNumber;

  let tmp;
  if (key === 'equals') {
    tmp = obj[`${operator}`](firstNumber, secondNumber);
    numbers[0] = normalizeInput(tmp);
  } else {
    tmp = obj[`${key}`](firstNumber, secondNumber);
    numbers[0] = normalizeInput(tmp);
  }

  readoutInput(numbers[0]);
  decimalBtn.disabled = false;
}

function normalizeInput(array) {
  let number;
  let numberString;
  if (typeof (array) === 'number') number = array;
  else {
    numberString = array;
    while (Array.isArray(numberString)) {
      numberString = numberString.join('');
    }
    number = Number(numberString);
  }

  if (number === 0) {
    return 0;
  }

  if (number % 1 === 0) {
    decimalBtn.disabled = false;
  }

  if (number && number !== NaN) {
    numberString = `${number}`;
    return numberString.split('');
  }

  clear();
  readout.innerText = 'SYNTAX ERROR';
}

function readoutInput(array) {
  const number = array.join('');
  readout.innerText = number;
  if (number.includes('.')) decimalBtn.disabled = true;
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

    btn.addEventListener('click', () => {
      input.push(value);
      readoutInput(input);
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

  for (let key of operatorKeys) {
    const btn = document.querySelector('.' + key);

    if (key == 'clear' || key === 'remove') {
      btn.addEventListener('click', () => operators[`${key}`]());
    } else if (key === 'negative' || key === 'percent') {
      btn.addEventListener('click', () => {
        let tempNumber;
        if (input.length === 0) {
          tempNumber = `${operators[`${key}`](Number(normalizeInput(numbers[0]).join('')))}`;
          numbers = [];
        } else {
          tempNumber = `${operators[`${key}`](Number(normalizeInput(input).join('')))}`;
        }
        input = tempNumber.split('');
        readoutInput(input)
      })
    } else if (key === 'equals') { // create equals operator event listener
      btn.addEventListener('click', () => {
        if (numbers.length > 0 && input.length > 0) {
          numbers.push(normalizeInput(input));
          operate(numbers, operators, 'equals');
          operator = '';
        }
      })
    } else {
      btn.addEventListener('click', () => { //create event listeners for the rest of operators
        if (input.length === 0) {
          operator = key;
          return;
        }
        else if (numbers.length === 1) {
          numbers.push(normalizeInput(input));
          operate(numbers, operators, key); //might need to switch key with operator
        } else {
          numbers.push(normalizeInput(input));
          input = [];
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
// Running operate then typing in new input and running operate again before second number has been chosen or setting new operator causes bug 
// Add input character limit
// Add rounding and scientific notation to output (14 characters max)
// Keyboard support
