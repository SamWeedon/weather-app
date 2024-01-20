const fetchWeatherInfo = async function (location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=99d1c58c2d6a4023bff11303241901&q=${location}`,
    { mode: "cors" }
  );
  console.log(response);
  const weatherInfo = await response.json();
  console.log(weatherInfo);
};

fetchWeatherInfo("New York City");
