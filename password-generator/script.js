const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";


function generatePassword(){
    const len = lenEl.value;
    let password = "";

    if( upperEl.checked ){
        password += getUppercaseLetter();
    }

    if( lowerEl.checked ){
        password += getLowercaseLetter();
    }

    if( numberEl.checked ){
        password += getNumber();
    }

    if( symbolEl.checked ){
        password += getSymbol();
    }

    for (let i = 0; i < len; i++) {
        const x = generateX();
        password += x;
    }

    pwEl.innerText = password;
}

function getUppercaseLetter(){
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getLowercaseLetter(){
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumber(){
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol(){
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateX() {
    const xs = [];
    if (upperEl.checked) {
        xs.push(getUppercaseLetter());
    }

    if (lowerEl.checked) {
        xs.push(getLowercaseLetter());
    }

    if (numberEl.checked) {
        xs.push(getNumber());
    }

    if (symbolEl.checked) {
        xs.push(getSymbol());
    }

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];
}

generateEl.addEventListener("click", generatePassword);


copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});