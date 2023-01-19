var searchBox = $("#search-box");
var searchBtn = $("#search-btn");
var searchDisplay = $(".search");

searchBtn.on("click", function () {
  var previousSearch = $("<button>");
  previousSearch.text(searchBox.val());
  searchDisplay.append(previousSearch);
});
