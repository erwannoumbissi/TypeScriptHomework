// Sélecteurs pour les éléments de l'interface utilisateur
const display = document.getElementById("display") as HTMLDivElement;
const buttons = document.querySelectorAll("button");
const scienceButtons = document.getElementById("science-buttons") as HTMLDivElement;

// Variables pour stocker l'état de la calculatrice
let currentOperand: string = "";
let previousOperand: string = "";
let operation: string = "";

// Fonction pour mettre à jour l'affichage
function updateDisplay(): void {
    display.textContent = currentOperand || "0";
}

// Gestionnaire d'événement pour les boutons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        if (!value) return;

        switch (value) {
            case "AC": // Réinitialiser tout
                currentOperand = "";
                previousOperand = "";
                operation = "";
                break;

            case "+/-": // Inverser le signe
                currentOperand = (parseFloat(currentOperand) * -1).toString();
                break;

            case "%": // Pourcentage
                currentOperand = (parseFloat(currentOperand) / 100).toString();
                break;

            case "=": // Effectuer le calcul
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

            case "+": case "-": case "*": case "/": case "^": // Opérations de base
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

            case "√": // Racine carrée
                currentOperand = Math.sqrt(parseFloat(currentOperand)).toString();
                break;

            case "toBinary": // Conversion en binaire
                currentOperand = parseInt(currentOperand).toString(2);
                break;

            case "toDecimal": // Conversion en décimal
                currentOperand = parseInt(currentOperand, currentOperand.startsWith("0x") ? 16 : 2).toString(10);
                break;

            case "toHexadecimal": // Conversion en hexadécimal
                currentOperand = parseInt(currentOperand).toString(16).toUpperCase();
                break;

            case "time": // Affichage de l'heure actuelle
                const now = new Date();
                currentOperand = now.toLocaleTimeString();
                break;

            default: // Ajouter un chiffre ou un point décimal
                currentOperand += value;
                break;
        }
        updateDisplay();
    });
});

// Gestion du bouton "Science" pour afficher/masquer les boutons scientifiques
const scienceToggle = document.getElementById("science-toggle") as HTMLButtonElement;
scienceToggle.addEventListener("click", () => {
    if (scienceButtons.style.display === "none") {
        scienceButtons.style.display = "block";
    } else {
        scienceButtons.style.display = "none";
    }
});
