const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const highScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highscores = JSON.parse(localStorage.getItem("highScores")) || [];

// display high score
if (mostRecentScore == null) {
  highScore.innerText = 0;
} else {
  highScore.innerText = mostRecentScore;
}

// max high score
const MAX_HIGH_SCORE = 5;

// implementing save disable
username.addEventListener("keyup", function () {
  saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
  e.preventDefault();

  const Score = {
    score: mostRecentScore,
    username: username.value,
  };

  highscores.push(Score);
  highscores.sort((a, b) => b.score - a.score);
  highscores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highscores));
  return window.location.assign("./index.html");
}
console.log(highscores);
