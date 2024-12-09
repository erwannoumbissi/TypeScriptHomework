var display = document.getElementById("display");
var buttons = document.querySelectorAll("button");
var scienceToggle = document.getElementById("science-toggle");
var scienceButtons = document.getElementById("science-buttons");

var currentOperand = "";
var previousOperand = "";
var operation = "";

// Mise à jour de l'affichage
function updateDisplay() {
    display.textContent = currentOperand || "0";
}

// Bascule d'affichage des boutons scientifiques
scienceToggle.addEventListener("click", function () {
    if (scienceButtons.style.display === "none") {
        scienceButtons.style.display = "grid";
    } else {
        scienceButtons.style.display = "none";
    }
});

// Gestion des clics sur les boutons
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var value = button.getAttribute("data-value");
        if (!value) return;

        switch (value) {
            case "AC": // Reset
                currentOperand = "";
                previousOperand = "";
                operation = "";
                break;
            case "+/-": // Changer de signe
                currentOperand = (parseFloat(currentOperand) * -1).toString();
                break;
            case "%": // Pourcentage
                currentOperand = (parseFloat(currentOperand) / 100).toString();
                break;
            case "=": // Calcul
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
            case "+": case "-": case "*": case "/": case "^": // Opérations basiques
                if (currentOperand) {
                    if (previousOperand) {
                        previousOperand = eval(previousOperand + operation + currentOperand).toString();
                    } else {
                        previousOperand = currentOperand;
                    }
                    currentOperand = "";
                    operation = value;
                }
                break;
            case "sin": // Sinus
                currentOperand = Math.sin(parseFloat(currentOperand) * Math.PI / 180).toString();
                break;
            case "cos": // Cosinus
                currentOperand = Math.cos(parseFloat(currentOperand) * Math.PI / 180).toString();
                break;
            case "tan": // Tangente
                currentOperand = Math.tan(parseFloat(currentOperand) * Math.PI / 180).toString();
                break;
            case "√": // Racine carrée
                currentOperand = Math.sqrt(parseFloat(currentOperand)).toString();
                break;
            case "toBinary": // Conversion binaire
                currentOperand = parseInt(currentOperand).toString(2);
                break;
            case "toDecimal": // Conversion décimale
                currentOperand = parseInt(currentOperand, currentOperand.startsWith("0x") ? 16 : 2).toString(10);
                break;
            case "toHexadecimal": // Conversion hexadécimale
                currentOperand = parseInt(currentOperand).toString(16).toUpperCase();
                break;
            case "time": // Heure actuelle
                var now = new Date();
                currentOperand = now.toLocaleTimeString();
                break;
            default: // Saisie de nombres
                currentOperand += value;
                break;
        }
        updateDisplay();
    });
});
