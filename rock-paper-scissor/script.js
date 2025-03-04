// Rock Paper Scissors Game:

const images = document.querySelectorAll("img");
const messageBox = document.querySelector("#msg-box");
const playerScoreElement = document.querySelector("#user-score");
const computerScoreElement = document.querySelector("#comp-score");
let playerScore = Number(playerScoreElement.innerText);
let computerScore = Number(computerScoreElement.innerText);

const choices = ["rock", "paper", "scissors"];

function computerChoice(){
    return choices[Math.floor(Math.random() * choices.length)];
}

images.forEach((image) => {
    image.addEventListener("click", () => {
        playGame(image);
})
});

function playGame(image){
    const playerChoice = image.getAttribute("alt");
    const computer = computerChoice();
    const player = playerChoice;

    if(player === computer){
        messageBox.style.backgroundColor = "rebeccapurple";
        messageBox.innerText = "It's a tie!";
    } else if(player === "rock" && computer === "scissors" || player === "paper" && computer === "rock" || player === "scissors" && computer === "paper"){
        messageBox.style.backgroundColor = "green";
        messageBox.innerText = `You win! ${player} beats ${computer}`;
        playerScoreElement.innerText = `${++playerScore}`;
    } else {
        messageBox.style.backgroundColor = "red";
        messageBox.innerText = `You lose! ${computer} beats ${player}`;
        computerScoreElement.innerText = `${++computerScore}`;
    }
}