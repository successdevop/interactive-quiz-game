let questionDatabase = [];

fetch("questions.json")
  .then((res) => res.json())
  .then((loadedQuestion) => {
    questionDatabase = loadedQuestion;
    startGame();
  })
  .catch((err) => console.log(err));

// selecting elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector(".progress-bar-full");
const scoreText = document.querySelector("#score");
const btnContainer = document.querySelector(".controlBtns");

// game state
let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

// game constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

// implementing functionalities
// increment score
const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

// get new question
const getNewQuestion = () => {
  if (availableQuestion.length == 0 || questionCounter == MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestion.length);
  // selected question
  currentQuestion = availableQuestion[questionIndex];
  // displaying question
  question.textContent = currentQuestion.question;
  // displaying the options
  choices.forEach((eachOption) => {
    const number = eachOption.dataset["number"];
    eachOption.innerText = currentQuestion["choice" + number];
  });

  availableQuestion.splice(questionIndex, 1);
  acceptingAnswer = true;
};

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...questionDatabase];
  getNewQuestion();
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const applyEffect =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (applyEffect === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(applyEffect);
    document.querySelector("body").classList.add(applyEffect);

    setTimeout(() => {
      document.querySelector("body").classList.remove(applyEffect);
      selectedChoice.parentElement.classList.remove(applyEffect);
      getNewQuestion();
    }, 200);
  });
});
