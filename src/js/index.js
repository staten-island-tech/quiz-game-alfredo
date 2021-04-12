const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is the square root of 9",
    choice1: "3",
    choice2: "6",
    choice3: "8",
    choice4: "4",
    answer: 1,
  },
  {
    question: "What is the square root of 81",
    choice1: "16",
    choice2: "20",
    choice3: "9",
    choice4: "18",
    answer: 3,
  },
  {
    question: "What is the square root of 4",
    choice1: "2",
    choice2: "apple",
    choice3: "New York",
    choice4: "9999",
    answer: 1,
  },
  {
    question: "What is yellow",
    choice1: "banana",
    choice2: "orange",
    choice3: "apple",
    choice4: "cucumber",
    answer: 1,
  },
  {
    question: "I got lazy, answer is choice 4",
    choice1: "nothing",
    choice2: "0",
    choice3: "1",
    choice4: "just press me",
    answer: 4,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

//below is how the quiz game starts
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};
//how the next question is grabbed
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};
//calculating points/is it correct or not

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementscore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementscore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
