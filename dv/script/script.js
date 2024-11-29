// script.ts
var display = document.getElementById("display");
var buttons = document.querySelectorAll("button");
var currentOperand = "";
var previousOperand = "";
var operation = "";
function updateDisplay() {
    display.textContent = currentOperand || "0";
}
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var value = button.getAttribute("data-value");
        if (!value)
            return;
        switch (value) {
            case "AC":
                currentOperand = "";
                previousOperand = "";
                operation = "";
                break;
            case "+/-":
                currentOperand = (parseFloat(currentOperand) * -1).toString();
                break;
            case "%":
                currentOperand = (parseFloat(currentOperand) / 100).toString();
                break;
            case "=":
                if (previousOperand && currentOperand && operation) {
                    var prev = parseFloat(previousOperand);
                    var current = parseFloat(currentOperand);
                    switch (operation) {
                        case "+":
                            currentOperand = (prev + current).toString();
                            break;
                        case "-":
                            currentOperand = (prev - current).toString();
                            break;
                        case "*":
                            currentOperand = (prev * current).toString();
                            break;
                        case "/":
                            currentOperand = (prev / current).toString();
                            break;
                    }
                    previousOperand = "";
                    operation = "";
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if (currentOperand) {
                    operation = value;
                    previousOperand = currentOperand;
                    currentOperand = "";
                }
                break;
            default:
                currentOperand += value;
        }
        updateDisplay();
    });
});
