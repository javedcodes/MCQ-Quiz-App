//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 16;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "What does SSD stand for in modern computing?",
    options: ["Solid State Drive", "System Software Drive", "Storage Software Device", "Secure State Disk"],
    correct: "Solid State Drive",
  },
  {
    id: "1",
    question: "Which company manufactures the M1 chip for its devices?",
    options: ["Intel", "AMD", "Apple", "Qualcomm"],
    correct: "Apple",
  },
  {
    id: "2",
    question: "What is the primary purpose of a GPU in a computer?",
    options: ["Data storage", "Graphics rendering", "Sound processing", "Power supply"],
    correct: "Graphics rendering",
  },
  {
    id: "3",
    question: "Which of these is an open-source operating system?",
    options: ["Windows", "Linux", "macOS", "iOS"],
    correct: "Linux",
  },
  {
    id: "4",
    question: "What is the most common type of port for connecting peripherals to computers?",
    options: ["Ethernet", "USB", "HDMI", "VGA"],
    correct: "USB",
  },
  {
    id: "5",
    question: "What does 'cloud computing' primarily refer to?",
    options: [
      "Using remote servers for data storage and processing",
      "Weather forecasting with computers",
      "Storing data in local hard drives",
      "Wireless networking",
    ],
    correct: "Using remote servers for data storage and processing",
  },
  {
    id: "6",
    question: "What is the function of a heat sink in a computer?",
    options: ["Generate power", "Cool down components", "Process data", "Store information"],
    correct: "Cool down components",
  },
  {
    id: "7",
    question: "Which of these is a popular modern programming language for web development?",
    options: ["C", "Fortran", "Python", "Pascal"],
    correct: "Python",
  },
  {
    id: "8",
    question: "What is the main benefit of using an NVMe SSD over a SATA SSD?",
    options: [
      "Lower cost",
      "Increased durability",
      "Faster data transfer speeds",
      "Smaller physical size",
    ],
    correct: "Faster data transfer speeds",
  },
  {
    id: "9",
    question: "Which of the following is a commonly used virtualization software?",
    options: ["Oracle VM VirtualBox", "Microsoft Excel", "Adobe Photoshop", "CorelDRAW"],
    correct: "Oracle VM VirtualBox",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 16;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 16;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
