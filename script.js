const fetchWeatherInfo = async function (location) {
  /*
  Fetch weather info object from weatherapi.com
  */
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=99d1c58c2d6a4023bff11303241901&days=3&q=${location}`,
    { mode: "cors" }
  );

  const weatherInfoObject = await response.json();

  return weatherInfoObject;
};

// get DOM elements
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const selectedWeather = document.getElementById("selected-weather");
const selectedTemperature = document.getElementById("temperature");
const selectedConditions = document.getElementById("conditions");
const selectedTime = document.getElementById("time");
const hourButtons = document.querySelectorAll(".hour");
const tomorrowDate = document.getElementById("tomorrow-date");
const tomorrowCondition = document.getElementById("tomorrow-condition");
const tomorrowLow = document.getElementById("tomorrow-low");
const tomorrowHigh = document.getElementById("tomorrow-high");
const afterTomorrowDate = document.getElementById("day-after-tomorrow-date");
const afterTomorrowCondition = document.getElementById(
  "day-after-tomorrow-condition"
);
const afterTomorrowLow = document.getElementById("day-after-tomorrow-low");
const afterTomorrowHigh = document.getElementById("day-after-tomorrow-high");
const loading = document.getElementById("loading");

const getWeekdayName = function (weekdayIndex) {
  /*
  Given an index from 0-6, like from the DateObject.getDay() method,
  return its corresponding weekday
  */
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[weekdayIndex];
};

let weatherObject;
const loadWeather = async function (event) {
  /*
  Load and display all weather info
  */

  // prevent form "submission" on search button click, while still allowing function to be called
  // without an event argument
  if (event) {
    event.preventDefault();
  }

  // get weather info object from API
  document.body.style.opacity = "20%";
  weatherObject = await fetchWeatherInfo(searchBar.value);
  document.body.style.opacity = "100%";

  // Standardize and specify searchbar value
  searchBar.value = `${weatherObject.location.name}, ${
    weatherObject.location.region
      ? weatherObject.location.region
      : weatherObject.location.country
  }`;

  // Load current weather
  selectedTime.textContent = "Now";
  selectedConditions.src = weatherObject.current.condition.icon;
  selectedTemperature.textContent = `${weatherObject.current.temp_f} F`;

  // Load tomorrow's weather
  const tomorrow = new Date(
    `${weatherObject.forecast.forecastday[1].date}T00:00`
  );
  tomorrowDate.textContent = getWeekdayName(tomorrow.getDay());
  tomorrowCondition.src =
    weatherObject.forecast.forecastday[1].day.condition.icon;
  tomorrowLow.textContent = `Low: ${weatherObject.forecast.forecastday[1].day.mintemp_f} F`;
  tomorrowHigh.textContent = `High: ${weatherObject.forecast.forecastday[1].day.maxtemp_f} F`;

  // Load the day after tomorrow's weather
  const afterTomorrow = new Date(
    `${weatherObject.forecast.forecastday[2].date}T00:00`
  );
  afterTomorrowDate.textContent = getWeekdayName(afterTomorrow.getDay());
  afterTomorrowCondition.src =
    weatherObject.forecast.forecastday[2].day.condition.icon;
  afterTomorrowLow.textContent = `Low: ${weatherObject.forecast.forecastday[2].day.mintemp_f} F`;
  afterTomorrowHigh.textContent = `High: ${weatherObject.forecast.forecastday[2].day.maxtemp_f} F`;
};

// Make an event listener for the search button
searchButton.addEventListener("click", (e) => loadWeather(e));

// Make event listeners for the hourly weather buttons
for (let i = 0; i < hourButtons.length; i++) {
  hourButtons[i].addEventListener("mouseover", (e) => {
    selectedTime.textContent = e.target.id;
    selectedConditions.src =
      weatherObject.forecast.forecastday[0].hour[i].condition.icon;
    selectedTemperature.textContent = `${weatherObject.forecast.forecastday[0].hour[i].temp_f} F`;
  });
}

// driver script
searchBar.value = "Baltimore, Maryland";
loadWeather();
