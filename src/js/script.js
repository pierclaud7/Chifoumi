const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const userChoiceImg = document.getElementById("user-choice-img");
const computerChoiceImg = document.getElementById("computer-choice-img");
const userChoiceZone = document.getElementById("user-choice");
const computerChoiceZone = document.getElementById("computer-choice");
const resetButton = document.getElementById("reset");
const resultContainer = document.getElementById("result-container");

// Tableau des choix avec leur image associée
const choices = {
    1: { name: "Pierre", img: "images/Pierre.jpg" },
    2: { name: "Papier", img: "images/Papier.jpg" },
    3: { name: "Ciseaux", img: "images/Ciseaux.jpg" },
};

// Initialiser les scores à 0
let userScore = 0;
let computerScore = 0;

// Afficher les scores initiaux
function getRandomChoice() {
    // Retourner un choix aleatoire
    return Math.floor(Math.random() * 3) + 1;
}

function calculateResult(userChoice, computerChoice) {
    // Comparer le choix de l'utilisateur et celui de l'ordinateur
    if (userChoice === computerChoice) {
        return "Égalité";
    }

    if (
        (userChoice === 1 && computerChoice === 3) ||
        (userChoice === 2 && computerChoice === 1) ||
        (userChoice === 3 && computerChoice === 2)
    ) {
        userScore++;
        return "Victoire";
    }

    computerScore++;
    return "Défaite";
}

function updateDisplay(userChoice, computerChoice, result) {
    userChoiceImg.src = choices[userChoice].img;
    computerChoiceImg.src = choices[computerChoice].img;

    // Afficher les zones des résultats
    userChoiceZone.classList.remove("hidden");
    computerChoiceZone.classList.remove("hidden");
    document.querySelector(".result-zone").classList.remove("hidden");

    // Mettre à jour les scores
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;

    // Ajouter le résultat dans l'historique avec les couleurs
    const resultText = document.createElement("p");
    resultText.textContent = `${result}`;

    if (result === "Victoire") {
        resultText.style.color = "#00ff00";
    } else if (result === "Défaite") {
        resultText.style.color = "#ff0000"; 
    } else if (result === "Égalité") {
        resultText.style.color = "#ffff00";
    }
    
    resultContainer.appendChild(resultText);
}

// Écouter les clics sur les choix et calculer le résultat
document.querySelectorAll(".choice-button").forEach(button => {
    // Ajouter un écouteur d'événements sur chaque bouton de choix pour calculer le résultat et afficher les résultats dans les zones appropriées
    button.addEventListener("click", () => {
        // Récupérer la valeur du choix de l'utilisateur
        const userChoice = parseInt(button.dataset.choice);
        // Récupérer la valeur du choix de l'ordinateur
        const computerChoice = getRandomChoice();
    
        // Calculer le résultat et afficher les résultats dans les zones appropriées
        const result = calculateResult(userChoice, computerChoice);
        updateDisplay(userChoice, computerChoice, result);
    });
});

// Reinitialiser le jeu
resetButton.addEventListener("click", () => {
    // Reinitialiser les scores
    userScore = 0;
    computerScore = 0;

    // Reinitialiser les images
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;

    // Masquer les zones des résultats
    userChoiceZone.classList.add("hidden");
    computerChoiceZone.classList.add("hidden");
    document.querySelector(".result-zone").classList.add("hidden");

    // Effacer l'historique
    resultContainer.innerHTML = "";
});

