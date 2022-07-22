import { countries, weatherIcons, dayNames } from "../helpers.js";
import { geoLocation } from "./geolocation-config.js";

const input = document.querySelector(".city-input");
const heading = document.querySelector("h1");
const countryName = document.querySelector(".country-name-header");
const temperature = document.querySelector("#temp");
const minTemp = document.querySelector("#min-temp");
const maxTemp = document.querySelector("#max-temp");
const hum = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherIcon = document.querySelector("#weather-icon");
const dailyForecastList = document.querySelector(".forecast__daily__list");
const hourlyForecastList = document.querySelector(".forecast__hourly__list");

export const weather = {
  apiKey: "4741d22028b090101d3735b88548e200",

  fetchCurrentWeather: async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather.apiKey}`
      );
      if (response.status === 404) {
        return alert("Can't find city name in database");
      } else {
        const data = await response.json();
        return weather.displayCurrentWeather(data);
      }
    } catch (err) {
      console.error(err);
    }
  },

  fetchSevenDaysWeather: async (city) => {
    const coords = await geoLocation.fetchCoords(city);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${weather.apiKey}`
      );
      const data = await response.json();
      return weather.displaySevenDaysWeather(data);
    } catch (err) {
      console.error(err);
    }
  },

  fetchHourlyWeather: async (city) => {
    const coords = await geoLocation.fetchCoords(city);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${weather.apiKey}`
      );
      const data = await response.json();
      return weather.displayHourlyWeather(data);
    } catch (err) {
      console.error(err);
    }
  },

  displayCurrentWeather: (data) => {
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

    temperature.innerText = `${temp}\xB0C`;
    minTemp.innerText = `Min: ${temp_min}\xB0C`;
    maxTemp.innerText = `Max: ${temp_max}\xB0C`;
    hum.innerText = `Humidity: ${humidity}%`;
    wind.innerText = `Wind: ${speed}km/h`;
    weatherIcon.src = weatherIcons[description];
  },

  displaySevenDaysWeather: (data) => {
    let days = [];
    dailyForecastList.innerHTML = "";

    for (let i = 1; i < data.daily.length; i++) {
      let weather = {
        temp: data.daily[i].temp.day,
        description: data.daily[i].weather[0].description,
        time: data.daily[i].dt,
      };

      days.push(weather);
    }

    days.map((day) => {
      //convert time to day name
      let timestamp = day.time;
      let date = new Date(timestamp * 1000); // *1000 to convert seconds to miliseconds (JS timestamp is in miliseconds)
      let dayName = dayNames[date.getDay()]; // get day name from helper object

      return (dailyForecastList.innerHTML += `
            <li>
              <h3>${dayName}</h3>
              <img src="${weatherIcons[day.description]}">
              <span>${day.temp.toFixed(2)}\xB0C</span>
            </li>
            `);
    });
  },

  displayHourlyWeather: (data) => {
    let hours = [];
    hourlyForecastList.innerHTML = "";
    const currentTime = new Date();

    for (let i = 1; i < data.hourly.length; i++) {
      let timestamp = data.hourly[i].dt;
      let date = new Date(timestamp * 1000); // *1000 to convert seconds to miliseconds (JS timestamp is in miliseconds)
      let formatedHour = date.getHours();
      let hourExist = hours.some((item) => item.time === formatedHour);

      if (
        formatedHour > currentTime.getHours() &&
        formatedHour < currentTime.getHours() + 8 &&
        !hourExist
      ) {
        let weather = {
          temp: data.hourly[i].temp,
          description: data.hourly[i].weather[0].description,
          time: formatedHour,
        };
        hours.push(weather);
      }
    }

    hours.map((hour) => {
      return (hourlyForecastList.innerHTML += `
            <li>
              <h3>${hour.time}:00</h3>
              <img src="${weatherIcons[hour.description]}">
              <span>${hour.temp.toFixed(2)}\xB0C</span>
            </li>
            `);
    });
  },

  searchWeather: (value) => {
    if (weather.fetchCurrentWeather(value)) {
      weather.fetchSevenDaysWeather(value);
      weather.fetchHourlyWeather(value);
    } else {
      return;
    }
    input.value = "";
  },
};
