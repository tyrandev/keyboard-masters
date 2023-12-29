const LINK_TO_DATABASE =
  "https://raw.githubusercontent.com/AndreTyran/words/main/";
// const LINK_TO_DATABASE = "/words-databases/";

document.addEventListener("DOMContentLoaded", function () {
  var languageSelect = document.getElementById("typing-language");
  if (languageSelect) {
    languageSelect.addEventListener("change", getAllWordDatabases);
  }

  // Event listener for dataset change
  var datasetSelect = document.getElementById("dataset-select");
  if (datasetSelect) {
    datasetSelect.addEventListener("change", updateGameWordDataset);
  }

  // Event listeners for toggles
  var capitalLettersToggle = document.getElementById("capital-letters-toggle");
  if (capitalLettersToggle) {
    capitalLettersToggle.addEventListener("click", toggleCapitalLetters);
  }

  var punctuationToggle = document.getElementById("punctuation-toggle");
  if (punctuationToggle) {
    punctuationToggle.addEventListener("click", togglePunctuation);
  }

  var randomNumbersToggle = document.getElementById("random-numbers-toggle");
  if (randomNumbersToggle) {
    randomNumbersToggle.addEventListener("click", toggleRandomNumbers);
  }

  // Event listener for slider
  var wordsVisibleSlider = document.getElementById("words-visible-slider");
  if (wordsVisibleSlider) {
    wordsVisibleSlider.addEventListener("input", updateWordNumberInGame);
  }
});

function updateWordNumberInGame() {
  var slider = document.getElementById("words-visible-slider");
  var valueDisplay = document.getElementById("words-visible-value");
  valueDisplay.textContent = slider.value;
  wordsToDisplay = slider.value;
  restartGame();
}

function togglePunctuation() {
  var toggle = document.getElementById("punctuation-toggle");
  toggle.classList.toggle("on");
  if (toggle.textContent === "On") {
    toggle.textContent = "Off";
    settings.usePunctuation = false;
    console.log("Punctuation off");
  } else {
    toggle.textContent = "On";
    settings.usePunctuation = true;
    console.log("Punctuation on");
  }
  restartGame();
  // Do something based on the current state, e.g., update settings or perform an action
}

function toggleRandomNumbers() {
  var toggle = document.getElementById("random-numbers-toggle");
  toggle.classList.toggle("on");
  if (toggle.textContent === "On") {
    toggle.textContent = "Off";
    settings.useRandomNumbers = false;
  } else {
    toggle.textContent = "On";
    settings.useRandomNumbers = true;
  }
  restartGame();
}

function toggleCapitalLetters() {
  var toggle = document.getElementById("capital-letters-toggle");
  toggle.classList.toggle("on");
  if (toggle.textContent === "On") {
    toggle.textContent = "Off";
    settings.useCapitalLetters = false;
  } else {
    toggle.textContent = "On";
    settings.useCapitalLetters = true;
  }
  restartGame();
}

let languageDatasets = {
  English: [
    "english-200",
    "english-400",
    "english-4k",
    "english-11k",
    "english-250k",
    "english-420k",
  ],
  French: ["french-300", "french-700", "french-1k", "french-10k"],
  Polish: ["polish-200", "polish-500", "polish-1k"],
};

function getAllWordDatabases() {
  var languageSelect = document.getElementById("typing-language");
  var selectedLanguage =
    languageSelect.value.charAt(0).toUpperCase() +
    languageSelect.value.slice(1); // Capitalize the first letter

  var datasetSelect = document.getElementById("dataset-select");
  // clear the old options first
  datasetSelect.innerHTML = "";

  // add new options according to the selected language
  var datasets = languageDatasets[selectedLanguage];
  for (var i = 0; i < datasets.length; i++) {
    var opt = document.createElement("option");
    opt.value = datasets[i];
    opt.innerHTML = datasets[i].replace("-", " "); // Replace hyphen with space
    datasetSelect.appendChild(opt);
  }

  // Update the dataset after changing the language
  updateGameWordDataset();
}

function updateGameWordDataset() {
  cleanWordDisplayUI();
  var select = document.getElementById("dataset-select");
  var selectedDataset = select.value;
  // Add ".txt" to selectedDataset and pass it to the function
  // setWordDatabase("/word-databases/" + selectedDataset + ".txt");
  setWordDatabase(LINK_TO_DATABASE + selectedDataset + ".txt");
}

$(function () {
  $("#word-length-slider").slider({
    range: true,
    min: 1,
    max: 20,
    values: [1, 20],
    slide: function (event, ui) {
      $("#min-word-length").text(ui.values[0]);
      $("#max-word-length").text(ui.values[1]);
      // Do something with the minimum and maximum word lengths
    },
  });
});

//settings
var settings = {
  useCapitalLetters: false,
  usePunctuation: false,
  useRandomNumbers: false,
};

function transformWords(words) {
  return words.map((word) => {
    let transformedWord = word;

    if (settings.useCapitalLetters) {
      transformedWord = capitalizeFirstLetter(transformedWord);
    }

    if (settings.usePunctuation) {
      transformedWord = addRandomPunctuation(transformedWord);
    }

    if (settings.useRandomNumbers) {
      transformedWord = addRandomNumbers(transformedWord);
    }

    return transformedWord;
  });
}

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function addRandomPunctuation(word) {
  // Add random punctuation at the end of the word
  const punctuations = [".", ",", "!", "?", "-", "+", "=", "*", ";", ":", "/"];
  return word + punctuations[Math.floor(Math.random() * punctuations.length)];
}

function addRandomNumbers(word) {
  // Generate a number from 1 to 4, which will be the count of digits to append
  let countOfDigits = Math.floor(Math.random() * 4) + 1;

  // Append the countOfDigits random digits to the end of the word
  for (let i = 0; i < countOfDigits; i++) {
    word += Math.floor(Math.random() * 10);
  }

  return word;
}

// BUG: quantity of words is doubled fist time it is loaded
// getAllWordDatabases();
