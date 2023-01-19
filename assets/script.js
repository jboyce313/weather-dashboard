var searchBox = $("#search-box");
var searchBtn = $("#search-btn");
var searchDisplay = $(".search");

searchBtn.on("click", function () {
  if (!searchBox.val()) {
    return;
  }

  var good = true;
  var cityName = searchBox.val();
  var apiKey = "5447ab7f3651e92ac93b0c23f2497452";
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
  )
    .then((response) => {
      if (response.status === 404) {
        alert("404 error");
        good = false;
      }
      return response.json();
    })
    .then((data) => {
      if (good) {
        console.log(data);
      }
    })
    .then(() => {
      if (good) {
        var previousSearch = $("<button>");
        previousSearch.text(searchBox.val());
        searchDisplay.append(previousSearch);
      }
    })
    .then(() => {
      searchBox.val("");
    });
});
