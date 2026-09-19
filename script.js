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

let input = '';
let history = '';
let x;
let y;

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
  const functionClasses = [
    'remove',
    'clear',
    'divide',
    'multiply',
    'minus',
    'plus',
    'negative',
    'equals',
  ]

  for (let inputs of inputClasses) {
    const btn = document.querySelector('.' + inputs);
    const value = btn.textContent;
    const readout = document.querySelector('.readout');

    btn.addEventListener('click', () => {
      input += value;
      readout.innerText = input;
      console.log(input);
      // return output += value;
    })
    console.log(input);
  }
}
createEventListeners();
console.log(add(1, 3), subtract(1, 4), multiply(3.5, 3), divide(27, 2));
