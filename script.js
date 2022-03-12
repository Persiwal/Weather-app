import { countriesStorage } from "./countries.js";
console.log(countriesStorage["AF"]);
let weather = {
  apiKey: "4741d22028b090101d3735b88548e200",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
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

    let heading = document.querySelector("h1");
    heading.innerText = `Weather in ${name}`;

    let countryName = document.querySelector(".country-name");
  },
};
