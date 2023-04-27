var searchBox = $("#search-box");
var searchBtn = $("#search-btn");
var searchDisplay = $(".search");
var currentWeatherDisplay = $(".today");
var fiveDayDisplay = $(".five-day");
var forecastHeader = $(".forecast-header");
var cards = $(".cards");
var display = $(".display");

const getWeather = (e, name) => {
  if (!searchBox.val() && !name) {
    return;
  }
  currentWeatherDisplay.empty();
  cards.empty();
  if (!fiveDayDisplay.hasClass("hidden")) fiveDayDisplay.addClass("hidden");
  if (!currentWeatherDisplay.hasClass("hidden"))
    currentWeatherDisplay.addClass("hidden");

  let cityName;
  if (name) {
    cityName = name;
  } else {
    cityName = searchBox.val();
  }
  console.log(cityName);

  const apiKey = "5447ab7f3651e92ac93b0c23f2497452";

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
  )
    .then((response) => {
      if (response.status === 404) {
        alert("City not found!");
      }
      return response.json();
    })
    .then((data) => {
      fiveDayDisplay.removeClass("hidden");
      currentWeatherDisplay.removeClass("hidden");
      displayCurrentWeather(data);
      displayFiveDay(data.list);
    })
    .then(() => {
      if (!name) {
        const previousSearch = $("<button>");
        previousSearch.addClass("previous-search");
        const buttonText = searchBox.val();
        previousSearch.text(buttonText);
        searchDisplay.append(previousSearch);
        previousSearch.on("click", (event) => {
          getWeather(event, buttonText);
        });
      }
    })
    .then(() => {
      searchBox.val("");
    });
};

function displayCurrentWeather(data) {
  var currentWeather = data.list[0];

  var cityName = $("<h2>");
  cityName.addClass("current-city");
  cityName.text(data.city.name + " " + getDate(currentWeather));

  currentWeatherDisplay.append(cityName);

  currentWeatherDisplay.append(displayTemp(currentWeather));

  currentWeatherDisplay.append(displayWind(currentWeather));

  currentWeatherDisplay.append(displayHumidity(currentWeather));

  // currentWeatherDisplay.append($("<h3>5-Day Forecast<h3>"));
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
    cards.append(dayEl);

    var curr = nextFiveDays[i];

    var dateEl = $("<h4>");
    dateEl.text(getDate(curr));
    dayEl.append(dateEl);

    dayEl.append(displayTemp(curr));
    dayEl.append(displayWind(curr));
    dayEl.append(displayHumidity(curr));
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

const func = () => {
  console.log("clicked");
};

searchBtn.on("click", getWeather);
