import quizData from "./quizData.js";

const quizQuestionEl = document.getElementById("question");
const optionA = document.getElementById("a_text");
const optionB = document.getElementById("b_text");
const optionC = document.getElementById("c_text");
const optionD = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

window.onload = () => {
    loadQuestion();
};

submitBtn.addEventListener("click", (event) => {
    let userAnswer = getUserAns();
    
    // Check if there is no answer selected
    if (!userAnswer) {
        alert("Please select an option");
        return;
    }
    
    // If there are still questions left, check the answer and load next question
    if (currentQuestion < quizData.length - 1) {
        checkUserAns(userAnswer);
        currentQuestion++;
        loadQuestion();
    } else {
        // Last question: check the answer, show score, and disable further submissions
        checkUserAns(userAnswer);
        alert(`Quiz completed! Your score is ${score}/${quizData.length}`);
        submitBtn.disabled = true; 
    }
});

function loadQuestion() {
    // Reset radio buttons
    const options = document.getElementsByName("answer");
    options.forEach((option) => {
      option.checked = false;
    });

    // Load current question and its options
    quizQuestionEl.textContent = quizData[currentQuestion].question;
    optionA.textContent = quizData[currentQuestion].a;
    optionB.textContent = quizData[currentQuestion].b;
    optionC.textContent = quizData[currentQuestion].c;
    optionD.textContent = quizData[currentQuestion].d;
}

function getUserAns() {
    let userAns = null;
    const options = document.getElementsByName("answer");
    options.forEach((option) => {
        if (option.checked) {
            userAns = option.id;
        }
    });
    return userAns;
}

function checkUserAns(userAns) {
    if (userAns === quizData[currentQuestion].correct) {
        score++;
    }
}
