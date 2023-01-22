function printHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    highScores.sort(function(a, b)  {
        return b.score - a.score;
    })

    highScores.forEach(function(score) {
        let li = document.createElement("li");
        li.textContent = `${score.initials} - ${score.score}`

        let ol = document.getElementById("highscores");
        ol.appendChild(li);
    })
        
};


function clearHighScores() {
    localStorage.removeItem("highscores");
    window.location.reload();
}

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearHighScores);


printHighScores();