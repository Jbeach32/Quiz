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
let win = false;
let numOfWins = 0;
let numOfLosses = 0;
let numOfCorrectAnswers= 0;
numOfWins

function init() {
    //getWins();
    //getlosses();
}

let quizStarted = false;

function handleActionClick() {
    console.log("hits here")
    if (!quizStarted) {
        quizStarted = true;
        countdown();
        document.getElementById("action-button").textContent = "Submit";
    } else {
        handleFormSubmit();
    }
}

document.getElementById("action-button").addEventListener("click", handleActionClick);

function winGame() {
    numOfWins++
    numOfCorrectAnswers=0
    console.log(numOfWins)
    document.getElementById("wins-count").textContent = numOfWins;
    initials = document.getElementById("initials-input").value;
    document.getElementById("initials-input").textContent = initials;
    document.getElementById("save-score-container").style.display = "none";
    questionContainer.style.display = "none";
    document.getElementById("countdown").style.display = "none"; 
    document.getElementById("replay-container").style.display = "block";   
}

function saveScore(initials, score) {
    const scores= JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ initials, score});
    localStorage.setItem("scores", JSON.stringify(scores));
    document.getElementById("initials-display").textContent = initials;
}

document.getElementById("save-score-button").addEventListener("click", function (){
    const initials = document.getElementById("initials-input").value;
    if (initials.trim() === "") {
        alert("Please enter your initials.");
        return;
    }
    saveScore(initials, timePenalty);
currentQuestionIndex = 0;
timePenalty = 120;
countdown();
})

function countdown() {
    var timePenalty = 120;

    var timeInterval = setInterval(function () {
        timePenalty--;
        timerEl.textContent = timePenalty
        if (timePenalty > 1) {
            timerEl.textContent = timePenalty + ' seconds remaining';
            if (win && timePenalty > 0) {
               // clearInterval(timeInterval);
                //winGame();
            }
        }
        else if (timePenalty === 1) {
            timerEl.textContent = timePenalty + ' second remaining';
        }
        else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            displayMessage();
            if (timePenalty === 0) {
                //winGame();
            }
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
        document.getElementById("action-button").style.display = "block";
    } else {
        document.getElementById("action-button").style.display = "none";
        document.getElementById("countdown").style.display = "none";
        
    }
    resultElement.textContent = "";
}

function handleFormSubmit(event) {
    const selectedAnswer= document.querySelector('input[name="answer"]:checked');
    const numOfAnswersToWin = 3;
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }
    const userAnswer = selectedAnswer.value;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    console.log(userAnswer)
    console.log(correctAnswer)
    const resultElement = document.getElementById("result");
    console.log(userAnswer === correctAnswer)
    if (userAnswer === correctAnswer) {
        numOfCorrectAnswers++
        resultElement.textContent = "Correct!";
        console.log(numOfCorrectAnswers)
        console.log(numOfCorrectAnswers)
        if (numOfAnswersToWin === numOfCorrectAnswers) {
            console.log("You Won")
            winGame()
        }
    }
    else {
        numOfLosses++
        resultElement.textContent = "Incorrect.";
        timePenalty -= 10;
        if (timePenalty < 0) {
            timePenalty = 0;
        }
        document.getElementById("losses-count").textContent = numOfLosses;
    }
    currentQuestionIndex++;
    showQuestion();
}

function playAgain() {
    quizStarted = false;
    currentQuestionIndex = 0;
    timePenalty = 120;
    win = false;
    document.getElementById("action-button").textContent = "Start";
    document.getElementById("save-score-container").style.display = "block";
    questionContainer.style.display = "none";
    document.getElementById("countdown").textContent = "Are you ready?";
    document.getElementById("replay-container").style.display = "none";
    document.getElementById("result").textContent = "";
    document.getElementById("multiple-choice").innerHTML = "";
}

const quizForm = document.getElementById("multiple-choice");
quizForm.addEventListener("submit", handleFormSubmit);
startButton.addEventListener("click", showQuestion);

document.getElementById("save-score-button").addEventListener("click", function () {
    //const initials = document.getElementById("initials-input").value;
    if (initials.trim() === "") {
        alert("Please enter your initials.");
        return;
    }
    saveScore(initials, numOfWins, numOfLosses);
    playAgain();
});