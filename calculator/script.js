
const inputBox = document.querySelector(".box")
const deleteButton = document.querySelector(".delete-button")
const previousAnsButton = document.querySelector(".previous-ans-button")
const errorHeading = document.querySelector(".error-heading")
const errorMessage = document.querySelector(".error-message")
const outputScreen = document.querySelector(".output-screen")
const errorBox = document.querySelector(".error-box");


const allowedCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "(", ")"]

function displayData(input){
    outputScreen.textContent += input
}

function clearDisplay(){
    outputScreen.textContent = ""
}

function deleteCharacter(){
    outputScreen.textContent = outputScreen.textContent.slice(0, -1)
}

function showError() {
    errorBox.classList.remove("hide"); // Remove hide if previously hidden
    errorBox.classList.add("show");

    setTimeout(() => {
        errorBox.classList.remove("show");
        errorBox.classList.add("hide");
    }, 3000); // 3 seconds before hiding
}


function Calculate(){
    try {
        let result = eval(outputScreen.textContent)
        if( result === Infinity ){
            errorHeading.innerText = "Input Error"
            errorMessage.innerText = `Cannot divide by zero\nPlease re-enter your question`
            showError()
        }else {
            outputScreen.textContent = result
        }
    } catch(error){
        if( error instanceof SyntaxError ){
            errorHeading.innerText = "Input Error"
            errorMessage.innerText = `Invalid input given\n\nPlease re-enter your question`
            showError()
        }
        
    }
}


inputBox.addEventListener("click", (event) => {
    let input = event.target.innerText

    if( input === "=" ){
        Calculate()
    }else if( input === "C" || input === "c" ){
        clearDisplay()
    }else if( input === "del" ){
        deleteCharacter()
    }else if( input.length === 1 ){
        displayData(input)
    }
})

document.addEventListener("keydown", (event) => {
    let input = event.key
    if( allowedCharacters.includes(input) ){
        displayData(input)
    }else if( input === "C" || input === "c"){
        clearDisplay()
    }else if( input === "Backspace" ){
        deleteCharacter()
    }else if( input === "Enter" ){
        Calculate()
    }
})