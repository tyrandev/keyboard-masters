console.log("it works");

//sort table by clicking on row name
$(document).ready(function () {
  $("th").click(function () {
    var table = $(this).parents("table").eq(0);
    var rows = table
      .find("tr:gt(0)")
      .toArray()
      .sort(comparer($(this).index()));
    this.asc = !this.asc;
    if (!this.asc) {
      rows = rows.reverse();
    }
    for (var i = 0; i < rows.length; i++) {
      table.append(rows[i]);
    }
  });
  function comparer(index) {
    return function (a, b) {
      var valA = getCellValue(a, index),
        valB = getCellValue(b, index);
      return $.isNumeric(valA) && $.isNumeric(valB)
        ? valA - valB
        : valA.localeCompare(valB);
    };
  }
  function getCellValue(row, index) {
    return $(row).children("td").eq(index).text();
  }
});

window.onload = function () {
  var table = document.querySelector(".test-history");
  var rows = table.rows;
  var maxRows = 10;

  for (var i = maxRows + 1; i < rows.length; i++) {
    rows[i].style.display = "none";
  }
};

// let currentPage = 0;
// const itemsPerPage = 10;
// let data = ${typingTests}; // assuming this is a list of your data

// function updateTable() {
//   let tableBody = document.querySelector('.test-history tbody');
//   tableBody.innerHTML = '';
//   let end = itemsPerPage * (currentPage + 1);
//   let start = itemsPerPage * currentPage;
//   let pageData = data.slice(start, end);
//   for (let item of pageData) {
//     let row = document.createElement('tr');
//     // assuming item is an object with properties matching your table columns
//     row.innerHTML = `
//       <td>${item.cleanTypingSpeed}</td>
//       <td>${item.rawTypingSpeed}</td>
//       <td>${item.accuracy}</td>
//       <td>${item.allWords}</td>
//       <td>${item.incorrectWords}</td>
//       <td>${item.allLetters}</td>
//       <td>${item.incorrectLetters}</td>
//     `;
//     tableBody.appendChild(row);
//   }
// }

// function nextPage() {
//   currentPage++;
//   updateTable();
// }

// function prevPage() {
//   if (currentPage > 0) {
//     currentPage--;
//   }
//   updateTable();
// }

// document.querySelector('#next-page').addEventListener('click', nextPage);
// document.querySelector('#prev-page').addEventListener('click', prevPage);

// updateTable();
