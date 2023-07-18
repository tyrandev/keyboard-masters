// Script to prevent default css loading and enable themes without flashes
(function () {
  var theme = localStorage.getItem("theme") || "default";
  if (theme !== "default") {
    document.documentElement.className = theme;
  }
})();
