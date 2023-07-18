var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var message = 'Game Over'
var startButton = document.querySelector(".start-button"); 
var questionContainer = document.getElementById("question-container")

function init() {
    getWins();
    getlosses();
}

function winGame() {
    
}

function countdown() {
    var timePenalty = 120;

    var timeInterval = setInterval(function () {
        timePenalty--;
        timerEl.textContent = timePenalty
        if (timePenalty > 1) {
            timerEl.textContent = timePenalty + ' seconds remaining';
            if (win && timePenalty > 0) {
                clearInterval(timeInterval)
                winGame();
            }
        }
        else if (timePenalty === 1) {
            timerEl.textContent = timePenalty + ' second remaining';
        }
        else {
            timerEl.textContent = ''
            clearInterval(timeInterval);
            displayMessage();
        }
    }, 1000);
    showQuestion();
}

function showQuestion() {
    questionContainer.style.display = "block";
}

startButton.addEventListener("click", countdown);

const correctAnswer = "A keyword that defines a variable or pointer as unchangeable";

function handleFormSubmit(event) {
    event.preventDefault();
    const selectedAnswer= document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }
    const userAnswer = selectedAnswer.ariaValueMax;
    const resultElement = document.getElementById("result");
    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
    }
    else {
        resultElement.textContent = "Incorrect.";
    }
    }
const quizForm = document.getElementById("multiple-choice");
multipleChoice.addEventListener("submit", handleFormSubmit);