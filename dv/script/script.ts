const display = document.getElementById("display") as HTMLDivElement;
const buttons = document.querySelectorAll("button");

let currentOperand = "";
let previousOperand = "";
let operation = "";

function updateDisplay() {
  display.textContent = currentOperand || "0";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (!value) return;

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
          const prev = parseFloat(previousOperand);
          const current = parseFloat(currentOperand);

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
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);

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
          } else {
            previousOperand = currentOperand;
          }
          currentOperand = "";
          operation = value;
        }
        break;

      case "cos": // Cosinus
        currentOperand = Math.cos(parseFloat(currentOperand) * Math.PI / 180).toString();
        break;

      case "sin": // Sinus
        currentOperand = Math.sin(parseFloat(currentOperand) * Math.PI / 180).toString();
        break;

      case "tan": // Tangente
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
