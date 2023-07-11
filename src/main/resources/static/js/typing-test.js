//read data from inputs and send it by ajax request
$(document).ready(function () {
  // Select the form
  var form = $("#typingTestForm");

  form.on("submit", function (event) {
    event.preventDefault();

    // AJAX POST request
    $.ajax({
      type: form.attr("method"),
      url: form.attr("action"),
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        console.log("Response:", response);
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  });
});

var dataTest1 = {
  timeInSeconds: 60,
  cleanTypingSpeed: 100,
  rawTypingSpeed: 90,
  accuracy: 90,
  allWords: 11,
  incorrectWords: 11,
  allLetters: 11,
  incorrectLetters: 111,
};

var dataTest2 = {
  timeInSeconds: 160,
  cleanTypingSpeed: 110,
  rawTypingSpeed: 112,
  accuracy: 95,
  allWords: 100,
  incorrectWords: 99,
  allLetters: 110,
  incorrectLetters: 1110,
};

// $(document).ready(function () {
//   $("#typingTestForm").on("submit", function (e) {
//     e.preventDefault();

//     $.ajax({
//       url: "/typing-test",
//       type: "post",
//       contentType: "application/json",
//       data: JSON.stringify(data),
//       success: function () {
//         console.log("Typing test submitted!");
//       },
//       error: function () {
//         console.log("An error occurred. Please try again.");
//       },
//     });
//   });
// });

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

submitTypingTest(dataTest1);
submitTypingTest(dataTest2);
