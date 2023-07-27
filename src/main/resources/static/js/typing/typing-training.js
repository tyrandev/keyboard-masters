const AVERAGE_WORD_LENGTH = 4.7;
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

async function setWordDatabase(newWordDataset) {
  wordsToFetch = newWordDataset;
  await fetchWords(wordsToFetch);
  restartGame();
}

async function fetchWords(wordsChosen) {
  try {
    const response = await fetch(wordsChosen);
    const data = await response.text();
    fetchedWords = data.split("\n").map(
      (word) => word.trim().toLowerCase()
      // .replace(/[^a-z]/g, "")
    );
    // fetchedWords = transformWords(fetchedWords);
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

// Generate random words for game
async function generateAndDisplayRandomWords() {
  while (fetchedWords.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  for (let i = 0; i < wordsToDisplay; i++) {
    const randomIndex = Math.floor(Math.random() * fetchedWords.length);
    wordsCurrentlyInGame.push(fetchedWords[randomIndex]);
  }

  //transforming words according to settings
  wordsCurrentlyInGame = transformWords(wordsCurrentlyInGame);

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

fetchWords(wordsToFetch);
startGame();

//Game logic
wordInput.addEventListener("input", (event) => {
  if (startTime === null) {
    startTime = performance.now();
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
    endGame();
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
  cleanSpeed = correctLetters / AVERAGE_WORD_LENGTH / timeDurationGame;
  rawSpeed = allLetters / AVERAGE_WORD_LENGTH / timeDurationGame;
  accuracy = (correctLetters / allLetters) * 100;
  updateUI();
  restartGame();
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

//Game end when we click enter
wordInput.addEventListener("keydown", (event) => {
  if (event.code === "Enter" || event.code === "Escape") {
    endGame();
  }
});
