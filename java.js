
const questions = [
    {
        question: "Which of these is a valid keyword in Java?",
        answers: [

            { text: "include", correct: false },
            { text: "unsigned", correct: false },
            { text: "interface", correct: true },
            { text: "typedef", correct: false },
        ]
    },
    {
        question: " Which of the following is not a primitive data type in Java?",
        answers:
            [

                { text: "int ", correct: false },
                { text: "boolean", correct: false },
                { text: "float  ", correct: false },
                { text: "String", correct: true },
            ]
    },
    {
        question: "What is the size of the int data type in Java?",
        answers: [

            { text: "8 bits", correct: false },
            { text: "16 bits", correct: false },
            { text: " 32 bits", correct: true },
            { text: "64 bits", correct: false },
        ]
    },
    {
        question: "Which keyword is used to inherit a class in Java?",
        answers:
            [

                { text: "extends", correct: true },
                { text: "implements", correct: false },
                { text: " inherits", correct: false },
                { text: "super", correct: false },
            ]
    },
    {
        question: "  What is the default value of a boolean variable in Java?",
        answers:
            [

                { text: "true ", correct: false },
                { text: "false", correct: true },
                { text: "0 ", correct: false },
                { text: "null", correct: false },
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