import { countries, weatherIcons } from "../helpers.js";

const input = document.querySelector(".city-input");
const heading = document.querySelector("h1");
const countryName = document.querySelector(".country-name-header");
const temperature = document.querySelector("#temp");
const minTemp = document.querySelector("#min-temp");
const maxTemp = document.querySelector("#max-temp");
const hum = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherIcon = document.querySelector("#weather-icon");

export const weather = {
  apiKey: "4741d22028b090101d3735b88548e200",
  fetchWeather: async (city) => {
    try {
      const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather.apiKey}`)
      if(response.status===404) {
        return alert("Can't find city name in database");
      } else {
        const data = await response.json();
      return weather.displayWeather(data);
    }
  } catch (err) {
    console.error(err);
  }
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
  },
  searchWeather: (value) => {
    weather.fetchWeather(value);
  },
};
