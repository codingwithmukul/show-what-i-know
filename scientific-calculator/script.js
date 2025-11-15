let display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousValue = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else if (num === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousValue = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}

function appendFunction(func) {
    let value = parseFloat(currentInput);
    let result;

    switch(func) {
        case 'sqrt':
            result = Math.sqrt(value);
            break;
        case 'cbrt':
            result = Math.cbrt(value);
            break;
        case 'pow':
            result = value * value;
            break;
        case 'pow3':
            result = value * value * value;
            break;
        case 'sin':
            result = Math.sin(value * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos(value * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(value * Math.PI / 180);
            break;
        case 'log':
            result = Math.log10(value);
            break;
        case 'ln':
            result = Math.log(value);
            break;
        case 'exp':
            result = Math.exp(value);
            break;
        case 'factorial':
            result = factorial(value);
            break;
        case 'percent':
            result = value / 100;
            break;
        case 'reciprocal':
            result = 1 / value;
            break;
        case 'pi':
            currentInput = Math.PI.toString();
            shouldResetDisplay = true;
            updateDisplay();
            return;
        case 'e':
            currentInput = Math.E.toString();
            shouldResetDisplay = true;
            updateDisplay();
            return;
        default:
            result = value;
    }

    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function calculate() {
    if (operator === null || previousValue === null) {
        return;
    }

    let currentValue = parseFloat(currentInput);
    let result;

    switch(operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            result = previousValue / currentValue;
            break;
        case '%':
            result = previousValue % currentValue;
            break;
        case '^':
            result = Math.pow(previousValue, currentValue);
            break;
        default:
            result = currentValue;
    }

    currentInput = result.toString();
    operator = null;
    previousValue = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousValue = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function allClear() {
    clearDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function toggleSign() {
    let value = parseFloat(currentInput);
    currentInput = (value * -1).toString();
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput;
}