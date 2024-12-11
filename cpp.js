
const questions = [
    {
        question: "Which header file is required for input/output operations in C++?",
        answers: [

            { text: "&lt;stdio.h&gt;",  correct: false },
            { text: "&lt;iostream&gt;",   correct: true },
            { text: "&lt;string&gt;",     correct: false },
            { text: "&lt;fstream&gt;",    correct: false },
        ]
    },
    {
        question: "What is the correct way to declare an integer variable in C++?",
        answers:
            [

                { text: "int x;", correct: true },
                { text: "integer x;", correct: false },
                { text: "x int;", correct: false},
                { text: " var int x;", correct: false },
            ]
    },
    {
        question: "What does the && operator represent in C++?",
        answers: [

            { text: "Logical AND", correct: true },
            { text: "Logical OR", correct: false },
            { text: "Bitwise AND", correct: false },
            { text: "Assignment", correct: false },
        ]
    },
    {
        question: "How do you create a single-line comment in C++?",
        answers:
            [

                { text: "# This is a comment", correct: false },
                { text: "/* This is a comment */", correct: false },
                { text: "// This is a comment", correct: true },
                { text: "&lt;!-- This is a comment --&gt;", correct: false },
            ]
    },
    {
        question:"Which of the following is used to dynamically allocate memory in C++?",
        answers:
            [

                { text: "malloc()", correct: false },
                { text: "calloc()", correct: false },
                { text: "new", correct: true },
                { text: " delete", correct: false },
            ]
    },


];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {                                                                   
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    } 
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}



function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}




nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();