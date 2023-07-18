const AVERAGE_WORD_LENGTH = 4.7;
const GAME_TIME_IN_SECONDS = 60;
let wordsToDisplay = 20;
let wordsToFetch = "word-databases/english-4k.txt";

// Selectors
const wordDisplay = document.querySelector(".word-display");
const wordInput = document.querySelector("#word-input");
const selectors = {
  allWords: document.querySelector(".all-words"),
  incorrectWords: document.querySelector(".incorrect-words"),
  allLetters: document.querySelector(".all-letters"),
  incorrectLetters: document.querySelector(".incorrect-letters"),
  leftCleanSpeed: document.querySelector(".clean-speed-left"),
  leftRawSpeed: document.querySelector(".raw-speed-left"),
  leftAccuracy: document.querySelector(".accuracy-left"),
  timerElement: document.querySelector("#timer"),
  redoButton: document.querySelector("#redo-button"),
};

// Game variables
let fetchedWords = [];
let wordsCurrentlyInGame = [];
let allLetters = 0;
let correctLetters = 0;
let incorrectLetters = 0;
let allWords = 0;
let correctWords = 0;
let incorrectWords = 0;
let accuracy = 0;
let wordToCompareIndex = 0;
let startTime = null;
let rawSpeed = 0;
let cleanSpeed = 0;

// async function setWordDatabase(newWordDataset) {
//   wordsToFetch = newWordDataset;
//   await fetchWords(wordsToFetch);
//   restartGame();
// }

async function fetchWords(wordsChosen) {
  try {
    const response = await fetch(wordsChosen);
    const data = await response.text();
    fetchedWords = data.split("\n").map(
      (word) => word.trim().toLowerCase()
      // .replace(/[^a-z]/g, "")
    );
    // fetchedWords = transformWords(fetchedWords);
    console.log(fetchedWords);
  } catch (error) {
    console.error("Error fetching words:", error);
  }
}

function displayWords() {
  wordsCurrentlyInGame.forEach((word, index) => {
    const spanElement = document.createElement("word");
    spanElement.id = "word-" + index;

    for (let j = 0; j < word.length; j++) {
      const letterElement = document.createElement("letter");
      letterElement.id = "letter-" + index + "-" + j;
      letterElement.textContent = word[j];
      spanElement.appendChild(letterElement);
    }

    wordDisplay.appendChild(spanElement);
    wordDisplay.appendChild(document.createTextNode(" "));
  });
}

async function generateAndDisplayRandomWords() {
  // Empty the array
  wordsCurrentlyInGame = [];

  while (fetchedWords.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  for (let i = 0; i < wordsToDisplay; i++) {
    const randomIndex = Math.floor(Math.random() * fetchedWords.length);
    wordsCurrentlyInGame.push(fetchedWords[randomIndex]);
  }

  // //transforming words according to settings
  // wordsCurrentlyInGame = transformWords(wordsCurrentlyInGame);

  displayWords();
  HighlightTheFirstWord();
}

function HighlightTheFirstWord() {
  const firstWordElement = document.querySelector("#word-0");
  if (firstWordElement) {
    firstWordElement.classList.add("current-word");
  }
}

function cleanWordDisplayUI() {
  wordDisplay.innerHTML = "";
}

function updateUI() {
  selectors.leftCleanSpeed.textContent = cleanSpeed.toFixed(2) + " wpm";
  selectors.leftRawSpeed.textContent = rawSpeed.toFixed(2) + " wpm";
  selectors.leftAccuracy.textContent = accuracy.toFixed(2) + "%";
  selectors.allWords.textContent = allWords;
  selectors.incorrectWords.textContent = incorrectWords;
  selectors.allLetters.textContent = allLetters;
  selectors.incorrectLetters.textContent = incorrectLetters;
}

function startGame() {
  generateAndDisplayRandomWords();
}

function selectLetterElement(letterId, letterNumber) {
  return document.querySelector("#letter-" + letterId + "-" + letterNumber);
}

function selectWordElement(wordId) {
  return document.querySelector("#word-" + wordId);
}

function removeLetterStyles(wordId, length) {
  for (let i = 0; i < length; i++) {
    const letterElement = selectLetterElement(wordId, i);
    letterElement.classList.remove("correct-letter", "incorrect-letter");
  }
}

selectors.redoButton.addEventListener("click", setGameReady);

setGameReady();
fetchWords(wordsToFetch);
startGame();

let timerIntervalId = null;

function startTimer() {
  let timer = GAME_TIME_IN_SECONDS;
  // Set initial timer display
  selectors.timerElement.textContent = formatTime(timer);

  timerIntervalId = setInterval(() => {
    timer--;
    // Update timer display
    selectors.timerElement.textContent = formatTime(timer);
    if (timer <= 0) {
      clearInterval(timerIntervalId);
      endGame();
    }
  }, 1000);
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  // pad seconds with a zero if they're less than 10
  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return `${minutes}:${remainingSeconds}`;
}

function stopTimer() {
  clearInterval(timerIntervalId);
}

function resetTimer() {
  let timer = GAME_TIME_IN_SECONDS;
  selectors.timerElement.textContent = timer;
}

function setGameReady() {
  selectors.redoButton.style.display = "none";
  selectors.timerElement.style.display = "block";
}

//Game logic
wordInput.addEventListener("input", (event) => {
  if (selectors.timerElement.style.display == "none") {
    return;
  }

  if (startTime === null) {
    startTime = performance.now();
    startTimer();
    console.log("timer started");
  }

  const currentWordElement = selectWordElement(wordToCompareIndex);
  currentWordElement.classList.add("current-word");
  let wordInputValue = wordInput.value.trim(); // removes spaces

  // Check if input matches the current word and adapt color accordingly
  const currentGameWord = wordsCurrentlyInGame[wordToCompareIndex];
  for (
    let letterNumber = 0;
    letterNumber < currentGameWord.length;
    letterNumber++
  ) {
    const letterElement = selectLetterElement(wordToCompareIndex, letterNumber);
    letterElement.classList.toggle(
      "correct-letter",
      letterNumber < wordInputValue.length &&
        wordInputValue[letterNumber] === currentGameWord[letterNumber]
    );
    letterElement.classList.toggle(
      "incorrect-letter",
      letterNumber < wordInputValue.length &&
        wordInputValue[letterNumber] !== currentGameWord[letterNumber]
    );
  }

  // Stop here if the last input value was not a space
  if (event.data !== " ") return;

  // Check if input matches the current word
  if (wordInputValue === currentGameWord) {
    currentWordElement.classList.replace("current-word", "correct-word");
    correctWords++;
    correctLetters += wordInputValue.length;
  } else {
    currentWordElement.classList.replace("current-word", "incorrect-word");
    incorrectWords++;

    // Count correct and incorrect letters
    for (
      let i = 0;
      i < Math.min(wordInputValue.length, currentGameWord.length);
      i++
    ) {
      wordInputValue[i] === currentGameWord[i]
        ? correctLetters++
        : incorrectLetters++;
    }
    incorrectLetters += Math.abs(
      wordInputValue.length - currentGameWord.length
    );
  }

  // Reset the single letter styling
  removeLetterStyles(wordToCompareIndex, currentGameWord.length);

  // Prepare for the next word
  wordToCompareIndex++;
  wordInput.value = "";
  currentWordElement.classList.remove("current-word", "incorrect-current-word"); // remove the word highlighting

  // Highlight the next word
  const nextWordElement = selectWordElement(wordToCompareIndex);
  if (nextWordElement) nextWordElement.classList.add("current-word");

  if (areWordsFinished()) {
    cleanWordDisplayUI();
    generateAndDisplayRandomWords();
    wordToCompareIndex = 0;
  }
});

function areWordsFinished() {
  if (wordToCompareIndex === wordsCurrentlyInGame.length) {
    return true;
  } else {
    return false;
  }
}

function endGame() {
  wordInput.value = "";
  let timeDurationGame = (performance.now() - startTime) / 60000; // Convert to minutes
  console.log("timer ends");
  allWords = correctWords + incorrectWords;
  allLetters = correctLetters + incorrectLetters;
  cleanSpeed = roundToTwoDecimalPlaces(
    correctLetters / AVERAGE_WORD_LENGTH / timeDurationGame
  );
  rawSpeed = roundToTwoDecimalPlaces(
    allLetters / AVERAGE_WORD_LENGTH / timeDurationGame
  );
  accuracy = roundToTwoDecimalPlaces((correctLetters / allLetters) * 100);

  var dataToSend = {
    timeInSeconds: 60,
    cleanTypingSpeed: cleanSpeed,
    rawTypingSpeed: rawSpeed,
    accuracy: rawSpeed,
    allWords: allWords,
    incorrectWords: incorrectWords,
    allLetters: allLetters,
    incorrectLetters: incorrectLetters,
  };

  submitTypingTest(dataToSend);
  updateUI();
  restartGame();
  stopTimer();
  resetTimer();
  setGameUnready();
}

function submitTypingTest(data) {
  $.ajax({
    url: "/typing-test",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function () {
      console.log("Typing test submitted!");
    },
    error: function () {
      console.log("An error occurred. Please try again.");
    },
  });
}

function setGameUnready() {
  selectors.redoButton.style.display = "block";
  selectors.timerElement.style.display = "none";
}

function restartGame() {
  cleanWordDisplayUI();
  resetGameData();
  generateAndDisplayRandomWords();
}

function resetGameData() {
  wordsCurrentlyInGame = [];
  allLetters = 0;
  correctLetters = 0;
  incorrectLetters = 0;
  allWords = 0;
  correctWords = 0;
  incorrectWords = 0;
  accuracy = 0;
  wordToCompareIndex = 0;
  startTime = null;
  rawSpeed = 0;
  cleanSpeed = 0;
}

//Game restarts when on escape
document.addEventListener("keydown", (event) => {
  if (event.code === "Enter" || event.code === "Escape") {
    restartGame();
  }
});

wordInput.addEventListener("keydown", (event) => {
  if (event.code === "Enter" || event.code === "Escape") {
    endGame();
  }
});

function roundToTwoDecimalPlaces(value) {
  return Number(value.toFixed(2));
}
