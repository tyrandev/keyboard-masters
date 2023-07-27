//prevent pasting to word input
document.getElementById("word-input").addEventListener("paste", (event) => {
  event.preventDefault();
});

//prevent form copying
Array.from(document.getElementsByClassName("word-display")).forEach(
  (element) => {
    element.addEventListener("copy", function (e) {
      e.preventDefault();
      // You may notify the user about this action
      //   alert("Copying text from this element is not allowed!");
      //   restartGame();
    });
  }
);
