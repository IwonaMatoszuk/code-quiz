//varables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerID;

//HTML elements
var startButton = document.getElementById("start");
var questionElement = document.getElementById("questions");
var timerElement = document.getElementById("time");
var choicesElement = document.getElementById("choices");
var finalScoreElement = document.getElementById("final-score");
var initialsElement = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var feedbackElement = document.getElementById("feedback");


//sound element
let sfxCorrect = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");

//Check local storage for latest data
//renderLastQuiz();

//function renderLastQuiz() {
    //The code here to retreve initials
    //initials = localStorage.getItem("initials")
    //finalScore = localStorage.getItem("final-score")
    //if they are null, return early from this function
    //if (!initials || !finalScore) {
        //return;
    //}
//}

// The startGame function is called when the start button is clicked
function questionClick() {
    if(this.value !== questions[currentQuestionIndex].answer) {
        time -=15;

    if (time < 0) {
        time = 0;
    }    
    timerElement.textContent = time;   
    sfxWrong.play();
    feedbackElement.textContent = "Wrong!";
    } else {
        sfxCorrect.play();
        feedbackElement.textContent = "Correct!";
    }

    feedbackElement.setAttribute("class", "feedback");

    setTimeout(function() {
        feedbackElement.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd()
    } else {
        getQuestion();
    }
}

function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];

    let titleElement = document.getElementById("question-title");

    titleElement.textContent = currentQuestion.title;

    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach (function(choice, index) {
        let choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = `${index + 1}. ${choice}`;

        choiceButton.addEventListener("click", questionClick);

        choicesElement.append(choiceButton);
    });

}
function quizEnd() {
    //stop the timer
    clearInterval(timerID);

    let endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");

    let finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;

    questionElement.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function startQuiz() {
    let startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");

    //remove attributes from class
    questionElement.removeAttribute("class");

    //start the timer
    timerID = setInterval(clockTick, 1000);

    timerElement.textContent = time;

    getQuestion();



}

function saveHighScore() {
    let initials = initialsElement.value.trim();

    if (initials !== "") {
        let highScores = JSON.parse(localStorage.getItem("highscores")) || [];
        let newScore = {
            score: time,
            initials: initials,
        }
        highScores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highScores));

        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    if(event.key === "Enter") {
        saveHighScore();
    }
}
startButton.addEventListener("click", startQuiz) 






//getting the questions









submitButton.addEventListener("click", saveHighScore);
initialsElement.addEventListener("keyup", checkForEnter);

//on the end - save initials and score to local storage and render the last registered
//localStorage.setItem("initials", initials);
//localStorage.setItem("final-score", finalScore);
//renderLastQuiz();