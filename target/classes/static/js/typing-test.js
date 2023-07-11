$(document).ready(function () {
  $("#typingTestForm").on("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Send form data using AJAX
    $.ajax({
      url: "/typing-test", // The same URL your form action points to
      type: "post",
      data: $(this).serialize(), // Serialize form data for submission
      success: function () {
        console.log("Typing test submitted!");
      },
      error: function () {
        console.log("An error occurred. Please try again.");
      },
    });
  });
});
