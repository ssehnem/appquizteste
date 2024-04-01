const questions = [
    {
        question : "Em que ano ela nasceu?",
        answers: [
            { text: "1987", correct: false}, 
            { text: "1988", correct: false}, 
            { text: "1989", correct: true}, 
            { text: "1990", correct: false}
        ]
    }, 
    {
        question : "Qual o nome do gato mais antigo dela?",
        answers: [
            { text: "Benjamin", correct: false}, 
            { text: "Meredith", correct: true}, 
            { text: "Olivia", correct: false}, 
            { text: "Burt", correct: false}
        ]
    },    
    {
        question : "Qual o numero da sorte dela?",
        answers: [
            { text: "22", correct: false}, 
            { text: "54", correct: false}, 
            { text: "87", correct: false}, 
            { text: "13", correct: true}
        ]
    }, 
    {
        question : "Com quem ela namora?",
        answers: [
            { text: "Travis Kelce", correct: true}, 
            { text: "Joe Alwyn", correct: false}, 
            { text: "Calvin Harris", correct: false}, 
            { text: "Harry Styles", correct: false}
        ]
    },
    {
        question : "Qual seu ultimo album lançado?",
        answers: [
            { text: "Fearless", correct: false}, 
            { text: "Lover", correct: false}, 
            { text: "Midnights", correct: true}, 
            { text: "reputation", correct: false}
        ]
    } 
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Proximo";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Voce acertou ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Jogue Novamente";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();