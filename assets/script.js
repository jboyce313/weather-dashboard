var searchBox = $("#search-box");
var searchBtn = $("#search-btn");
var searchDisplay = $(".search");
var currentWeatherDisplay = $(".today");

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

function displayCurrentWeather(data) {
  console.log(data);
  var currentWeather = data.list[0];
  console.log(currentWeather);

  var cityName = $("<h2>");
  cityName.text(data.city.name + " " + getDate(currentWeather));
  currentWeatherDisplay.append(cityName);

  var currentTempKelvin = currentWeather.main.temp;
  var currentTempFahrenheit = convertTempToFahrenheit(currentTempKelvin);
  var currentTemp = $("<p>");
  currentTemp.text(`Temp: ${currentTempFahrenheit.toFixed(2)}°F`);
  currentWeatherDisplay.append(currentTemp);

  var currentWind = $("<p>");
  currentWind.text(`Wind: ${currentWeather.wind.speed} MPH`);
  currentWeatherDisplay.append(currentWind);

  var currentHumidity = $("<p>");
  currentHumidity.text(`Humidity: ${currentWeather.main.humidity}%`);
  currentWeatherDisplay.append(currentHumidity);
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
