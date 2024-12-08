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
            case "AC": // Reset all
                currentOperand = "";
                previousOperand = "";
                operation = "";
                break;
            case "+/-": // Toggle sign
                currentOperand = (parseFloat(currentOperand) * -1).toString();
                break;
            case "%": // Percentage
                currentOperand = (parseFloat(currentOperand) / 100).toString();
                break;
            case "=": // Perform calculation
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
                            currentOperand = current !== 0 ? (prev / current).toString() : "Error";
                            break;
                        case "^":
                            currentOperand = Math.pow(prev, current).toString();
                            break;
                    }
                    operation = "";
                    previousOperand = "";
                }
                break;
            case "+": // Basic operations
            case "-":
            case "*":
            case "/":
            case "^":
                if (currentOperand) {
                    if (previousOperand) {
                        var prev = parseFloat(previousOperand);
                        var current = parseFloat(currentOperand);
                        switch (operation) {
                            case "+":
                                previousOperand = (prev + current).toString();
                                break;
                            case "-":
                                previousOperand = (prev - current).toString();
                                break;
                            case "*":
                                previousOperand = (prev * current).toString();
                                break;
                            case "/":
                                previousOperand = current !== 0 ? (prev / current).toString() : "Error";
                                break;
                            case "^":
                                previousOperand = Math.pow(prev, current).toString();
                                break;
                        }
                    }
                    else {
                        previousOperand = currentOperand;
                    }
                    currentOperand = "";
                    operation = value;
                }
                break;
            case "cos": // Cosine
                currentOperand = Math.cos(parseFloat(currentOperand) * Math.PI / 180).toString();
                break;
            case "sin": // Sine
                currentOperand = Math.sin(parseFloat(currentOperand) * Math.PI / 180).toString();
                break;
            case "tan": // Tangent
                currentOperand = Math.tan(parseFloat(currentOperand) * Math.PI / 180).toString();
                break;
            case "√": // Square root
                currentOperand = Math.sqrt(parseFloat(currentOperand)).toString();
                break;
            default: // Append number or decimal point
                currentOperand += value;
                break;
        }
        updateDisplay();
    });
});
