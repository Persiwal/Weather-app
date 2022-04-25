import { unsplash } from "./config/unsplash-config.js";
import { weather } from "./config/weather-config.js";
import { cities } from "./config/cities-config.js";

const suggestions = document.querySelector(".search-box__suggestions");
const searchButton = document.querySelector(".search-button");
const input = document.querySelector(".city-input");
const cityHeader = document.querySelector("h1");

//display this weather on first page load
//unsplash.fetchPhoto();
weather.searchWeather("Warsaw");
// search by clicking button
searchButton.addEventListener("click", () => {
    if (input.value) {
        //unsplash.fetchPhoto();
        weather.searchWeather(input.value);
        input.value = "";
    }
});

// search by enter key
input.addEventListener("keyup", (event) => {
    if (input.value.length > 2) {
        input.style.borderRadius = `0rem`;
    } else {
        input.style.borderRadius = `1.25rem`;
    }
    if (event.key === "Enter" && input.value) {
        // unsplash.fetchPhoto();
        weather.searchWeather(input.value);
        input.value = "";
    }
});

//suggestions
input.addEventListener("keyup", () => {
    if (input.value.length > 2) {
        suggestions.classList.add("active");
        cities.fetchCities(input.value);
    } else {
        suggestions.classList.remove("active");
    }
});

// window.addEventListener('resize',() => {
//   if(window.innerWidth<=465) {
//     let value = cityHeader.innerHTML;
//     console.log(value);
//     weather.searchWeather(value);
//   }
// })
