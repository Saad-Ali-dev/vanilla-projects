const randomValue = document.getElementById("value");
const button = document.getElementById("generate");

function GenerateRandom(){
    let Random = Math.round(Math.random() * 100 + 1);
    randomValue.innerText = Random;
}

button.addEventListener("click", GenerateRandom)