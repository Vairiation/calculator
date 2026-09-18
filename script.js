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

let output;
let lastOutput;
let x;
let y;

function calculator() {
    output = 0;

    createEventListeners();
}

function createEventListeners() {
    const inputClasses = [
        percent,
        one,
        two,
        three,
        four,
        five,
        six,
        seven,
        eight,
        nine,
        zero,
        decimal,
    ];
    const functionClasses = [
        remove,
        clear,
        divide,
        multiply,
        minus,
        plus,
        negative,
        equals,
    ]
    
    for (let input of inputClasses) {
        const btn = document.querySelector(`.${input}`);
        const value = btn.textContent;

        btn.addEventListener('click', () => {
            return output += value;
        })
        console.log(output);
    }
}
console.log(add(1, 3), subtract(1, 4), multiply(3.5, 3), divide(27, 2));