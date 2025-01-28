let display = document.getElementById("display");
let memory = 0;

function clearDisplay() {
    display.innerText = "0";
}

function appendNumber(number) {
    if (display.innerText === "0") {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
}

function appendOperator(operator) {
    let lastChar = display.innerText.slice(-1);
    if (!isNaN(lastChar)) {
        display.innerText += operator;
    }
}

function appendDecimal() {
    let parts = display.innerText.split(/[-+*/]/);
    if (!parts[parts.length - 1].includes(".")) {
        display.innerText += ".";
    }
}

function calculateResult() {
    try {
        let result = eval(display.innerText);
        if (!isFinite(result)) {
            throw new Error("Math error");
        }
        display.innerText = result;
    } catch (error) {
        display.innerText = "Error";
    }
}

function calculateSquareRoot() {
    try {
        let value = parseFloat(display.innerText);
        if (value < 0) {
            throw new Error("Math error");
        }
        display.innerText = Math.sqrt(value);
    } catch (error) {
        display.innerText = "Error";
    }
}

function memoryRecall() {
    display.innerText = memory;
}
