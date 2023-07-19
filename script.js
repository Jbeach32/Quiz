var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var message = 'Game Over'
var startButton = document.querySelector(".start-button"); 
var questionContainer = document.getElementById("question-container")
var questionTextEl = document.getElementById("question-text");
var resultElement = document.getElementById("result");

const questions = [
    {
        question: "What does const mean",
        options: ["A keyword that defines a variable or pointer as unchangeable",
                  "A jquery selector",
                  "A constant tag"
        ],
        correctAnswer: "A keyword that defines a variable or pointer as unchangeable"
    },
    {
        question: "What is a <p> tag?",
        options: ["A division that creates a new element",
                  "A block of code that executes a command",
                  "A paragraph indicator"
    ],
    correctAnswer: "A paragraph indicator" 
    },
    {
        question: "What does a flex-box do?",
        options: ["Flex words on HTML",
                  "Design flexible responsive layout structure without using float or positioning",
                  "A data structure that reorders data in a flexible manner"
                ],
                correctAnswer: "Design flexible responsive layout structure without using float or positioning"
    }
];

let currentQuestionIndex = 0;
let timePenalty = 120;

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
                clearInterval(timeInterval);
                winGame();
            }
        }
        else if (timePenalty === 1) {
            timerEl.textContent = timePenalty + ' second remaining';
        }
        else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            displayMessage();
        }
    }, 1000);
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionContainer.style.display = "block";
        const currentQuestion = questions[currentQuestionIndex];
        questionTextEl.textContent = currentQuestion.question;
        const optionsForm = document.getElementById("multiple-choice");
        optionsForm.innerHTML = "";
        currentQuestion.options.forEach((option) => {
            const radioInput = document.createElement("input");
            radioInput.type = "radio"
            radioInput.name = "answer"
            radioInput.value = option;
            const label = document.createElement("label");
            label.textContent = option;
            optionsForm.appendChild(radioInput);
            optionsForm.appendChild(label);
            optionsForm.appendChild(document.createElement("br"));
        });
        currentQuestionIndex++;
        document.getElementById("submit-button").style.display = "block";
    } else {
        document.getElementById("submit-button").style.display = "none";
        winGame();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const selectedAnswer= document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }
    const userAnswer = selectedAnswer.value;
    const correctAnswer = questions[currentQuestionIndex - 1].correctAnswer;
    const resultElement = document.getElementById("result");
    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
    }
    else {
        resultElement.textContent = "Incorrect.";
        timePenalty -= 10;
        if (timePenalty < 0) {
            timePenalty = 0;
        }
    }
    setTimeout(showQuestion, 1000);
}

const quizForm = document.getElementById("multiple-choice");
quizForm.addEventListener("submit", handleFormSubmit);
startButton.addEventListener("click", countdown);