import getWeather from "./weatherapi";

const DEFAULT_UNIT = "celsius";

class WeatherApp {
  constructor() {
    this.$form = document.forms["city-name-form"];
    this.$unitButton = document.getElementById("unit-button");
    this.units = DEFAULT_UNIT;
    this._bind();
  }

  _bind() {
    this.$form.addEventListener("submit", this._handleWeather.bind(this));
    this.$unitButton.addEventListener(
      "click",
      this._handleUnitChange.bind(this)
    );
  }

  _handleWeather(event) {
    event.preventDefault();
    const cityName = this.$form.elements["city-name-input"].value;
    if (!cityName.trim()) {
      return;
    }
    getWeather(cityName, this.units)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    this.render();
  }

  _handleUnitChange() {
    this.units = this.units === "celsius" ? "fahrenheit" : "celsius";
    this.render();
  }

  render() {
    this.$unitButton.classList.remove("celsius", "fahrenheit");
    this.$unitButton.classList.add(this.units);
  }
}

export default WeatherApp;
