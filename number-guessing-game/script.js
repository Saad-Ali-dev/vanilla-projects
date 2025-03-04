const userInput = document.getElementById("userInput");
const result = document.getElementById("result");
const attempts = document.getElementById("attempts");
let userValue;
let counter = 0;
userInput.addEventListener("keydown", (event) => {
    if( event.key === "Enter"){
        userValue = userInput.value;
        userInput.value = "";  
        Compare();
        counter++;
    }
})

RandomGenerator();

function RandomGenerator(){
    return randomValue = Math.floor(Math.random() * 100 + 1);
}
function Compare(){
    if( userValue == randomValue){
        result.innerText = "You Won! 😀";
        attempts.innerText = `It took you ${counter} attempts`
    }
    else if( userValue > randomValue){
         result.innerText = "Guess Lower";
    }
    else if( userValue < randomValue){
        result.innerText = "Guess Higher";
    }    
}




