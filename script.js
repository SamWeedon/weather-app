const fetchWeatherInfo = async function (location) {
  const processedWeatherObject = {};
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=99d1c58c2d6a4023bff11303241901&days=3&q=${location}`,
    { mode: "cors" }
  );

  const weatherInfoObject = await response.json();
  console.log(weatherInfoObject);

  processedWeatherObject.forecastdays = weatherInfoObject.forecast.forecastday;
  processedWeatherObject.location = weatherInfoObject.location;
  processedWeatherObject.current = weatherInfoObject.current;
  //console.log(processedWeatherObject);
  return processedWeatherObject;
};

//fetchWeatherInfo("Baltimore");

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

let weatherObject;
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  weatherObject = await fetchWeatherInfo(searchBar.value);
  console.log(weatherObject);
  selectedTime.textContent = "Now";
  selectedConditions.src = weatherObject.current.condition.icon;
  selectedTemperature.textContent = `${weatherObject.current.temp_f} F`;

  tomorrowDate.textContent = weatherObject.forecastdays[1].date;
  tomorrowCondition.src = weatherObject.forecastdays[1].day.condition.icon;
  tomorrowLow.textContent = `Low: ${weatherObject.forecastdays[1].day.mintemp_f} F`;
  tomorrowHigh.textContent = `High: ${weatherObject.forecastdays[1].day.maxtemp_f} F`;

  afterTomorrowDate.textContent = weatherObject.forecastdays[2].date;
  afterTomorrowCondition.src = weatherObject.forecastdays[2].day.condition.icon;
  afterTomorrowLow.textContent = `Low: ${weatherObject.forecastdays[2].day.mintemp_f} F`;
  afterTomorrowHigh.textContent = `High: ${weatherObject.forecastdays[2].day.maxtemp_f} F`;
});

for (let i = 0; i < hourButtons.length; i++) {
  hourButtons[i].addEventListener("click", (e) => {
    selectedTime.textContent = e.target.id;
    selectedConditions.src =
      weatherObject.forecastdays[0].hour[i].condition.icon;
    selectedTemperature.textContent = `${weatherObject.forecastdays[0].hour[i].temp_f} F`;
  });
}
