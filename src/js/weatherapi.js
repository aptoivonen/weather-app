const { API_KEY } = process.env;

const UNITS = {
  celsius: "metric",
  fahrenheit: "imperial",
};
Object.setPrototypeOf(UNITS, null);

async function getWeather(cityName, temperatureUnit) {
  const unitOfMeasurement = UNITS[temperatureUnit];
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unitOfMeasurement}&appid=${API_KEY}`;
  const response = await fetch(url, {
    mode: "cors",
  });
  if (!response.ok) {
    throw new Error("No data available");
  }
  const {
    name,
    sys: { country },
    main: { temp, humidity },
    weather: [{ main, description, icon }],
  } = await response.json();
  return {
    name,
    country,
    temp,
    humidity,
    title: main,
    description,
    iconUrl: `http://openweathermap.org/img/wn/${icon}@2x.png`,
  };
}

export default getWeather;
