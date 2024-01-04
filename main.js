const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log("started")
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "What form is Harry's Patronus?",
        answer: [
            {text: 'Stag', correct: true},
            {text: 'Doe', correct: false},
            {text: 'Rabbit', correct: false},
            {text: 'Hippogriff', correct: false},
        ]
    },{
        question: "What is Umbridge favorite animal?",
        answer: [
            {text: 'Dog', correct: false},
            {text: 'Snake', correct: false},
            {text: 'Cat', correct: true},
            {text: 'Bat', correct: false},
        ]
    },{
        question: "What is Dumbledore's favorite jam?",
        answer: [
            {text: 'Strawberry', correct: false},
            {text: 'Raspberry', correct: true},
            {text: 'Apricot', correct: false},
            {text: 'Cherry', correct: false},
        ]
    }, {
        question: "What color are Dobby's eyes?",
        answer: [
            {text: 'Blue', correct: false},
            {text: 'Brown', correct: false},
            {text: 'Green', correct: true},
            {text: 'Yellow', correct: false},
        ]
    }, {
        question: "What book is the store Flourish and Blotts not going to sell anymore, after 255 copies vanished?",
        answer: [
            {text: 'The Invisible Book of Invisibility', correct: false},
            {text: 'The Monster Book of Monsters', correct: false},
            {text: 'History of Magic Part 2', correct: true},
            {text: 'Magical Me - Gilderoy Lockhart', correct: false},
        ]
    }, {
        question: "What are the magical powers of a Flobberworm?",
        answer: [
            {text: 'The bite of a Flobberworm makes you levitate', correct: false},
            {text: 'The mucus of a Flobberworm lets you breath under water', correct: false},
            {text: 'The hide of a Flobberworm makes you invisible', correct: false},
            {text: 'None at all', correct: true},
        ]
    }
]