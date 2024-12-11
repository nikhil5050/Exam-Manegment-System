
const questions = [
    {
        question: "How do you insert COMMENTS in C code?",
        answers: [

            { text: "// This is a comment", correct: true },
            { text: "-- This is a comment", correct: false },
            { text: "# This is a comment", correct: false },
            { text: "* This is a comment", correct: false },
        ]
    },
    {
        question: "How can you create a variable with the numeric value 5?",
        answers:
            [

                { text: "num = 5 int;", correct: false },
                { text: "int num = 5;", correct: true },
                { text: "num = 5;", correct: false },
                { text: "val num = 5;", correct: false },
            ]
    },
    {
        question: "Which function is often used to output values and print text?",
        answers: [

            { text: "printf()", correct: true },
            { text: "write()", correct: false },
            { text: "output()", correct: false },
            { text: "printword()", correct: false },
        ]
    },
    {
        question: "Which format specifier is often used to print integers?",
        answers: [

            { text: "%s  ", correct: false },
            { text: "%c", correct: false },
            { text: "%f", correct: false },
            { text: "%d ", correct: true },
        ]
    },
    {
        question: "Which of the following data types is not supported in C?",
        answers: [

            { text: "int", correct: false },
            { text: "float", correct: false },
            { text: "string", correct: true },
            { text: "char ", correct: false },
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