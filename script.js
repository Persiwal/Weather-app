import { countries, weatherIcons } from "./helpers.js";
import { unsplash } from "./unsplash-config.js";

// variables start
let searchButton = document.querySelector(".search-button");
let input = document.querySelector(".city-input");
let heading = document.querySelector("h1");
let countryName = document.querySelector(".country-name");
let temperature = document.querySelector("#temp");
let minTemp = document.querySelector("#min-temp");
let maxTemp = document.querySelector("#max-temp");
let hum = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let weatherIcon = document.querySelector("#weather-icon");
// variables end

let weather = {
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

//display this weather on first page load
weather.fetchWeather("Warsaw");
unsplash.fetchPhoto();

// search by clicking button
searchButton.addEventListener("click", function () {
  if (input.value) {
    weather.searchWeather();
    unsplash.fetchPhoto();
  }
});

// search by enter key
input.addEventListener("keyup", function (event) {
  if (event.key == "Enter" && input.value) {
    weather.searchWeather();
    unsplash.fetchPhoto();
  }
});
