const usernameInput = document.getElementById("username")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confirmPassword")
const submitButton = document.getElementById("submitButton")
const thankYouBox = document.getElementById("thankYouBox")
const passwordToggle = document.getElementById("passwordToggle")
const confirmPasswordToggle = document.getElementById("confirmPasswordToggle")


submitButton.addEventListener("click", (e) => {

    let username = usernameInput.value.trim()
    let email = emailInput.value.trim().toLowerCase()
    let password = passwordInput.value.trim()
    let confirmPassword = confirmPasswordInput.value.trim()

     // Track validation status
     let isValid = true

     if (!usernameValidation(username)) isValid = false
     if (!emailValidation(email)) isValid = false
     if (!passwordValidation(password)) isValid = false
     if (!confirmPasswordValidation(password, confirmPassword)) isValid = false
 

     if (isValid){ 
        showThankYouMessage()

        usernameInput.value = ""
        emailInput.value = ""
        passwordInput.value = ""
        confirmPasswordInput.value = ""
     }
})

function usernameValidation(username){
    if( username.length === 0 ){
        showError(usernameInput, "Username is required")
        return false
    }
    else if( username.length < 4 ){
        showError(usernameInput, "Username length must be greater than 4")
        return false
    }
    else if( username.length > 20 ){
        showError(usernameInput, "Username length must be less than 20")
        return false
    }
    else {
        removeError(usernameInput, "Enter username")
        return true
    }
}
function emailValidation(email){
    if( email.length === 0 ){
        showError(emailInput, "Email is required")
        return false
    }
    else if( !(email.includes("@")) ){
        showError(emailInput, "Invalid Email    [ Missing @ ]")
        return false
    }
    else if( !(email.endsWith(".com")) ){
        showError(emailInput, "Invalid Email    [ Missing .com ]")
        return false
    }
    else {
        removeError(emailInput, "Enter email")
        return true
    }
}
function passwordValidation(password){
    if( password.length === 0 ){
        showError(passwordInput, "Password is required")
        return false
    }
    else if( password.length < 8 ){
        showError(passwordInput, "Password must be greater than 8 character")
        return false
    }
    else if( password.length > 12 ){
        showError(passwordInput, "Password must be less than 12 character")
        return false
    }
    else {
        removeError(passwordInput, "Enter password")
        return true
    }
}
function confirmPasswordValidation(password, confirmPasswordValue){
    if( password === confirmPasswordValue ){
        removeError(confirmPasswordInput, "Enter password again")
        return true
    }
    else {
        showError(confirmPasswordInput, "Password is Invalid")
        return false
    }
}

function showError(inputBoxReference, message){
    inputBoxReference.value = ""
    inputBoxReference.placeholder = message
    inputBoxReference.classList.add("border-red", "red-placeholder")
}
function removeError(inputBoxReference, placeholderMessage){
    inputBoxReference.placeholder = placeholderMessage
    inputBoxReference.classList.remove("border-red", "red-placeholder")
}

function showThankYouMessage() {
    thankYouBox.classList.add("show")
    setTimeout(() => {
        thankYouBox.classList.remove("show")
    }, 5000)
}

passwordToggle.addEventListener('click', function () {
    togglePasswordVisibility(passwordInput, passwordToggle);
});
confirmPasswordToggle.addEventListener('click', function () {
    togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle);
});

function togglePasswordVisibility(inputElement, iconElement) {
    if (inputElement.type === 'password') {
        inputElement.type = 'text';
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
    } else {
        inputElement.type = 'password';
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
    }
}