const MINIMUM_PASSWORD_LENGTH = 4;
const MINIMUM_USERNAME_LENGTH = 4;

console.log("regiser.js loads");

// Select the inputs and the submit button
var usernameInput = document.querySelector("#username-input");
var passwordInput = document.querySelector("#password-input");
var passwordConfirmInput = document.querySelector("#password-confirm-input");
var submitButton = document.querySelector('input[type="submit"]');

// Disable the submit button initially
submitButton.disabled = true;

// Add event listeners to the input fields
usernameInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);
passwordConfirmInput.addEventListener("input", checkInputs);

function checkInputs() {
  var usernameLength = usernameInput.value.length;
  var passwordLength = passwordInput.value.length;
  // Enable the submit button if both username and password have more than 4 characters
  if (
    usernameLength >= MINIMUM_USERNAME_LENGTH &&
    passwordLength >= MINIMUM_PASSWORD_LENGTH
  ) {
    submitButton.disabled = false;
    submitButton.classList.remove("login-form-button-disabled");
  } else {
    submitButton.disabled = true;
    submitButton.classList.add("login-form-button-disabled");
  }

  var password = passwordInput.value;
  var passwordCheck = passwordConfirmInput.value;

  if (password != passwordCheck) {
    submitButton.disabled = true;
    submitButton.classList.add("login-form-button-disabled");
  }
}
