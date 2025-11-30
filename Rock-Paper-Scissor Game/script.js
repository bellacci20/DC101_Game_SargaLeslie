let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

const choices = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

const choiceButtons = document.querySelectorAll(".choice-btn");
const resetBtn = document.getElementById("resetBtn");

choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        const choice = button.getAttribute("data-choice");
        playGame(choice);
    });
});

resetBtn.addEventListener("click", resetGame);

function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return "tie";

    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "win";
    }

    return "lose";
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    document.getElementById("battleDisplay").innerHTML = `
        <span>${choices[playerChoice]}</span>
        <span class="vs">VS</span>
        <span>${choices[computerChoice]}</span>
    `;

    const resultMessage = document.getElementById("resultMessage");
    const resultDetail = document.getElementById("resultDetail");

    if (result === "win") {
        playerScore++;
        resultMessage.textContent = "🎉 You Win!";
        resultMessage.className = "result-message win";
        resultDetail.textContent = `${capitalize(playerChoice)} beats ${computerChoice}!`;
    } else if (result === "lose") {
        computerScore++;
        resultMessage.textContent = "😢 You Lose!";
        resultMessage.className = "result-message lose";
        resultDetail.textContent = `${capitalize(computerChoice)} beats ${playerChoice}!`;
    } else {
        tieScore++;
        resultMessage.textContent = "🤝 It's a Tie!";
        resultMessage.className = "result-message tie";
        resultDetail.textContent = "Great minds think alike!";
    }

    updateScores();
}

function updateScores() {
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("computerScore").textContent = computerScore;
    document.getElementById("tieScore").textContent = tieScore;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;

    updateScores();

    document.getElementById("battleDisplay").innerHTML = "";
    document.getElementById("resultMessage").textContent = "Make your choice!";
    document.getElementById("resultMessage").className = "result-message";
    document.getElementById("resultDetail").textContent = "";
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
