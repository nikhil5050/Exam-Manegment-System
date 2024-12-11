
const questions = [
    {
        question: "Which of the following is used to declare a variable in Python?",
        answers: [

            { text: "int x = 5", correct: false },
            { text: "x := 5", correct: false },
            { text: "x = 5", correct: true },
            { text: "var x = 5", correct: false },
        ]
    },
    {
        question: "How do you insert COMMENTS in Python code?",
        answers:
            [

                { text: "/*This is a comment*/ ", correct: false },
                { text: "//This is a comment", correct: false },
                { text: "#This is a comment  ", correct: true },
                { text: "all of thise", correct: false },
            ]
    },
    {
        question: "Which of the following is a mutable data type in Python?",
        answers:
            [

                { text: "tuple ", correct: false },
                { text: "list", correct: true },
                { text: "string ", correct: false },
                { text: " int", correct: false },
            ]
    },
    {
        question: " Which keyword is used to check if a key exists in a dictionary?",
        answers:
            [

                { text: "exists ", correct: false },
                { text: "has", correct: false },
                { text: "in ", correct: true },
                { text: "check", correct: false },
            ]
    },
    {
        question: "What is the correct extension for Python files?",
        answers:
            [

                { text: ".python", correct: false },
                { text: ".py", correct: true },
                { text: ".pyt", correct: false },
                { text: " .pt", correct: false },
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