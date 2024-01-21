const fetchWeatherInfo = async function (location) {
  const processedWeatherObject = {};
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=99d1c58c2d6a4023bff11303241901&days=3&q=${location}`,
    { mode: "cors" }
  );

  const weatherInfoObject = await response.json();
  console.log(weatherInfoObject);
  /*
  processedWeatherObject.temp_f = weatherInfoObject.current.temp_f;
  processedWeatherObject.temp_c = weatherInfoObject.current.temp_c;

  console.log(processedWeatherObject);
  */
  return processedWeatherObject;
};

fetchWeatherInfo("New York City");
/*
const processWeatherInfo = function (weatherInfoObject) {
  const tempF = weatherInfoObject.current.temp_f;
  console.log(tempF);
};
*/

//processWeatherInfo(fetchWeatherInfo("New York City"));
