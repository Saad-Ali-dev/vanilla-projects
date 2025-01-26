// Accessing dom elements
const button = document.getElementById("button");
const hexCodeDisplay = document.getElementById("hex-code");
const background = document.querySelector("main");

// using the audio
const audio = new Audio("./audio/coin sound effect.mp3");

const hexNumbersArray = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
let generatedHex = [];

button.addEventListener("click", (event) => {
  // playing the audio
  audio.currentTime = 0;
  audio.play();

  generateHexColor();
  displayHexColor();

  // reset the array after displaying
  generatedHex = [];
});

function generateHexColor() {
  for (let i = 0; i < 6; i++) {
    /* Generate a random number(0-15) and use it as an index to pull out values from hexNumbersArray[] then push it in new array */
    generatedHex.push(hexNumbersArray[Math.floor(Math.random() * 16)]);
  }

  generatedHex = generatedHex.join("");
}

function displayHexColor() {
  hexCodeDisplay.innerText = `#${generatedHex}`;
  background.style.backgroundColor = `#${generatedHex}`;
}
