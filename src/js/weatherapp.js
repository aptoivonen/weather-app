import getWeather from "./weatherapi";

const DEFAULT_UNIT = "celsius";

class WeatherApp {
  constructor() {
    this.$form = document.forms["city-name-form"];
    this.$unitButton = document.getElementById("unit-button");
    this.$city = document.getElementById("info-city");
    this.$icon = document.getElementById("info-icon");
    this.$title = document.getElementById("info-title");
    this.$temperature = document.getElementById("info-temperature");
    this.$humidity = document.getElementById("info-humidity-value");
    this.units = DEFAULT_UNIT;
    this.weatherData = {};
    this._bind();
  }

  _bind() {
    this.$form.addEventListener("submit", this._handleWeather.bind(this));
    this.$unitButton.addEventListener(
      "click",
      this._handleUnitChange.bind(this)
    );
  }

  async _handleWeather(event) {
    if (event) {
      event.preventDefault();
    }
    const cityName = this.$form.elements["city-name-input"].value;
    if (!cityName.trim()) {
      return;
    }
    try {
      this.weatherData = await getWeather(cityName, this.units);
      this.render();
    } catch (err) {
      this.weatherData = {};
      console.log(err);
    }
  }

  _handleUnitChange() {
    this.units = this.units === "celsius" ? "fahrenheit" : "celsius";
    this._handleWeather();
  }

  _getUnitPostfix() {
    return this.units === "celsius" ? "°C" : "°F";
  }

  _getTemperaturePrefix(temp) {
    return temp < 0 ? "-" : "+";
  }

  render() {
    this.$unitButton.classList.remove("celsius", "fahrenheit");
    this.$unitButton.classList.add(this.units);
    const { name, country, temp, humidity, title, description, iconUrl } =
      this.weatherData;
    this.$city.textContent = `${name}, ${country}`;
    this.$icon.src = iconUrl;
    this.$icon.alt = description;
    this.$title.textContent = title;
    const tempPrefix = this._getTemperaturePrefix(temp);
    const tempPostfix = this._getUnitPostfix();
    this.$temperature.textContent = `${tempPrefix}${temp} ${tempPostfix}`;
    this.$humidity.textContent = `${humidity} %`;
  }
}

export default WeatherApp;
