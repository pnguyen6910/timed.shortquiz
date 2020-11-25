const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: "What is NOT a data type supported by JavaScript?",
        choice1: "Boolean",
        choice2: "Cult",
        choice3: "Symbol",
        choice4: "Object",
        answer: 2,
    },
    {
        question: "What is NOT a way JavaScript code can be involved in an HTML file?",
        choice1: "Inline",
        choice2: "Internal",
        choice3: "Direct",
        choice4: "External",
        answer: 3,
    },
    {
        question: "What is NOT a way to define a variable in JavaScript?",
        choice1: "start",
        choice2: "var",
        choice3: "const",
        choice4: "let",
        answer: 1,
    },
    {
        question: "What is NOT a built-in method in JavaScript?",
        choice1: "forEach()",
        choice2: "length()",
        choice3: "pop()",
        choice4: "forward()",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

var h3 = document.getElementsByTagName("h3");

var sec = 1800,
    countDiv = document.getElementById("timer"), secpass,
    countDown = setInterval(function () {
        'use strict';
        secpass();
    }, 1000);

function secpass() {
    'use strict';
    var min = Math.floor(sec / 60),
        remSec  = sec % 60;
    if (remSec < 10) {    
        remSec = '0' + remSec;
    }
    if (min < 10) {
        min = '0' + min;
    }
    countDiv.innerHTML = min + ":" + remSec;
    if (sec > 0) {
        sec = sec - 1;
    } else {
        clearInterval(countDown);
        countDiv.innerHTML = 'countdown done';
    }
}








