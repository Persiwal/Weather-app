import { countries, weatherIcons } from "../helpers.js";

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
  fetchWeather: (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather.apiKey}`
    )
      .then((response) => {
        if (response.status === 404) {
          alert("Can't find city name in database");
        } else {
          return response.json();
        }
      })
      .then((data) => weather.displayWeather(data))
      .catch((error) => {
        console.error(error);
      });
  },
  displayWeather: (data) => {
    const {
      name,
      wind: { speed },
      main: { humidity, temp, temp_min, temp_max },
      sys: { country },
      weather: {
        [0]: { description },
      },
    } = data;

    heading.innerText = `${name},`;
    countryName.innerText = `${countries[country]}`;

    if (window.innerWidth < 415) {
      temperature.innerText = `${parseInt(temp)}\xB0C`;
    } else {
      temperature.innerText = `${temp}\xB0C`;
    }

    minTemp.innerText = `Min: ${temp_min}\xB0C`;

    maxTemp.innerText = `Max: ${temp_max}\xB0C`;

    hum.innerText = `Humidity: ${humidity}%`;
    wind.innerText = `Wind: ${speed}km/h`;

    weatherIcon.src = weatherIcons[description];
    console.log(description);
  },
  searchWeather: () => {
    weather.fetchWeather(input.value);
  },
};
