var startButton = document.querySelector("start");

var title = document.querySelector("question-title");
var options = document.querySelector("choices");
var finalScore = document.querySelector("final-score");
var initials = document.querySelector("initials");

var submitButton = document.querySelector("submit");

var quizFeedback = document.querySelector("feedback")


//Check local storage for latest data
renderLastQuiz();

function renderLastQuiz() {
    //The code here to retreve initials
    initials = localStorage.getItem("initials")
    finalScore = localStorage.getItem("final-score")
    //if they are null, return early from this function
    if (!initials || !finalScore) {
        return;
    }
}

// The startGame function is called when the start button is clicked
//startButton.addEventListener("click", function(event) {
    //event.preventDefault();

//} 



//getting the questions











//on the end - save initials and score to local storage and render the last registered
localStorage.setItem("initials", initials);
localStorage.setItem("final-score", finalScore);
renderLastQuiz();