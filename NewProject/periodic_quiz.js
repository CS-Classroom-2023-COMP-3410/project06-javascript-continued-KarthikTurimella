const elements = [
    { number: 1, symbol: "H", name: "Hydrogen", group: "Nonmetal" },
    { number: 2, symbol: "He", name: "Helium", group: "Noble Gas" },
    { number: 3, symbol: "Li", name: "Lithium", group: "Alkali Metal" },
    { number: 6, symbol: "C", name: "Carbon", group: "Nonmetal" },
    { number: 8, symbol: "O", name: "Oxygen", group: "Nonmetal" },
    { number: 9, symbol: "F", name: "Fluorine", group: "Halogen" },
    { number: 10, symbol: "Ne", name: "Neon", group: "Noble Gas" },
    { number: 26, symbol: "Fe", name: "Iron", group: "Transition Metal" },
    { number: 79, symbol: "Au", name: "Gold", group: "Transition Metal" }
  ];
  
  let score = 0;
  let highScore = localStorage.getItem("highScore") || 0;
  let currentElement;
  let timeLeft = 30;
  let timer;
  let gameMode = "symbol";
  
  // DOM Elements
  const startGameButton = document.getElementById("start-game");
  const modeSelect = document.getElementById("mode-select");
  const questionContainer = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const answerInput = document.getElementById("answer-input");
  const submitAnswerButton = document.getElementById("submit-answer");
  const hintElement = document.getElementById("hint");
  const scoreElement = document.getElementById("score");
  const highScoreElement = document.getElementById("high-score");
  const timerElement = document.getElementById("timer");
  const timeLeftElement = document.getElementById("time-left");
  const restartButton = document.getElementById("restart-game");
  
  // Start Game
  startGameButton.addEventListener("click", startGame);
  
  function startGame() {
    gameMode = modeSelect.value;
    score = 0;
    scoreElement.textContent = score;
    hintElement.textContent = "";
    questionContainer.style.display = "block";
    startGameButton.style.display = "none";
    restartButton.style.display = "none";
    timerElement.style.display = gameMode === "timeChallenge" ? "block" : "none";
  
    if (gameMode === "timeChallenge") {
      timeLeft = 30;
      timeLeftElement.textContent = timeLeft;
      timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft === 0) endGame();
      }, 1000);
    }
  
    generateQuestion();
  }
  
  function generateQuestion() {
    currentElement = elements[Math.floor(Math.random() * elements.length)];
    
    if (gameMode === "symbol") {
      questionElement.textContent = `What is the name of the element with symbol "${currentElement.symbol}"?`;
    } else if (gameMode === "atomicNumber") {
      questionElement.textContent = `What is the name of the element with atomic number "${currentElement.number}"?`;
    } else {
      questionElement.textContent = `What is the element with symbol "${currentElement.symbol}"?`;
    }
  
    answerInput.value = "";
  }
  
  // Check Answer
  submitAnswerButton.addEventListener("click", () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    if (userAnswer === currentElement.name.toLowerCase()) {
      score++;
      scoreElement.textContent = score;
      hintElement.textContent = "✅ Correct!";
      generateQuestion();
    } else {
      provideHint(userAnswer);
    }
  });
  
  // Provide Hint
  function provideHint(userAnswer) {
    if (!userAnswer) return;
    
    if (!currentElement.name.toLowerCase().startsWith(userAnswer)) {
      hintElement.textContent = `Hint: It starts with "${currentElement.name.charAt(0)}"`;
    } else {
      hintElement.textContent = `Hint: It's in the "${currentElement.group}" group`;
    }
  }
  
  // End Game
  function endGame() {
    clearInterval(timer);
    questionContainer.style.display = "none";
    restartButton.style.display = "block";
    
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    highScoreElement.textContent = highScore;
  }
  
  // Restart Game
  restartButton.addEventListener("click", startGame);
  