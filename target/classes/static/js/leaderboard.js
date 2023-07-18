// Increment user place number
window.onload = function () {
  var tableBody = document.querySelector(".table-style tbody");
  var rows = tableBody.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var firstCell = rows[i].cells[0];
    firstCell.textContent = i + 1; // +1 because array indexing starts from 0
  }
};
