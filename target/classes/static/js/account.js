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
    rows[i].style.display = "hidden";
  }
};
