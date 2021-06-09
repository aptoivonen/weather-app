function getTemperaturePrefix(temperature) {
  return temperature < 0 ? "-" : "+";
}

function getUnitPostfix(unitOfMeasurement) {
  return unitOfMeasurement === "celsius" ? "°C" : "°F";
}

export { getTemperaturePrefix, getUnitPostfix };
