const fetchWeatherInfo = async function (location) {
  const processedWeatherObject = {};
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=99d1c58c2d6a4023bff11303241901&days=3&q=${location}`,
    { mode: "cors" }
  );

  const weatherInfoObject = await response.json();
  //console.log(weatherInfoObject);

  processedWeatherObject.forecastdays = weatherInfoObject.forecast.forecastday;
  processedWeatherObject.location = weatherInfoObject.location;
  //console.log(processedWeatherObject);
  return processedWeatherObject;
};

//fetchWeatherInfo("Baltimore");

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const weatherObject = await fetchWeatherInfo(searchBar.value);
  console.log(weatherObject);
});
