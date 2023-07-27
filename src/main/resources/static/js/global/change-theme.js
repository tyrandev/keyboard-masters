let chosenTheme = "";

function setTheme(theme) {
  chosenTheme = theme;
  // Remove any existing theme from the body
  document.body.className = "";

  // If theme is not an empty string, set it to localStorage
  if (theme !== "") {
    localStorage.setItem("theme", theme);
  } else {
    // If theme is empty, get theme from localStorage
    theme = localStorage.getItem("theme");
  }

  // If there is no theme in localStorage, set the theme to "default"
  if (theme === null) {
    theme = "default";
  }

  // Add the selected theme class to the body
  if (theme !== "default") {
    document.body.classList.add(theme);
  }
}

function resetTheme() {
  // Remove all theme classes from the body
  document.body.classList.remove(chosenTheme);

  // Reset theme in localStorage
  localStorage.setItem("theme", "default");

  // Apply changes
  setTheme("");
}

function setDefaultTheme() {
  setTheme("default");
}

setTheme("");
