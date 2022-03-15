import { countries, weatherIcons } from "./helpers.js";

const input = document.querySelector(".city-input");
const heading = document.querySelector("h1");
const countryName = document.querySelector(".country-name");
const temperature = document.querySelector("#temp");
const minTemp = document.querySelector("#min-temp");
const maxTemp = document.querySelector("#max-temp");
const hum = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherIcon = document.querySelector("#weather-icon");

export const weather = {
  apiKey: "4741d22028b090101d3735b88548e200",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (response.status == 404) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.log(error);
      });
  },
  displayWeather: function (data) {
    const { name } = data;
    const { speed } = data.wind;
    const { humidity, temp, temp_min, temp_max } = data.main;
    const { country } = data.sys;
    const { description } = data.weather[0];
    console.log(
      name,
      speed,
      humidity,
      temp,
      temp_min,
      temp_max,
      country,
      description
    );

    heading.innerText = `${name}`;
    countryName.innerText = `,   ${countries[country]}`;

    temperature.innerText = `${temp}\xB0C`;

    minTemp.innerText = `Min: ${temp_min}\xB0C`;

    maxTemp.innerText = `Max: ${temp_max}\xB0C`;

    hum.innerText = `Humidity: ${humidity}%`;

    wind.innerText = `Wind: ${speed}km/h`;

    weatherIcon.src = weatherIcons[description];
  },
  searchWeather: function () {
    this.fetchWeather(input.value);
  },
};
