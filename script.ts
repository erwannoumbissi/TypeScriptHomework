// script.ts
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
