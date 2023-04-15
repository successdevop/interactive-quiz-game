const highscoreList = document.querySelector(".highScoresList");
const highscores = JSON.parse(localStorage.getItem("highScores")) || [];

function displayHighScores(highScore) {
  let scores = highScore
    .map((item) => {
      return `<li class="scoreDetails">
            ${item.username} : <span class="displayScore">${item.score}</span>
          </li>`;
    })
    .join("");
  highscoreList.innerHTML = scores;
}
displayHighScores(highscores);
