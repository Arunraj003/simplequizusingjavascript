// scripting for simple quiz app  p--3

//set question
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {

        question: "which is the largest desert in the world?",
        answers: [
            { text: "Arabian", correct: false },
            { text: "Thar", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antartica", correct: true },
        ]
    },
    {

        question: "which is the largest continent in the world?",
        answers: [
            { text: "Asia", correct: true },
            { text: "Europe", correct: false },
            { text: "Africa", correct: false },
            { text: "Australia", correct: false },
        ]
    },
    {

        question: "which is the smallest country in the world?",
        answers: [
            { text: "Sri lanka", correct: false },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Vatican city", correct: true },
        ]
    },
    {

        question: "Which is the largest ocean in the world?",
        answers: [
            { text: "Artic Ocean", correct: false },
            { text: "Pacific ocean", correct: true },
            { text: "Indian ocean", correct: false },
            { text: "Atlantic ocean", correct: false },
        ]
    },
    {

        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Africa", correct: false },
            { text: "Australia", correct: true },
            { text: "Europe", correct: false },
            { text: "Antartica", correct: false },
        ]
    }
];

// add an variables

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//create an var for store score and question numbers

let currentQuestionIndex = 0;
let score = 0;

// add a function 
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    //created an fucntion to remove an previous answer input and here it calls before the question selecting part .

    resetState();

    //select and display the question and questionNo for users

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // display the answers by selecting an answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

//it will remove all the previous answers
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");

        score++;
    }else{
        selectedBtn.classList.add("Incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showscore(){
    resetState();
    questionElement.innerHTML  = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showscore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();
