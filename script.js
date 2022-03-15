import { unsplash } from "./config/unsplash-config.js";
import { weather } from "./config/weather-config.js";

const searchButton = document.querySelector(".search-button");
const input = document.querySelector(".city-input");

//display this weather on first page load
weather.fetchWeather("Warsaw");
unsplash.fetchPhoto();

// search by clicking button
searchButton.addEventListener("click", () => {
  if (input.value) {
    weather.searchWeather();
    unsplash.fetchPhoto();
    input.value = "";
  }
});

// search by enter key
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && input.value) {
    weather.searchWeather();
    unsplash.fetchPhoto();
    input.value = "";
  }
});
