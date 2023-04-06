let questionDatabase = [
  {
    question: "Inside which HTML element do we put the javascript",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    choice5: "<source>",
    answer: 1,
  },
  {
    question:
      "What is the correct script for referring to an external script called 'xx.js'?",
    choice1: "<script href='xx.js'>",
    choice2: "<script name='xx.js'>",
    choice3: "<script src='xx.js'>",
    choice4: "<script file='xx.js'>",
    choice5: "<script value='xx.js'>",
    answer: 3,
  },
  {
    question: "How do you write 'Hello world' in an alert box?",
    choice1: "msgBox('Hello world')",
    choice2: "alertBox('Hello world')",
    choice3: "msg('Hello world')",
    choice4: "alert('Hello world')",
    choice5: "print('Hello world')",
    answer: 4,
  },
  {
    question:
      "Which of the following is an object-oriented programming language",
    choice1: "javascript",
    choice2: "html",
    choice3: "css",
    choice4: "node",
    choice5: "java",
    answer: 5,
  },
  {
    question: "what year did Nigeria gain her independence?",
    choice1: "1990",
    choice2: "1960",
    choice3: "1999",
    choice4: "2000",
    choice5: "1995",
    answer: 2,
  },
  {
    question: "Who was the first president of Nigeria?",
    choice1: "Olusegun Obasanjo",
    choice2: "Musa Yaradua",
    choice3: "Babangida",
    choice4: "Shehu Shagari",
    choice5: "Buhari",
    answer: 4,
  },
];

// selecting elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.querySelector("#questionCounter");
const scoreText = document.querySelector("#score");
console.log(questionCounterText);

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

const getNewQuestion = () => {
  if (questionDatabase.length === 0 || questionCounter >= MAX_QUESTIONS) {
    window.location.assign("./end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * questionDatabase.length);
  // selected question
  currentQuestion = questionDatabase[questionIndex];
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
startGame();

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = e.target;
    console.log(selectedChoice);
    const selectedAnswer = selectedChoice.dataset["number"];
    const applyEffect =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(applyEffect);
    document.querySelector("body").classList.add(applyEffect);

    setTimeout(() => {
      document.querySelector("body").classList.remove(applyEffect);
      selectedChoice.parentElement.classList.remove(applyEffect);
      getNewQuestion();
    }, 500);
  });
});
