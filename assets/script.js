var searchBox = $("#search-box");
var searchBtn = $("#search-btn");
var searchDisplay = $(".search");

searchBtn.on("click", function () {
  //   var previousSearch = $("<button>");
  //   previousSearch.text(searchBox.val());
  //   searchDisplay.append(previousSearch);

  var lat = 38.81;
  var lon = -94.53;
  var apiKey = "5447ab7f3651e92ac93b0c23f2497452";
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
