import getWeather from "./weatherapi";
import { getTemperaturePrefix, getUnitPostfix } from "./weatherutils";
import { show } from "./domutils";

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
    this.weatherData = null;
    this.loading = false;

    this._bind();

    this.render();
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
      this.loading = true;
      this.render();
      this.weatherData = await getWeather(cityName, this.units);
    } catch (err) {
      this.weatherData = null;
      console.log(err);
    } finally {
      this.loading = false;
      this.render();
    }
  }

  _handleUnitChange() {
    this.units = this.units === "celsius" ? "fahrenheit" : "celsius";
    this._handleWeather();
  }

  render() {
    this.$unitButton.classList.remove("celsius", "fahrenheit");
    this.$unitButton.classList.add(this.units);

    if (this.loading) {
      show(".info-spinner");
      return;
    }

    if (!this.weatherData) {
      show(".no-info");
      return;
    }

    show(".info");
    const { name, country, temp, humidity, title, description, iconUrl } =
      this.weatherData;
    this.$city.textContent = `${name}, ${country}`;
    this.$icon.src = iconUrl;
    this.$icon.alt = description;
    this.$title.textContent = title;
    const tempPrefix = getTemperaturePrefix(temp);
    const tempPostfix = getUnitPostfix(this.units);
    this.$temperature.textContent = `${tempPrefix} ${temp} ${tempPostfix}`;
    this.$humidity.textContent = `${humidity} %`;
  }
}

export default WeatherApp;
