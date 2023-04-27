var searchBox = $("#search-box");
var searchBtn = $("#search-btn");
var searchDisplay = $(".search");
var currentWeatherDisplay = $(".today");
var fiveDayDisplay = $(".five-day");
var previousSearchBtn = $(".search");

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
        displayCurrentWeather(data);
        displayFiveDay(data.list);
      }
    })
    .then(() => {
      if (good) {
        var previousSearch = $("<button>");
        previousSearch.addClass("previous-search");
        previousSearch.text(searchBox.val());
        searchDisplay.append(previousSearch);
      }
    })
    .then(() => {
      searchBox.val("");
    });
});

function displayCurrentWeather(data) {
  console.log(data);
  var currentWeather = data.list[0];
  console.log(currentWeather);

  var cityName = $("<h2>");
  cityName.text(data.city.name + " " + getDate(currentWeather));
  currentWeatherDisplay.append(cityName);

  currentWeatherDisplay.append(displayTemp(currentWeather));

  currentWeatherDisplay.append(displayWind(currentWeather));

  // var currentHumidity = $("<p>");
  // currentHumidity.text(`Humidity: ${currentWeather.main.humidity}%`);
  currentWeatherDisplay.append(displayHumidity(currentWeather));

  currentWeatherDisplay.append($("<h3>5-Day Forecast<h3>"));
}

function convertTempToFahrenheit(tempKelvin) {
  return (tempKelvin - 273.15) * (9 / 5) + 32;
}

function getDate(current) {
  var date = current.dt_txt.split(" ")[0];
  var dateInfo = date.split("-");
  var year = dateInfo[0];
  var month = dateInfo[1];
  var day = dateInfo[2];
  return `${month}/${day}/${year}`;
}

function displayFiveDay(dataList) {
  console.log(dataList);
  // fiveDayDisplay.append($("<h3>5-Day Forecast<h3>"));
  var nextFiveDays = [
    dataList[4],
    dataList[12],
    dataList[20],
    dataList[28],
    dataList[36],
  ];

  for (var i = 0; i < nextFiveDays.length; i++) {
    var dayEl = $("<div>");
    dayEl.attr("class", "day");
    dayEl.css("background-color", "rgb(24, 24, 131)");
    dayEl.css("color", "white");
    fiveDayDisplay.append(dayEl);

    var curr = nextFiveDays[i];

    var dateEl = $("<h4>");
    dateEl.text(getDate(curr));
    dayEl.append(dateEl);

    dateEl.append(displayTemp(curr));
    dateEl.append(displayWind(curr));
    dateEl.append(displayHumidity(curr));
  }
}

function displayTemp(dayInfo) {
  var currentTempKelvin = dayInfo.main.temp;
  var currentTempFahrenheit = convertTempToFahrenheit(currentTempKelvin);
  var tempEl = $("<p>");
  tempEl.text(`Temp: ${currentTempFahrenheit.toFixed(2)}°F`);
  return tempEl;
}

function displayWind(dayInfo) {
  var windEl = $("<p>");
  windEl.text(`Wind: ${dayInfo.wind.speed} MPH`);
  return windEl;
}

function displayHumidity(dayInfo) {
  var humidityEl = $("<p>");
  humidityEl.text(`Humidity: ${dayInfo.main.humidity}%`);
  return humidityEl;
}

previousSearchBtn.on("click", function () {
  // var cityName = event.target.textContent;
  // var good = true;
  // var apiKey = "5447ab7f3651e92ac93b0c23f2497452";
  // fetch(
  //   `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
  // )
  //   .then((response) => {
  //     if (response.status === 404) {
  //       alert("404 error");
  //       good = false;
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     if (good) {
  //       displayCurrentWeather(data);
  //       displayFiveDay(data.list);
  //     }
  //   })
  //   .then(() => {
  //     if (good) {
  //       var previousSearch = $("<button>");
  //       previousSearch.addClass("previousSearch");
  //       previousSearch.text(searchBox.val());
  //       searchDisplay.append(previousSearch);
  //     }
  //   })
  //   .then(() => {
  //     searchBox.val("");
  //   });
});
